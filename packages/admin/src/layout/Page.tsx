import { CardHeader, ContainerProps, Heading, HStack } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';

import { CustomCard } from '../components/CustomCard';
import { InlineLoadingSpinner } from '../components/LoadingSpinner';

interface PageProps extends ContainerProps {
  title: string;
  isLoading?: boolean;
}

export function Page({ title, isLoading, children, ...props }: PageProps) {
  return (
    <CustomCard w='100%' overflow='auto' maxH='100%' h='fit-content' {...props}>
      <Helmet title={title} />
      <CardHeader>
        <HStack>
          <Heading>{title}</Heading>
          {isLoading && <InlineLoadingSpinner />}
        </HStack>
      </CardHeader>
      {children}
    </CustomCard>
  );
}
