import { KioskRoles } from './types';

export type ApiKey = {
  _id: string;
  key: string;
  name: string;
  role: KioskRoles;
  kioskId: string;
};

export type CreateApiKeyDto = Pick<ApiKey, 'name' | 'role'>;
