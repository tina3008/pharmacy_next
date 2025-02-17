import Joi from 'joi';

export const schemaReviewPost = Joi.object({
  clientName: Joi.string().min(1).max(50).required(),
  review: Joi.string().min(1).max(1000).required(),
  productPhoto: Joi.string().min(1).max(100),
  rating: Joi.number().min(0).max(10),
});

export const schemaReviewtPatch = Joi.object({
  clientName: Joi.string().min(1).max(50),
  review: Joi.string().min(1).max(1000),
  productPhoto: Joi.string().min(1).max(100),
  rating: Joi.number().min(0).max(10),
});
