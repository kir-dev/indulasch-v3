import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { MessageKinds } from '../types/dto.types';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  kioskId: string;
  @Prop()
  text: string;
  @Prop()
  kind: MessageKinds;
  @Prop()
  from: Date;
  @Prop()
  until: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
