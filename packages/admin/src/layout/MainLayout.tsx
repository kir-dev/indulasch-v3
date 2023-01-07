import { PropsWithChildren } from 'react';
import { TitleBar } from '../components/TitleBar';
import { Container, Grid } from '@chakra-ui/react';
import { Footer } from '../components/Footer';

interface MainLayoutProps extends PropsWithChildren {
  drawerEnabled?: boolean;
}

export function MainLayout({ children, drawerEnabled }: MainLayoutProps) {
  return (
    <Container maxW='container.xl'>
      <Grid gridTemplateRows='auto 1fr auto' gridTemplateColumns='100%' h='100vh'>
        <TitleBar drawerEnabled={drawerEnabled} />
        {children}
        <Footer />
      </Grid>
    </Container>
  );
}
