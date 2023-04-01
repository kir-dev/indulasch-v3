import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

import { KioskConfig } from '../types/kiosk.types';

@Schema()
export class Kiosk {
  @Prop()
  lastClientQuery: Date | undefined;
  @Prop()
  refreshNeeded: boolean;
  @Prop({ type: MongooseSchema.Types.Mixed })
  config: KioskConfig;
}

export const KioskSchema = SchemaFactory.createForClass(Kiosk);
