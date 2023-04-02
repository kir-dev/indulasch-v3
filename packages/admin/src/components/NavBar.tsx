import { Button, Menu, MenuButton as MenuDropdownButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { TbAppWindow, TbChevronDown, TbUser } from 'react-icons/tb';

import { useAuthContext } from '../context/auth.context';
import { useKioskContext } from '../context/kiosk.context';
import { l } from '../utils/language';
import { useMenuItems } from '../utils/useMenuItems';
import { MenuButton } from './MenuButton';

export function NavBar() {
  const { kiosk, setSelectedKiosk, unselect } = useKioskContext();
  const { user, logout } = useAuthContext();
  const menuItems = useMenuItems();
  return (
    <>
      <MenuSection>{l('navbar.section.user')}</MenuSection>
      <Menu>
        <MenuDropdownButton isTruncated leftIcon={<TbUser />} as={Button} rightIcon={<TbChevronDown />} variant='ghost'>
          {user?.displayName || l('navbar.unknown')}
        </MenuDropdownButton>
        <MenuList>
          <MenuItem onClick={logout}>{l('navbar.logout')}</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuDropdownButton leftIcon={<TbAppWindow />} as={Button} rightIcon={<TbChevronDown />} variant='ghost'>
          {kiosk?.config.meta.name || l('navbar.unknown')}
        </MenuDropdownButton>
        <MenuList>
          <MenuItem onClick={unselect}>{l('navbar.kioskSelector')}</MenuItem>
          {user?.roles.map((r) => (
            <MenuItem key={r.kioskId._id} onClick={() => setSelectedKiosk(r.kioskId._id)}>
              {r?.kioskId.config.meta.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <MenuSection>{l('navbar.section.kiosk')}</MenuSection>
      {menuItems?.map((mi) => (
        <MenuButton leftIcon={mi.icon} key={mi.path} to={mi.path}>
          {mi.name}
        </MenuButton>
      ))}
    </>
  );
}

function MenuSection({ children }: PropsWithChildren) {
  return (
    <Text size='xs' color='gray.500'>
      {children}
    </Text>
  );
}
