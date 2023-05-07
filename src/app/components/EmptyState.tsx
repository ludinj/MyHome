'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import Heading from './Heading';
import Button from './ui/Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({
  title = 'No exact matches',
  subtitle = 'Trey changing or removing some off your filters',
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className='h-[60vh] flex flex-col gap-2 items-center justify-center'>
      <Heading title={title} subtitle={subtitle} center />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Remove all filters'
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
