import { badRequestError, forbiddenError, notFoundError } from "@/errors";
import bookingsRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelRepository from "@/repositories/hotel-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { Booking } from "@prisma/client";

async function listBooking(userId: number) {
  const booking = await bookingsRepository.findBookingByUserId(userId);
  if (!booking) {
    throw notFoundError();
  }
  const response = {
    id: booking.id,
    Room: booking.Room,
  };

  return response;
}

async function validatePostRequest(userId: number): Promise<void> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw forbiddenError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw forbiddenError();
  }

  if(ticket.status !== "PAID" || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
}

async function validateAvailableRoom(roomId: number): Promise<void> {
  const room = await hotelRepository.findRoomsById(roomId);

  if(!room) throw notFoundError();

  const bookings = await bookingsRepository.findBookingsByRoomId(roomId);

  if(room.capacity === bookings.length) throw forbiddenError();
}

async function insertBooking(roomId: number, userId: number): Promise<Booking> {
  const booking = await bookingsRepository.findBookingByUserId(userId);

  if(booking) throw forbiddenError();

  const newBooking = await bookingsRepository.createBooking(roomId, userId);
  return newBooking;
}

async function validateParamsPutRequest(bookingId: number, userId: number): Promise<void> {
  if(bookingId <= 0 ) throw notFoundError();

  if(!bookingId) throw badRequestError();
  
  const booking = await bookingsRepository.findBookingByBookingId(bookingId);

  if(!booking ) throw notFoundError();

  if(booking.userId !== userId) throw forbiddenError();
}

async function updateBooking(bookingId: number, roomId: number): Promise<Booking> {
  const updatedBooking = await bookingsRepository.updateBookingbyId(bookingId, roomId);

  return updatedBooking;
}

const bookingsService = {
  listBooking,
  validatePostRequest,
  validateAvailableRoom,
  insertBooking,
  validateParamsPutRequest,
  updateBooking,
};
  
export default bookingsService;
