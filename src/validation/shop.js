import Joi from 'joi';

export const schemaShopPost = Joi.object({
  name: Joi.string().min(3).max(20),
  owner: Joi.string().min(3).max(20),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .min(3)
    .max(20)
    .pattern(/[+*0-9]{3,20}$/)
    .required(),
  street: Joi.string().min(3).max(100).required(),
  sity: Joi.string().min(3).max(30).required(),
  zip: Joi.string().min(3).max(10).required(),
  addInfo: Joi.string().min(3).max(1000),
  delivery: Joi.string().valid('yes', 'no'),
  rating: Joi.number().min(0).max(10),
  photo: Joi.string().min(0).max(100),
});

export const schemaShopPatch = Joi.object({
  name: Joi.string().min(3).max(20),
  owner: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string()
    .min(3)
    .max(20)
    .pattern(/[+*0-9]{3,20}$/),
  street: Joi.string().min(3).max(100),
  sity: Joi.string().min(3).max(30),
  zip: Joi.string().min(3).max(10),
  addInfo: Joi.string().min(3).max(100),
  delivery: Joi.string().valid('yes', 'no'),
  rating: Joi.number().min(0).max(10),
  photo: Joi.string().min(0).max(100),
});


