import { PropsWithChildren } from 'react';
import { TitleBar } from '../components/TitleBar';
import { Container, Grid } from '@chakra-ui/react';
import { Footer } from '../components/Footer';

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <Container maxW='container.xl'>
      <Grid gridTemplateRows='auto 1fr auto' h='100vh'>
        <TitleBar />
        {children}
        <Footer />
      </Grid>
    </Container>
  );
}
