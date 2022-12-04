import { prisma } from "@/config";
import { Booking } from "@prisma/client";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function findBookingsByRoomId(roomId: number) {
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

const bookingsRepository = {
  findBooking,
  findBookingsByRoomId,
  createBooking,
};
    
export default bookingsRepository;
  
