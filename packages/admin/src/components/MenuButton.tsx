import { useLocation } from 'react-router-dom';

import { NavButton, NavButtonProps } from './NavButton';

export function MenuButton({ to, ...props }: NavButtonProps) {
  const { pathname } = useLocation();
  return (
    <NavButton
      w='100%'
      h={10}
      justifyContent='flex-start'
      to={to}
      {...props}
      variant={to === pathname ? 'solid' : 'ghost'}
    />
  );
}
