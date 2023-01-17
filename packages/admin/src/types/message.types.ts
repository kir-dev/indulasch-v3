export enum MessageKinds {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  FUN = 'FUN',
}

export type MessageForm = {
  text: string;
  kind: MessageKinds;
  from: string;
  until: string;
};

export type Message = {
  _id: string;
  kioskId: string;
} & MessageForm;

export const DefaultMessage: MessageForm = {
  text: '',
  kind: MessageKinds.INFO,
  from: new Date().toISOString(),
  until: new Date().toISOString(),
};
