import { KioskRoles, MenuItem } from '../types/types';
import { MessagesPage } from '../pages/Messages.page';
import { UIPaths } from './paths.config';
import { MetaPage } from '../pages/Meta.page';
import { TbApps, TbCircleHalf2, TbListDetails, TbMessage, TbSettings, TbUsers } from 'react-icons/tb';
import { KioskDashboardPage } from '../pages/KioskDashboard.page';
import { StylePage } from '../pages/Style.page';
import { WidgetsPage } from '../pages/Widgets.page';
import { UsersPage } from '../pages/Users.page';

export const MenuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    path: UIPaths.DASHBOARD,
    page: KioskDashboardPage,
    icon: TbListDetails({}),
    minRole: KioskRoles.VISITOR,
  },
  {
    name: 'Alapbeállítások',
    path: UIPaths.META,
    page: MetaPage,
    icon: TbSettings({}),
    minRole: KioskRoles.EDITOR,
  },
  {
    name: 'Megjelenés',
    path: UIPaths.STYLE,
    page: StylePage,
    icon: TbCircleHalf2({}),
    minRole: KioskRoles.EDITOR,
  },
  {
    name: 'Csempék',
    path: UIPaths.WIDGETS,
    page: WidgetsPage,
    icon: TbApps({}),
    minRole: KioskRoles.EDITOR,
  },
  {
    name: 'Üzenetek',
    path: UIPaths.MESSAGES,
    page: MessagesPage,
    icon: TbMessage({}),
    minRole: KioskRoles.MARKETING,
  },
  {
    name: 'Kezelők',
    path: UIPaths.USERS,
    page: UsersPage,
    icon: TbUsers({}),
    minRole: KioskRoles.OWNER,
  },
];
