import { MessageDocument } from '../schemas/message.schema';
import { UserDocument } from '../users/users.model';
import { KioskConfig, KioskRoles, WidgetConfig } from './kiosk.types';

export type UserPatchDto = Partial<Omit<UserDocument, '_id'>>;
export type MessagePatchDto = Partial<Omit<MessageDocument, '_id'>>;
export type KioskPatchDto = Partial<KioskConfig>;
export type WidgetPatchDto = Partial<WidgetConfig>;

export type CreateKioskDto = {
  name: string;
};

export type SetRoleDto = {
  mail: string;
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

export type CreateApiKeyDto = {
  name: string;
  role: KioskRoles;
};

export type SetApiKeyRoleDto = {
  role: KioskRoles;
};

export enum MessageKinds {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  FUN = 'FUN',
}
