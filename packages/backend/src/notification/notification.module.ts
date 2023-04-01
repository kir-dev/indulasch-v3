import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { MailingModule } from '../mailing/mailing.module';
import { Kiosk, KioskSchema } from '../schemas/kiosk.schema';
import { User, UserSchema } from '../users/users.model';
import { UsersModule } from '../users/users.module';
import { ConfigKeys } from '../utils/configuration';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Kiosk.name, schema: KioskSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MailingModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return {
          templates: { default: 'src/templates/status.ejs' },
          apiKey: config.get(ConfigKeys.MAIL_API_KEY),
          mailServiceUrl: config.get(ConfigKeys.MAIL_SERVER_URL),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [NotificationService],
})
export class NotificationModule {}
