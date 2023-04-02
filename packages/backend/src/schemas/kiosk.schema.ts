import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

import { KioskConfig, KioskNotification } from '../types/kiosk.types';

export type KioskDocument = HydratedDocument<Kiosk>;

@Schema()
export class Kiosk {
  @Prop()
  lastClientQuery: Date | undefined;
  @Prop()
  refreshNeeded: boolean;
  @Prop({ type: MongooseSchema.Types.Mixed })
  config: KioskConfig;
  @Prop({ type: MongooseSchema.Types.Mixed })
  notification: KioskNotification;
}

export const KioskSchema = SchemaFactory.createForClass(Kiosk);
