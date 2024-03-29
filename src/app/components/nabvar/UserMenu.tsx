'use client';
import { FC, RefObject, useCallback, useRef, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';

import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '../../hooks/useRentModal';
import { useRouter } from 'next/navigation';
import useOnClickOutside from '../../hooks/useOnClickOutside';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsOpen(false));

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const router = useRouter();
  const toggleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  const handleMenuItemClick = (path: string) => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    } else {
      router.push(path);
    }
  };
  return (
    <div className='relative '>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={onRent}
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
        >
          My Home
        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          ref={ref}
          className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'
        >
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => handleMenuItemClick('/trips')}
                  label='My trips'
                />
                <MenuItem
                  onClick={() => handleMenuItemClick('/favorites')}
                  label='My favorites'
                />
                <MenuItem
                  onClick={() => handleMenuItemClick('/reservations')}
                  label='My reservations'
                />
                <MenuItem
                  onClick={() => handleMenuItemClick('/properties')}
                  label='My properties'
                />
                <MenuItem onClick={rentModal.onOpen} label='My Home' />
                <hr />
                <MenuItem onClick={() => signOut()} label='Log out' />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='Login' />
                <MenuItem onClick={registerModal.onOpen} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
