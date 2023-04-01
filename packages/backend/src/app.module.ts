import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { KioskModule } from './kiosk/kiosk.module';
import { MessageModule } from './message/message.module';
import { UsersModule } from './users/users.module';
import configuration, { ConfigKeys } from './utils/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          uri: config.get<string>(ConfigKeys.MONGODB_URI),
        };
      },
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      load: [configuration],
      isGlobal: true,
    }),
    KioskModule,
    MessageModule,
    ClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: string;
  static corsOrigin: string[];

  constructor(private configService: ConfigService) {
    AppModule.port = configService.get<string>(ConfigKeys.PORT);
    AppModule.corsOrigin = configService.get<string>(ConfigKeys.CORS_ORIGIN).split(',');
  }
}
