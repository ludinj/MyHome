import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';

import { FC } from 'react';
import ReservationsClient from './ReservationsClient';

interface pageProps {}

const page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorize' subtitle='Please login' />
      </ClientOnly>
    );
  }
  const reservations = await getReservations({ authorId: currentUser.id });
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle='Looks like you have no reservations on your property'
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default page;
