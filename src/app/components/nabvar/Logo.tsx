'use client';

import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  const router = useRouter();
  return (
    <Image
      alt='Logo'
      className='hidden md:block cursor-pointer'
      height={'100'}
      width={'100'}
      src={'/images/MyHome.png'}
      onClick={() => {
        router.push('/');
      }}
    />
  );
};

export default Logo;
