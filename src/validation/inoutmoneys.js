import Joi from 'joi';

export const schemaInoutmoneysPatch = Joi.object({
  name: Joi.string().min(1).max(50),
  amount: Joi.string().min(0),
  type: Joi.string().valid('Error', 'Income', 'Expense'),
});
