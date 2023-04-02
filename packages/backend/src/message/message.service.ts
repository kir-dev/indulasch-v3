import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageDto, MessagePatchDto } from '../types/dto.types';

@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

  async createMessage(kioskId: string, message: CreateMessageDto): Promise<MessageDocument | undefined> {
    return this.messageModel.create({ kioskId, ...message });
  }

  async deleteMessage(messageId: string) {
    return this.messageModel.deleteOne({ _id: messageId });
  }

  async patchMessage(messageId: string, patch: MessagePatchDto): Promise<MessageDocument | undefined> {
    const message = await this.messageModel.findOne({ _id: messageId });
    if (!message) throw new NotFoundException();
    if (typeof patch.text !== 'undefined') {
      message.text = patch.text;
    }
    if (typeof patch.kind !== 'undefined') {
      message.kind = patch.kind;
    }
    if (typeof patch.from !== 'undefined') {
      message.from = patch.from;
    }
    if (typeof patch.until !== 'undefined') {
      message.until = patch.until;
    }
    await message.save();
    return message;
  }

  async getMessageList(kioskId: string): Promise<MessageDocument[] | undefined> {
    return this.messageModel.find({ kioskId });
  }

  async getCurrentMessageList(kioskId: string): Promise<MessageDocument[] | undefined> {
    return this.messageModel.find({ kioskId, from: { $lt: new Date() }, until: { $gt: new Date() } });
  }
}
