import { Button, ButtonProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface NavButtonProps extends ButtonProps {
  to: string;
}

export function NavButton({ to, onClick, ...props }: NavButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(evt) => {
        if (onClick) onClick(evt);
        navigate(to);
      }}
      {...props}
    />
  );
}
