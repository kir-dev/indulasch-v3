import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from '../types/auth.types';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hellobello',
    });
  }

  async validate(payload: JwtDto) {
    const user = await this.userService.getUserById(payload.uid);
    return user.toObject();
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
