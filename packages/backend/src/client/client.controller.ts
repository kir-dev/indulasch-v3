import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { KioskService } from '../kiosk/kiosk.service';
import { MessageService } from '../message/message.service';

@Controller('client')
export class ClientController {
  constructor(private readonly kioskService: KioskService, private readonly messageService: MessageService) {}

  @Get(':id')
  async getKioskConfig(@Param('id') id: string) {
    const config = await this.kioskService.getKioskById(id);
    if (!config) throw new NotFoundException();
    await this.kioskService.setRefreshNeeded(id, false);
    await this.kioskService.updateLastQueryTimestamp(id);
    return config;
  }
}
