import { Card, CardProps, useColorModeValue } from '@chakra-ui/react';

export function CustomCard(props: CardProps) {
  const bgColor = useColorModeValue('white', 'gray.700');
  return <Card w='fit-content' backgroundColor={bgColor} mx='auto' {...props} />;
}
