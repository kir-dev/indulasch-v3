import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../utils/configuration';
import { OauthStrategy } from '../strategies/oauth.strategy';

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
