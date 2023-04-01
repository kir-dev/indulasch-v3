import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '../strategies/jwt.strategy';
import { OauthStrategy } from '../strategies/oauth.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigKeys } from '../utils/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>(ConfigKeys.SECRET),
          signOptions: {
            expiresIn: config.get<string | number>(ConfigKeys.EXPIRATION),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, OauthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
