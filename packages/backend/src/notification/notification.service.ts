import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { Model } from 'mongoose';

import { MailingService } from '../mailing/mailing.service';
import { Kiosk, KioskDocument } from '../schemas/kiosk.schema';
import { KioskRoles, KioskStatus, KioskStatusTranslation } from '../types/kiosk.types';
import { User } from '../users/users.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Kiosk.name) private readonly kioskModel: Model<Kiosk>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly mailService: MailingService
  ) {}

  @Cron('*/1 * * * *')
  async handleStatusCheck() {
    const disconnectedKiosks = await this.kioskModel.find({
      lastClientQuery: { $lt: new Date(new Date().getTime() - 60000) },
      'notification.status': KioskStatus.CONNECTED,
    });
    const connectedKiosks = await this.kioskModel.find({
      lastClientQuery: { $gt: new Date(new Date().getTime() - 60000) },
      'notification.status': { $in: [KioskStatus.DISCONNECTED, KioskStatus.UNKNOWN] },
    });

    if (connectedKiosks.length === 0 && disconnectedKiosks.length === 0) return;

    Logger.log(
      `Sending notifications of ${disconnectedKiosks.length + connectedKiosks.length} kiosk(s)`,
      NotificationService.name
    );

    const callbackFn = (status: KioskStatus) => (kiosk) => {
      this.sendStatusNotification(kiosk, status)
        .then(() => {
          Logger.log('Notification sent', NotificationService.name);
        })
        .catch(() => {
          Logger.error('Unhandled error in notification delivery', NotificationService.name);
        });
      kiosk.notification = { ...kiosk.notification, status: status };
      kiosk.save();
    };

    disconnectedKiosks.forEach(callbackFn(KioskStatus.DISCONNECTED));

    connectedKiosks.forEach(callbackFn(KioskStatus.CONNECTED));
  }

  async sendStatusNotification(kiosk: KioskDocument, newStatus: KioskStatus) {
    const kioskName = kiosk.config.meta.name;
    const allUsers = await this.userModel.find();
    const kioskUsers = allUsers.filter(
      (u) => !!u.roles.find((r) => r.kioskId.equals(kiosk._id) && r.role >= KioskRoles.OWNER)
    );
    const { emailEnabled, webhookEnabled, webhookUrl } = kiosk.notification;
    if (emailEnabled) {
      const html = this.mailService.generateMail({
        kioskName,
        statusText: KioskStatusTranslation[newStatus] || KioskStatusTranslation[KioskStatus.UNKNOWN],
        color: newStatus === KioskStatus.CONNECTED ? 'green' : 'red',
      });
      try {
        await this.mailService.sendMail(
          kioskUsers.map((ku) => ({
            from: 'InduláSch by Kir-Dev',
            to: ku.mail,
            html: html,
            subject: `${kioskName} - ${KioskStatusTranslation[newStatus]}`,
          }))
        );
      } catch (e) {
        Logger.error('E-mail notification failed for ' + kioskName, NotificationService.name);
      }
    }
    if (webhookEnabled && webhookUrl) {
      try {
        await axios.post(webhookUrl, { kioskName, newStatus });
      } catch (e) {
        Logger.error('Webhook notification failed for ' + kioskName, NotificationService.name);
      }
    }
  }
}
