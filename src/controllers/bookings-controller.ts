import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import bookingsService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const booking = await bookingsService.listBooking(Number(userId));
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function postBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;

  try {
    await bookingsService.validatePostRequest(userId);
    await bookingsService.validateAvailableRoom(Number(roomId));
    const newBooking =  await bookingsService.insertBooking(Number(roomId), userId);

    return res.status(httpStatus.OK).send({ bookingId: newBooking.id });
  } catch (error) {
    if (error.name === "forbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function editBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const  bookingId = req.params.bookingId;

  try {
    await bookingsService.validateParamsPutRequest(Number(bookingId), userId);
    await bookingsService.validateAvailableRoom(Number(roomId));
    const updatedBooking = await bookingsService.updateBooking(Number(bookingId), roomId);

    return res.status(httpStatus.OK).send({ bookingId: updatedBooking.id });
  } catch (error) {
    if (error.name === "forbiddenError") {
      return res.sendStatus(httpStatus.FORBIDDEN);
    }
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "BadRequestError") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
