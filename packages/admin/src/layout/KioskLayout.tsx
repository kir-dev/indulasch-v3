import { Grid } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { DesktopNavbar } from '../components/DesktopNavbar';

export function KioskLayout({ children }: PropsWithChildren) {
  return (
    <Grid templateColumns={['100%', null, 'auto 1fr']} templateRows='100%' overflow='hidden' gridGap={3} h='100%'>
      <DesktopNavbar />
      {children}
    </Grid>
  );
}
