import { Flex } from '@chakra-ui/react';

import { NavBar } from './NavBar';

export function DesktopNavbar() {
  return (
    <Flex
      justifyContent='flex-start'
      alignItems='flex-start'
      flexDirection='column'
      gridRowGap={3}
      overflow='auto'
      display={['none', null, 'flex']}
    >
      <NavBar />
    </Flex>
  );
}
