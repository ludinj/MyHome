'use client';
import { FC } from 'react';
import axios, { Axios, AxiosError } from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../ui/Button';
import { signIn } from 'next-auth/react';
interface RegisterModalProps {}

const RegisterModal: FC<RegisterModalProps> = ({}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/register', data);
      //  Prisma error code for unique constrains
      if (response.data.code === 'P2002') {
        toast.error(`Email already in use`);
      } else {
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      }
    } catch (error: any) {
      toast.error(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };
  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [registerModal, loginModal]);
  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome to My Home' subtitle='Create an account' />
      <Input
        id='email'
        label='Email'
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disable={isLoading}
        register={register}
        errors={errors}
        required
        type='password'
      />
    </div>
  );
  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        onClick={() => signIn('google')}
        outline
        label='Continue with Google'
        icon={FcGoogle}
      />
      <Button
        onClick={() => signIn('github')}
        outline
        label='Continue with Github'
        icon={AiFillGithub}
      />
      <div className=' text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center first:flex flex-row items-center gap-2'>
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disable={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
