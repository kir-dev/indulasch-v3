import { Page } from '../layout/Page';
import { TbAlertTriangle } from 'react-icons/tb';
import { Box, Button, CardBody, CardFooter, Heading, Text, VStack } from '@chakra-ui/react';

interface ErrorPageProps {
  message?: string;
  onAction: () => void;
}

export function ErrorPage({ message, onAction }: ErrorPageProps) {
  return (
    <Page title='Hiba'>
      <CardBody>
        <VStack>
          <Box borderRadius='full' color='red.500' backgroundColor='#FF000030' p={3}>
            <TbAlertTriangle size='5rem' />
          </Box>
          <Heading>Erre a hibára fel is készültünk, meg nem is.</Heading>
          <Text color='gray.500' fontSize='2xl'>
            {message}
          </Text>
          <Text>Ha ezt elküldöd nekünk, nem történik meg később.</Text>
        </VStack>
      </CardBody>
      <CardFooter justifyContent='center'>
        <Button onClick={onAction}>Tovább</Button>
      </CardFooter>
    </Page>
  );
}
