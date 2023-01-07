import { KioskRoles, MenuItem } from '../types/types';
import { MessagesPage } from '../pages/Messages.page';
import { UIPaths } from './paths.config';
import { MetaPage } from '../pages/Meta.page';
import { TbAdjustments, TbApps, TbCircleHalf2, TbListDetails, TbMessage, TbSettings, TbUsers } from 'react-icons/tb';
import { KioskDashboardPage } from '../pages/KioskDashboard.page';
import { StylePage } from '../pages/Style.page';
import { WidgetsPage } from '../pages/Widgets.page';
import { UsersPage } from '../pages/Users.page';
import { WidgetEditPage } from '../pages/WidgetEditPage';
import { l } from '../utils/language';

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
    name: l('title.users'),
    path: UIPaths.USERS,
    page: UsersPage,
    icon: TbUsers({}),
    minRole: KioskRoles.OWNER,
  },
];
