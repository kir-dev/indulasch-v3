import { KioskConfig, KioskRoles } from './kiosk.types';
import { UserDocument } from '../users/users.model';
import { MessageDocument } from '../schemas/message.schema';

export type UserPatchDto = Partial<Omit<UserDocument, '_id'>>;
export type MessagePatchDto = Partial<Omit<MessageDocument, '_id'>>;
export type KioskPatchDto = Partial<KioskConfig>;

export type CreateKioskDto = {
  name: string;
};

export type SetRoleDto = {
  email: string;
  role: KioskRoles;
};

export type RemoveRoleDto = {
  email: string;
};

export type CreateMessageDto = {
  text: string;
  kind: MessageKinds;
  from: Date;
  until: Date;
};

export enum MessageKinds {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  FUN = 'FUN',
}
