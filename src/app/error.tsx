'use client';

import { useEffect } from 'react';

import { FC } from 'react';
import EmptyState from './components/EmptyState';
interface ErrorStateProps {
  error: Error;
}

const ErrorState: FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title='Error' subtitle='Something went wrong' />;
};

export default ErrorState;
