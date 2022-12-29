import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from '../auth/admin.guard';
import { UserPatchDto } from '../types/dto.types';
import { RoleBasedAuthGuard } from '../auth/role.guard';
import { sanitize } from '../utils/sanitize';
import { User } from './users.model';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async toggleAdmin(@Param('id') id: string, @Body() userPatchDto: UserPatchDto) {
    return this.userService.patchUser(id, userPatchDto);
  }

  @UseGuards(RoleBasedAuthGuard())
  @Get('me')
  async getMyUser(@Request() req) {
    return sanitize<User>(req.user, ['username', 'isAdmin', 'roles']);
  }
}
