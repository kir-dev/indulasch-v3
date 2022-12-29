import { TbArrowBarDown, TbArrowBarLeft, TbArrowBarRight, TbArrowBarUp } from 'react-icons/tb';

interface ArrowButtonProps {
  onClick: () => void;
  direction: 'up' | 'down' | 'left' | 'right';
  show: boolean;
}

export function ArrowButton({ onClick, direction, show }: ArrowButtonProps) {
  const iconSize = 30;
  switch (direction) {
    case 'left':
      return (
        <TbArrowBarLeft onClick={onClick} size={iconSize} cursor='pointer' visibility={show ? 'visible' : 'hidden'} />
      );
    case 'right':
      return (
        <TbArrowBarRight onClick={onClick} size={iconSize} cursor='pointer' visibility={show ? 'visible' : 'hidden'} />
      );
    case 'up':
      return (
        <TbArrowBarUp onClick={onClick} size={iconSize} cursor='pointer' visibility={show ? 'visible' : 'hidden'} />
      );
    case 'down':
      return (
        <TbArrowBarDown onClick={onClick} size={iconSize} cursor='pointer' visibility={show ? 'visible' : 'hidden'} />
      );
  }
}
