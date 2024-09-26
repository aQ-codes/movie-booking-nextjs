import Joi from 'joi';

export const validateEmail = (email) => {
    const schema = Joi.string().email().required();
    return schema.validate(email);
};


