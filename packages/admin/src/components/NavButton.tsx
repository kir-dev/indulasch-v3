import { Button, ButtonProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export interface NavButtonProps extends ButtonProps {
  to: string;
  external?: boolean;
}

export function NavButton({ to, onClick, external, ...props }: NavButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(evt) => {
        if (onClick) onClick(evt);
        if (external) location.href = to;
        else navigate(to);
      }}
      {...props}
    />
  );
}
