import { VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export function PageSection({ children }: PropsWithChildren) {
  return (
    <VStack alignItems='flex-start' textAlign='left'>
      {children}
    </VStack>
  );
}
