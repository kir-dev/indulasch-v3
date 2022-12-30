import { useKioskContext } from '../context/kiosk.context';
import { useAuthContext } from '../context/auth.context';
import { useMenuItems } from '../utils/useMenuItems';
import { Button, Flex, Menu, MenuButton as MenuDropdownButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { MenuButton } from './MenuButton';
import { PropsWithChildren } from 'react';
import { TbAppWindow, TbChevronDown, TbUser } from 'react-icons/tb';

export function NavBar() {
  const { kiosk, setSelectedKiosk, unselect } = useKioskContext();
  const { user, logout } = useAuthContext();
  const menuItems = useMenuItems();
  return (
    <Flex justifyContent='flex-start' alignItems='flex-start' flexDirection='column' gridRowGap={3} overflow='auto'>
      <MenuSection>Felhasználó</MenuSection>
      <Menu>
        <MenuDropdownButton isTruncated leftIcon={<TbUser />} as={Button} rightIcon={<TbChevronDown />} variant='ghost'>
          {user?.displayName || 'Ismeretlen'}
        </MenuDropdownButton>
        <MenuList>
          <MenuItem onClick={logout}>Kijelentkezés</MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuDropdownButton leftIcon={<TbAppWindow />} as={Button} rightIcon={<TbChevronDown />} variant='ghost'>
          {kiosk?.config.meta.name || 'Ismeretlen'}
        </MenuDropdownButton>
        <MenuList>
          <MenuItem onClick={unselect}>Kioszk választó</MenuItem>
          {user?.roles.map((r) => (
            <MenuItem key={r.kioskId._id} onClick={() => setSelectedKiosk(r.kioskId._id)}>
              {r?.kioskId.config.meta.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <MenuSection>Kiosk beállítások</MenuSection>
      {menuItems?.map((mi) => (
        <MenuButton leftIcon={mi.icon} key={mi.path} to={mi.path}>
          {mi.name}
        </MenuButton>
      ))}
    </Flex>
  );
}

function MenuSection({ children }: PropsWithChildren) {
  return (
    <Text size='xs' color='gray.500'>
      {children}
    </Text>
  );
}
