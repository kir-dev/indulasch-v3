import { ReactElement } from 'react';
import { UIPaths } from '../config/paths.config';
import { ColorModeColor, ColorsWithScheme } from './kiosk.types';

export type LoginCredentials = {
  username: string;
  password: string;
};

export type CreateKioskForm = {
  name: string;
};

export type RegistrationForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type MetaForm = {
  name: string;
  latitude: string;
  longitude: string;
};

export type StyleForm = {
  mode: keyof ColorModeColor;
} & ColorsWithScheme;

export type User = {
  username: string;
  isAdmin: boolean;
  roles: UserRole[];
};

export type UserRole = { kioskId: { _id: string; config: { meta: { name: string } } }; role: KioskRoles };

export enum KioskRoles {
  VISITOR,
  MARKETING,
  EDITOR,
  OWNER,
}

export const KioskRoleNames: Record<KioskRoles, string> = {
  [KioskRoles.VISITOR]: 'Látogató',
  [KioskRoles.MARKETING]: 'Marketing',
  [KioskRoles.EDITOR]: 'Szerkesztő',
  [KioskRoles.OWNER]: 'Tulajdonos',
};

export type MenuItem = {
  name: string;
  path: UIPaths;
  icon?: ReactElement;
  page: () => JSX.Element;
  minRole?: KioskRoles;
  admin?: boolean;
};
