import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Kiosk, KioskSchema } from '../schemas/kiosk.schema';
import { UsersController } from './users.controller';
import { User, UserSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Kiosk.name, schema: KioskSchema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
