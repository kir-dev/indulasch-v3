import { Button, useColorMode } from '@chakra-ui/react';
import { TbMoon, TbSun } from 'react-icons/tb';

export function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button onClick={toggleColorMode} variant='ghost'>
      {colorMode === 'dark' ? <TbSun /> : <TbMoon />}
    </Button>
  );
}
