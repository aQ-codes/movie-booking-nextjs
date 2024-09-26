import Joi from 'joi';

// Joi schema for booking validation
const bookingSchema = Joi.object({
  bookingId: Joi.string().required().messages({
    'any.required': 'Booking ID is required',
  }),
  show: Joi.string().required().messages({
    'any.required': 'Show ID is required',
  }),
  customer: Joi.string().required().messages({
    'any.required': 'Customer ID is required',
  }),
  seats: Joi.array().items(Joi.string()).required().messages({
    'array.includesRequiredUnknowns': 'Seats are required and must be an array of strings',
    'any.required': 'Seats are required',
  }),
  amount: Joi.number().required().messages({
    'any.required': 'Amount is required',
  }),
});

// Validator middleware to validate the request body
export const validateBooking = (req, res, next) => {
  console.log("entered validate booking");

  const { error } = bookingSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map(err => err.message),
    });
  }

  next(); // Move to the next middleware/controller if validation is successful
};
