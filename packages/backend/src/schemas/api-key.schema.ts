import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { KioskRoles } from '../types/kiosk.types';
import { Kiosk } from './kiosk.schema';

export type ApiKeyDocument = HydratedDocument<ApiKey>;

@Schema()
export class ApiKey {
  @Prop({ type: Types.ObjectId, ref: Kiosk.name })
  kioskId: Types.ObjectId;
  @Prop()
  name: string;
  @Prop()
  role: KioskRoles;
  @Prop()
  key: string;
}

export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
