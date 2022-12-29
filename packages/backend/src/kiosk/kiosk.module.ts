import { Module } from '@nestjs/common';
import { KioskService } from './kiosk.service';
import { KioskController } from './kiosk.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Kiosk, KioskSchema } from '../schemas/kiosk.schema';
import { UsersModule } from '../users/users.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [UsersModule, MessageModule, MongooseModule.forFeature([{ name: Kiosk.name, schema: KioskSchema }])],
  providers: [KioskService],
  controllers: [KioskController],
  exports: [KioskService],
})
export class KioskModule {}
