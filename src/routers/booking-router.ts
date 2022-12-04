import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getBooking } from "@/controllers";
import { createBookingSchema } from "@/schemas";

const bookingsRouter = Router();

bookingsRouter
  .all("/*", authenticateToken)
  .get("/", getBooking)
  .post("/", validateBody(createBookingSchema));
  
export { bookingsRouter };
