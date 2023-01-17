export type Message = {
  kind: MessageKinds;
  text: string;
};

export enum MessageKinds {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  FUN = 'FUN',
}
