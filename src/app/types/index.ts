import { Listing, Reservation, User } from '@prisma/client';

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string;
};

export type SafeReservation = Omit<
  Reservation,
  'startDate' | 'createdAt' | 'endDate' | 'listing'
> & {
  startDate: string;
  createdAt: string;
  endDate: string;
  listing: SafeListing;
};
