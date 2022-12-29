import { PropsWithChildren } from 'react';
import { VStack } from '@chakra-ui/react';

export function PageSection({ children }: PropsWithChildren) {
  return (
    <VStack alignItems='flex-start' textAlign='left'>
      {children}
    </VStack>
  );
}
