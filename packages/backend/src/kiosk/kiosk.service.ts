import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Kiosk } from '../schemas/kiosk.schema';
import { KioskPatchDto, WidgetPatchDto } from '../types/dto.types';
import { KioskNotification, KioskStatus } from '../types/kiosk.types';
import { getDefaultConfig } from '../utils/defaults';

@Injectable()
export class KioskService {
  constructor(@InjectModel(Kiosk.name) private readonly kioskModel: Model<Kiosk>) {}

  async getKioskById(kioskId: string) {
    if (!Types.ObjectId.isValid(kioskId)) throw new NotFoundException();
    return this.kioskModel.findById(kioskId);
  }

  async createKiosk(name: string) {
    return await this.kioskModel.create({
      refreshNeeded: false,
      notification: { status: KioskStatus.UNKNOWN, webhookUrl: '', webhookEnabled: false, emailEnabled: false },
      config: getDefaultConfig(name),
    });
  }

  async deleteKiosk(kioskId: string) {
    return this.kioskModel.deleteOne({
      _id: kioskId,
    });
  }

  async patchKiosk(kioskId: string, { widgets, style, meta, pages }: KioskPatchDto) {
    const $set: Record<string, unknown> = {};
    if (typeof widgets !== 'undefined') $set['config.widgets'] = widgets;
    if (typeof pages !== 'undefined') $set['config.pages'] = pages;
    if (typeof meta !== 'undefined') $set['config.meta'] = meta;
    if (typeof style !== 'undefined') $set['config.style'] = style;
    if (Object.keys($set).length === 0) return { acknowledged: true, matchedCount: 0, modifiedCount: 0 } as never;
    return this.kioskModel.updateOne({ _id: kioskId }, { $set });
  }

  async patchWidget(kioskId: string, widget: WidgetPatchDto) {
    const kiosk = await this.kioskModel.findById(kioskId);
    const widgetToModifyIndex = kiosk.config.widgets.findIndex((w) => w.name === widget.name);
    if (widgetToModifyIndex === -1) throw new NotFoundException();
    Object.entries(widget).forEach(([key, value]) => {
      if (key in kiosk.config.widgets[widgetToModifyIndex]) {
        kiosk.config.widgets[widgetToModifyIndex][key] = value;
      }
    });
    return this.kioskModel.updateOne(
      { _id: kioskId },
      {
        $set: {
          config: kiosk.config,
        },
      }
    );
  }

  async patchNotification(kioskId: string, notification: Omit<KioskNotification, 'status'>) {
    return this.kioskModel.updateOne(
      { _id: kioskId },
      {
        $set: {
          'notification.webhookUrl': notification.webhookUrl,
          'notification.webhookEnabled': notification.webhookEnabled,
          'notification.emailEnabled': notification.emailEnabled,
        },
      }
    );
  }

  async setRefreshNeeded(kioskId: string, newState: boolean) {
    const kiosk = await this.kioskModel.findById(kioskId);
    kiosk.refreshNeeded = newState;
    await kiosk.save();
  }

  async updateLastQueryTimestamp(kioskId: string) {
    const kiosk = await this.kioskModel.findById(kioskId);
    kiosk.lastClientQuery = new Date();
    await kiosk.save();
  }
}
