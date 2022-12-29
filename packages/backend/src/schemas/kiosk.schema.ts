import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { KioskConfig } from '../types/kiosk.types';

export type KioskDocument = HydratedDocument<Kiosk>;

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
