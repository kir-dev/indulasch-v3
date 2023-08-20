import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { ApiKeyService } from '../api-key/api-key.service';
import { RoleBasedAuthGuard } from '../auth/role.guard';
import { MessageService } from '../message/message.service';
import {
  CreateApiKeyDto,
  CreateKioskDto,
  CreateMessageDto,
  KioskPatchDto,
  MessagePatchDto,
  SetApiKeyRoleDto,
  SetRoleDto,
  WidgetPatchDto,
} from '../types/dto.types';
import { KioskNotification, KioskRoles } from '../types/kiosk.types';
import { UsersService } from '../users/users.service';
import { sanitizeWithExclude } from '../utils/sanitize';
import { KioskService } from './kiosk.service';

@Controller('admin/kiosk')
export class KioskController {
  constructor(
    private readonly kioskService: KioskService,
    private readonly userService: UsersService,
    private readonly apiKeyService: ApiKeyService,
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

  @UseGuards(RoleBasedAuthGuard(KioskRoles.MARKETING))
  @Patch(':id/widget')
  async patchWidget(@Body() patchDto: WidgetPatchDto, @Param('id') kioskId: string) {
    return await this.kioskService.patchWidget(kioskId, sanitizeWithExclude(patchDto, ['grid']));
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.OWNER))
  @Patch(':id/notification')
  async patchNotification(@Body() patchDto: KioskNotification, @Param('id') kioskId: string) {
    return await this.kioskService.patchNotification(
      kioskId,
      sanitizeWithExclude(patchDto, ['status']) as Omit<KioskNotification, 'status'>
    );
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
  @Get(':id/role')
  async getUsers(@Param('id') kioskId: string) {
    return await this.userService.getUsersForKiosk(new Types.ObjectId(kioskId));
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.OWNER))
  @Post(':id/role')
  async setRole(@Body() setDto: SetRoleDto, @Param('id') kioskId: string) {
    return await this.userService.setKioskRole(setDto.mail, new Types.ObjectId(kioskId), setDto.role);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.OWNER))
  @Delete(':id/role/:userId')
  async removeRole(@Param('id') kioskId: string, @Param('userId') userId: string) {
    return await this.userService.removeKioskRole(new Types.ObjectId(userId), new Types.ObjectId(kioskId));
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

  @UseGuards(RoleBasedAuthGuard(KioskRoles.EDITOR))
  @Post(':id/api-key')
  async createApiKey(@Param('id') kioskId: string, @Body() createApiKeyDto: CreateApiKeyDto) {
    return this.apiKeyService.createApiKey(kioskId, createApiKeyDto);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.EDITOR))
  @Patch(':id/api-key/:keyId/role')
  async setApiKeyRole(
    @Param('id') kioskId: string,
    @Param('keyId') keyId: string,
    @Body() setApiKeyRoleDto: SetApiKeyRoleDto
  ) {
    return this.apiKeyService.setApiKeyRole(keyId, setApiKeyRoleDto.role);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.EDITOR))
  @Get(':id/api-key')
  async getApiKey(@Param('id') kioskId: string) {
    return this.apiKeyService.getApiKeysForKioskId(kioskId);
  }

  @UseGuards(RoleBasedAuthGuard(KioskRoles.EDITOR))
  @Delete(':id/api-key/:keyId')
  async deleteApiKey(@Param('id') kioskId: string, @Param('keyId') keyId: string) {
    return this.apiKeyService.deleteApiKey(keyId);
  }
}
