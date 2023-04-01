import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Kiosk } from '../schemas/kiosk.schema';
import { KioskRoles } from '../types/kiosk.types';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  authSchId: string;
  @Prop()
  displayName: string;
  @Prop()
  mail: string;
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
