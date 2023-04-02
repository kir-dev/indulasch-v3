import { Spinner, SpinnerProps, useColorModeValue } from '@chakra-ui/react';

import theme from '../config/theme';

export function LoadingSpinner(props: SpinnerProps) {
  const color = useColorModeValue('brand.500', 'brand.200');
  const emptyColor = theme.colors.brand['500'] + '50';
  return <Spinner thickness='0.3rem' speed='0.8s' emptyColor={emptyColor} color={color} size='xl' {...props} />;
}

export function InlineLoadingSpinner(props: SpinnerProps) {
  return <LoadingSpinner size='sm' thickness='0.1rem' {...props} />;
}
