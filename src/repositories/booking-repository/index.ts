import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

const bookingsRepository = {
  findBooking,
};
    
export default bookingsRepository;
  
