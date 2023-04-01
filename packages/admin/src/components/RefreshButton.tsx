import { Button } from '@chakra-ui/react';
import { TbRefresh } from 'react-icons/tb';

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
