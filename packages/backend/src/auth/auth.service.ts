import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/users.model';
import { CredentialsDto } from '../types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument | undefined> {
    return await this.usersService.getUser({ username, password });
  }

  async login(user: UserDocument) {
    const payload = { username: user.username, uid: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CredentialsDto) {
    return await this.usersService.createUser(user.username, user.password);
  }
}
