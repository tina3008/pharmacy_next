import Joi from 'joi';

export const schemaProductPost = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  price: Joi.string().required(),
  category: Joi.string().min(1).max(50),
  medicine: Joi.string().min(1).max(10000),
  suppliers: Joi.string().min(1).max(100),
  brend: Joi.string().min(1).max(100),
  rating: Joi.number().min(0).max(10),
  stock: Joi.string().min(0),
  photo: Joi.string().allow(''),

});

export const schemaProductPatch = Joi.object({
  name: Joi.string().min(1).max(50),
  price: Joi.string(),
  category: Joi.string().min(1).max(50),
  medicine: Joi.string().min(1).max(10000),
  suppliers: Joi.string().min(1).max(100),
  brend: Joi.string().min(1).max(100),
  rating: Joi.number().min(0).max(10),
  stock: Joi.string().min(0),
  photo: Joi.string().uri().allow('').optional(),
});

