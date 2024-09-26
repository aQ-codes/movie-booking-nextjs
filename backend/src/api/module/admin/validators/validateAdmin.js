import Joi from 'joi';

// Admin login validation schema
export const validateAdminLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password'),
    });

    return schema.validate(data);
};


