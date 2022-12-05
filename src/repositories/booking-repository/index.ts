import { prisma } from "@/config";
import { Booking } from "@prisma/client";

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function findBookingByBookingId(bookingId: number): Promise<Booking> {
  return prisma.booking.findUnique({
    where: { id: bookingId },
  });
}

async function findBookingsByRoomId(roomId: number): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: { roomId },
  });
}

async function createBooking(roomId: number, userId: number): Promise<Booking> {
  return prisma.booking.create({
    data: { 
      roomId,
      userId, 
    },
  });
}

async function updateBookingbyId(bookingId: number, roomId: number): Promise<Booking> {
  return prisma.booking.update({
    where: { id: bookingId },
    data: { 
      roomId,
      updatedAt: new Date 
    },
  });
}

const bookingsRepository = {
  findBookingByUserId,
  findBookingByBookingId,
  findBookingsByRoomId,
  createBooking,
  updateBookingbyId,
};
    
export default bookingsRepository;
  
