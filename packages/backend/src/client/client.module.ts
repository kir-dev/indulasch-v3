import { Module } from '@nestjs/common';

import { KioskModule } from '../kiosk/kiosk.module';
import { MessageModule } from '../message/message.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  controllers: [ClientController],
  imports: [KioskModule, MessageModule],
  providers: [ClientService],
})
export class ClientModule {}
