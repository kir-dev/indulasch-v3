import { KioskRoles } from './types';

export type KioskUser = {
  _id: string;
  mail: string;
  role: KioskRoles;
};

export type KioskUserForm = {
  mail: string;
  role: KioskRoles;
};
