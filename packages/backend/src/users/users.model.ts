import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { KioskRoles } from '../types/kiosk.types';
import { Kiosk } from '../schemas/kiosk.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  isAdmin: boolean;
  @Prop()
  roles: UserRole[];
}

@Schema()
export class UserRole {
  @Prop({ type: Types.ObjectId, ref: Kiosk.name })
  kioskId: Types.ObjectId;
  @Prop()
  role: KioskRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
