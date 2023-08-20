import {
  TbAdjustments,
  TbApps,
  TbBell,
  TbCircleHalf2,
  TbKey,
  TbListDetails,
  TbMessage,
  TbSettings,
  TbUsers,
} from 'react-icons/tb';

import { ApiKeysPage } from '../pages/ApiKeys.page';
import { KioskDashboardPage } from '../pages/KioskDashboard.page';
import { MessagesPage } from '../pages/Messages.page';
import { MetaPage } from '../pages/Meta.page';
import { NotificationPage } from '../pages/Notification.page';
import { StylePage } from '../pages/Style.page';
import { UsersPage } from '../pages/Users.page';
import { WidgetEditPage } from '../pages/WidgetEditPage';
import { WidgetsPage } from '../pages/Widgets.page';
import { KioskRoles, MenuItem } from '../types/types';
import { l } from '../utils/language';
import { UIPaths } from './paths.config';

export const MenuItems: MenuItem[] = [
  {
    name: l('title.dashboard'),
    path: UIPaths.DASHBOARD,
    page: KioskDashboardPage,
    icon: TbListDetails({}),
    minRole: KioskRoles.VISITOR,
  },
  {
    name: l('title.meta'),
    path: UIPaths.META,
    page: MetaPage,
    icon: TbSettings({}),
    minRole: KioskRoles.EDITOR,
  },
  {
    name: l('title.style'),
    path: UIPaths.STYLE,
    page: StylePage,
    icon: TbCircleHalf2({}),
    minRole: KioskRoles.EDITOR,
  },
  {
    name: l('title.widgets'),
    path: UIPaths.WIDGETS,
    page: WidgetsPage,
    icon: TbApps({}),
    minRole: KioskRoles.EDITOR,
  },
  {
    name: l('title.widgetEdit'),
    path: UIPaths.WIDGET_EDIT,
    page: WidgetEditPage,
    icon: TbAdjustments({}),
    minRole: KioskRoles.MARKETING,
  },
  {
    name: l('title.messages'),
    path: UIPaths.MESSAGES,
    page: MessagesPage,
    icon: TbMessage({}),
    minRole: KioskRoles.MARKETING,
  },
  {
    name: l('title.apiKeys'),
    path: UIPaths.API_KEYS,
    page: ApiKeysPage,
    icon: TbKey({}),
    minRole: KioskRoles.EDITOR,
  },
  {
    name: l('title.users'),
    path: UIPaths.USERS,
    page: UsersPage,
    icon: TbUsers({}),
    minRole: KioskRoles.OWNER,
  },
  {
    name: l('title.notifications'),
    path: UIPaths.NOTIFICATIONS,
    page: NotificationPage,
    icon: TbBell({}),
    minRole: KioskRoles.OWNER,
  },
];
