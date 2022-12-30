import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { KioskRoles } from '../types/kiosk.types';
import { RoleBasedAuthGuard } from '../auth/role.guard';
import { KioskService } from './kiosk.service';
import { UsersService } from '../users/users.service';
import {
  CreateKioskDto,
  CreateMessageDto,
  KioskPatchDto,
  MessagePatchDto,
  RemoveRoleDto,
  SetRoleDto,
} from '../types/dto.types';
import { MessageService } from '../message/message.service';
import { Types } from 'mongoose';

@Controller('admin/kiosk')
export class KioskController {
  constructor(
    private readonly kioskService: KioskService,
    private readonly userService: UsersService,
    private readonly messageService: MessageService
  ) {}

  @UseGuards(RoleBasedAuthGuard(KioskRoles.VISITOR))
  @Get(':id')
  async getKiosk(@Param('id') kioskId: string) {
    return await this.kioskService.getKioskById(kioskId);
  }

  @UseGuards(RoleBasedAuthGuard())
  @Post()
  async createKiosk(@Body() createDto: CreateKioskDto, @Request() req) {
    const kiosk = await this.kioskService.createKiosk(createDto.name);
    await this.userService.setKioskRole(req.user.mail, kiosk._id, KioskRoles.OWNER);
    return kiosk;
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.EDITOR))
  @Patch(':id')
  async patchKiosk(@Body() patchDto: KioskPatchDto, @Param('id') kioskId: string) {
    return await this.kioskService.patchKiosk(kioskId, patchDto);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.OWNER))
  @Delete(':id')
  async deleteKiosk(@Param('id') kioskId: string) {
    return await this.kioskService.deleteKiosk(kioskId);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.EDITOR))
  @Post(':id/refresh')
  async refreshKiosk(@Param('id') kioskId: string) {
    return await this.kioskService.setRefreshNeeded(kioskId, true);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.OWNER))
  @Post(':id/role')
  async setRole(@Body() setDto: SetRoleDto, @Param('id') kioskId: string) {
    return await this.userService.setKioskRole(setDto.email, new Types.ObjectId(kioskId), setDto.role);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.OWNER))
  @Delete(':id/role')
  async removeRole(@Body() setDto: RemoveRoleDto, @Param('id') kioskId: string) {
    return await this.userService.removeKioskRole(setDto.email, new Types.ObjectId(kioskId));
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.MARKETING))
  @Post(':id/message')
  async createMessage(@Body() createDto: CreateMessageDto, @Param('id') kioskId: string) {
    return await this.messageService.createMessage(kioskId, createDto);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.MARKETING))
  @Delete(':id/message/:messageId')
  async deleteMessage(@Param('id') kioskId: string, @Param('messageId') messageId: string) {
    return await this.messageService.deleteMessage(messageId);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.MARKETING))
  @Patch(':id/message/:messageId')
  async patchMessage(
    @Body() patchDto: MessagePatchDto,
    @Param('id') kioskId: string,
    @Param('messageId') messageId: string
  ) {
    return await this.messageService.patchMessage(messageId, patchDto);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.VISITOR))
  @Get(':id/message')
  async getMessages(@Param('id') kioskId: string) {
    return await this.messageService.getMessageList(kioskId);
  }
}
