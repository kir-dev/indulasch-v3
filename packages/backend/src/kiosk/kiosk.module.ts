import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageModule } from '../message/message.module';
import { Kiosk, KioskSchema } from '../schemas/kiosk.schema';
import { UsersModule } from '../users/users.module';
import { KioskController } from './kiosk.controller';
import { KioskService } from './kiosk.service';

@Module({
  imports: [UsersModule, MessageModule, MongooseModule.forFeature([{ name: Kiosk.name, schema: KioskSchema }])],
  providers: [KioskService],
  controllers: [KioskController],
  exports: [KioskService],
})
export class KioskModule {}
