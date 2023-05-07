'use client';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disable?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disable,
  icon: Icon,
  small,
  outline,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`
       relative
       disable:opacity-70
       disabled:cursor-pointer
       rounded-lg 
       hover:opacity-80
       transition
       w-full
       ${outline ? 'bg-white' : 'bg-rose-500'}
       ${outline ? 'border-black' : 'border-rose-500'}
       ${outline ? 'text-black' : 'text-white'}
       ${small ? 'py-1' : 'py-3'}
       ${small ? 'text-sm' : 'text-md'}
       ${small ? 'font-light' : 'font-semibold'}
       ${small ? 'border-[1px]' : 'border-2'}
        
    `}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {label}
    </button>
  );
};

export default Button;
