import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from '../auth/admin.guard';
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

  @UseGuards(RoleBasedAuthGuard())
  @Get('me')
  async getMyUser(@Request() req) {
    return sanitize<User>(req.user, ['displayName', 'mail', 'isAdmin', 'roles']);
  }
}
