import { PropsWithChildren } from 'react';
import { Grid } from '@chakra-ui/react';
import { NavBar } from '../components/NavBar';

export function KioskLayout({ children }: PropsWithChildren) {
  return (
    <Grid templateColumns='auto 1fr' templateRows='100%' overflow='hidden' gridGap={3} h='100%'>
      <NavBar />
      {children}
    </Grid>
  );
}
