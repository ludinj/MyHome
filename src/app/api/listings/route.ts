import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '../../actions/getCurrentUser';
export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await req.json();

  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      throw new Error('Something went wrong');
    }
  });

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      locationValue: location.value,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
