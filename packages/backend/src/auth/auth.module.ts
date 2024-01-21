import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiKeyModule } from '../api-key/api-key.module';
import { ApiKeyStrategy } from '../strategies/apiKey.strategy';
import { Auth0Strategy } from '../strategies/auth0.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigKeys } from '../utils/configuration';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ApiKeyModule,
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
  providers: [AuthService, JwtStrategy, Auth0Strategy, ApiKeyStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
