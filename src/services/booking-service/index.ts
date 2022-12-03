import { notFoundError } from "@/errors";
import bookingsRepository from "@/repositories/booking-repository";

async function listBooking(userId: number) {
  const booking = await bookingsRepository.findBooking(userId);
  if (!booking) {
    throw notFoundError();
  }
  const response = {
    id: booking.id,
    Room: booking.Room,
  };

  return response;
}

const bookingsService = {
  listBooking,
};
  
export default bookingsService;
