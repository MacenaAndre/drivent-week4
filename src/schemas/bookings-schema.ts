import Joi from "joi";

type BodyPostBooking = {
    roomId: number,
}

export const createBookingSchema = Joi.object<BodyPostBooking>({
  roomId: Joi.number().required(),
});
