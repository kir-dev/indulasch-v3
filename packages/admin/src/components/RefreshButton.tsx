import { TbRefresh } from 'react-icons/tb';
import { Button } from '@chakra-ui/react';

interface RefreshButtonProps {
  onClick: () => void;
}

export function RefreshButton({ onClick }: RefreshButtonProps) {
  return (
    <Button onClick={onClick} variant='ghost'>
      <TbRefresh />
    </Button>
  );
}
