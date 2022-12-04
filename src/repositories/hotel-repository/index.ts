import { prisma } from "@/config";
import { Room } from "@prisma/client";

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    }
  });
}

async function findRoomsById(roomId: number): Promise<Room> {
  return prisma.room.findUnique({
    where: {
      id: roomId,
    }
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findRoomsById,
};

export default hotelRepository;
