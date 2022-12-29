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
import configuration from './utils/configuration';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/indulasch'),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
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
    AppModule.port = configService.get<string>('port');
  }
}
