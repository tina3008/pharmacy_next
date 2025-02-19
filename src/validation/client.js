import Joi from 'joi';
export const validClientSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required(),
  password: Joi.string().required(),
  reviews: Joi.object(),
  spent: Joi.string().required(),
  address: Joi.string(),
  register_date: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const schemaClientPatch = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/),
  password: Joi.string(),
  reviews: Joi.object(),
  spent: Joi.string().required(),
  address: Joi.string(),
  register_date: Joi.string(),
});
