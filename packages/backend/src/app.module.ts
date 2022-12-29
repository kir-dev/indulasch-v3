import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KioskModule } from './kiosk/kiosk.module';
import { MessageModule } from './message/message.module';
import { ClientModule } from './client/client.module';
import configuration, { ConfigKeys } from './utils/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>(ConfigKeys.MONGODB_URI),
      }),
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

  constructor(private configService: ConfigService) {
    AppModule.port = configService.get<string>(ConfigKeys.PORT);
  }
}
