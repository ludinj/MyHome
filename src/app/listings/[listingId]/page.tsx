import { FC } from 'react';
import getListingById from '../../actions/getListingById';
import EmptyState from '../../components/EmptyState';
import ClientOnly from '../../components/ClientOnly';
import getCurrentUser from '../../actions/getCurrentUser';
import ListingClient from './ListingClient';
import getReservations from '../../actions/getReservations';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState
          title='No listing found'
          subtitle='No listing with that id was found'
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  );
};

export default ListingPage;
