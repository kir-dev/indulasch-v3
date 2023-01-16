import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { KioskService } from '../kiosk/kiosk.service';
import { MessageService } from '../message/message.service';
import { DepartureQueryDto } from '../types/client.types';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly kioskService: KioskService,
    private readonly messageService: MessageService,
    private readonly clientService: ClientService
  ) {}

  @Get(':id')
  async getKioskConfig(@Param('id') id: string) {
    const config = await this.kioskService.getKioskById(id);
    if (!config) throw new NotFoundException();
    await this.kioskService.setRefreshNeeded(id, false);
    await this.kioskService.updateLastQueryTimestamp(id);
    return config;
  }

  @Post('departures')
  async getDepartures(@Body() departureQuery: DepartureQueryDto) {
    return this.clientService.getDepartures(departureQuery);
  }
}
