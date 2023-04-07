import { Box, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  image?: string;
  reverse?: boolean;
}

export function Section({ children, image, reverse }: Props) {
  return (
    <section>
      <HStack
        flexDirection={[reverse ? 'column-reverse' : 'column', null, reverse ? 'row-reverse' : 'row']}
        justify='space-between'
        w='100%'
        my={10}
        spacing={5}
      >
        <VStack w={['100%', '100%', '50%']} align='flex-start'>
          {children}
        </VStack>
        {image && (
          <Box p={5} maxW={['100%', '100%', '50%']} margin='auto'>
            <Image
              src={image}
              alt='Image'
              width={1920}
              height={1080}
              style={{ objectFit: 'contain', width: 400, height: 250 }}
            />
          </Box>
        )}
      </HStack>
    </section>
  );
}
