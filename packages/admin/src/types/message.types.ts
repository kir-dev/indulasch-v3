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
