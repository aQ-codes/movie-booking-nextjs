import Joi from 'joi';

// Joi schema for banner validation
const bannerSchema = Joi.object({
  imageUrl: Joi.string().uri().required().messages({
    'string.uri': 'Image URL must be a valid URL',
    'any.required': 'Image URL is required'
  }),
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
  }),
  status: Joi.string().valid('active', 'inactive').default('active').messages({
    'any.only': 'Status must be either active or inactive',
  }),
});

// Validator middleware to validate the request body
export const validateBanner = (req, res, next) => {
    console.log("entered validate banner")
  const { error } = bannerSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map(err => err.message),
    });
  }

  next(); // Move to the next middleware/controller if validation is successful
};
