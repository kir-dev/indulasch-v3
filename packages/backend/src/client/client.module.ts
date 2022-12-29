import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { KioskModule } from '../kiosk/kiosk.module';
import { MessageModule } from '../message/message.module';

@Module({
  controllers: [ClientController],
  imports: [KioskModule, MessageModule],
})
export class ClientModule {}
