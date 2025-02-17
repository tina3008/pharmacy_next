import Joi from 'joi';

// export const schemaContactPost = Joi.object({
//   name: Joi.string().min(3).max(20).required(),

//   phoneNumber: Joi.string()
//     .min(3)
//     .max(20)
//     .pattern(/[+*0-9]{3,20}$/)
//     .required(),

//   email: Joi.string()
//     .min(3)
//     .max(20)
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ['com', 'net'] },
//     }),

//   isFavourite: Joi.boolean(),

//   contactType: Joi.string().valid('work', 'home', 'personal').required(),
// });

// export const schemaContactPatch = Joi.object({
//   name: Joi.string().min(3).max(20),

//   phoneNumber: Joi.string()
//     .min(3)
//     .max(20)
//     .pattern(/[+*0-9]{3,20}$/),

//   email: Joi.string()
//     .min(3)
//     .max(20)
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ['com', 'net'] },
//     }),

//   isFavourite: Joi.boolean(),

//   contactType: Joi.string().valid('work', 'home', 'personal'),
// });


export const validClientSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/)
    .required(),
  password: Joi.string().required(),
  reviews: Joi.object(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const schemaClientPatch = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^\+?[1-9]\d{1,14}$/),
  password: Joi.string(),
  reviews: Joi.object(),
});
