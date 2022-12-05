import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { editBooking, getBooking, postBooking } from "@/controllers";
import { createBookingSchema } from "@/schemas";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(createBookingSchema), postBooking)
  .put("/:bookingId", validateBody(createBookingSchema), editBooking);
  
export { bookingsRouter };
