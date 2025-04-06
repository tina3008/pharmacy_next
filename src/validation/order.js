import Joi from 'joi';

// export const schemaOrderPost = Joi.object({
//   productName: Joi.string().min(1).max(50).required(),
//   clientName: Joi.string().min(1).max(50).required(),
//   clientPhone: Joi.string()
//     .min(3)
//     .max(20)
//     .pattern(/[+*0-9]{3,20}$/)
//     .required(),
//   clientEmail: Joi.string().email().required(),
//   productPrice: Joi.number().min(0).max(100000).required(),
//   amount: Joi.number().min(0).max(50).required(),
//   shopName: Joi.string().min(1).max(50).required(),
//   shopPhone: Joi.string()
//     .min(3)
//     .max(20)
//     .pattern(/[+*0-9]{3,20}$/)
//     .required(),
//   shopEmail: Joi.string().email().required(),
//   shopStreet: Joi.string().min(1).max(50).required(),
//   shopSity: Joi.string().min(1).max(50).required(),
//   status: Joi.string().valid(
//     'Completed',
//     'Confirmed',
//     'Pending',
//     'Cancelled',
//     'Processing',
//     'Shipped',
//     'Delivered',
//   ),
//   clientAddress: Joi.string().min(1).max(50),
// });

const clientOrderSchema = Joi.object({
  productId: Joi.string().required(),
  productName: Joi.string().min(1).max(50),
  productPrice: Joi.number().min(0).max(100000),
  amount: Joi.number().min(1).max(50).required(),
  productPhoto: Joi.string().allow(null, ''),
  totalAmount: Joi.number().min(0),
});

export const schemaOrderPost = Joi.object({
  // clientName: Joi.string().min(1).max(50).required(),
  // clientPhone: Joi.string()
  //   .min(3)
  //   .max(20)
  //   .pattern(/[+*0-9]{3,20}$/)
  //   .required(),
  // clientEmail: Joi.string().email().required(),
  // clientAddress: Joi.string().min(1).max(50).required(),
  // shopName: Joi.string().min(1).max(50).required(),
  // shopPhone: Joi.string()
  //   .min(3)
  //   .max(20)
  //   .pattern(/[+*0-9]{3,20}$/)
  //   .required(),
  // shopEmail: Joi.string().email().required(),
  // shopStreet: Joi.string().min(1).max(50).required(),
  // shopSity: Joi.string().min(1).max(50).required(),
  status: Joi.string()
    .valid(
      'Completed',
      'Confirmed',
      'Pending',
      'Cancelled',
      'Processing',
      'Shipped',
      'Delivered',
    )
    .default('Processing'),
  shopId: Joi.string().required(),
  clientId: Joi.string().required(),
  clientOrders: Joi.array().items(clientOrderSchema).min(1).required(),
});


export const schemaOrdertPatch = Joi.object({
  // productName: Joi.string().min(1).max(50),
  // clientName: Joi.string().min(1).max(50),
  // clientPhone: Joi.string()
  //   .min(3)
  //   .max(20)
  //   .pattern(/[+*0-9]{3,20}$/),
  // clientEmail: Joi.string().email(),
  // productPrice: Joi.number().min(0).max(100000),
  // amount: Joi.number().min(0).max(50),
  // shopName: Joi.string().min(1).max(50),
  // shopPhone: Joi.string()
  //   .min(3)
  //   .max(20)
  //   .pattern(/[+*0-9]{3,20}$/),
  // shopEmail: Joi.string().email(),
  // shopStreet: Joi.string().min(1).max(50),
  // shopSity: Joi.string().min(1).max(50),
  // status: Joi.string().valid(
  //   'Completed',
  //   'Confirmed',
  //   'Pending',
  //   'Cancelled',
  //   'Processing',
  //   'Shipped',
  //   'Delivered',
  // ),
  // clientAddress: Joi.string().min(1).max(50),

  clientName: Joi.string().min(1).max(50),
  clientPhone: Joi.string()
    .min(3)
    .max(20)
    .pattern(/[+*0-9]{3,20}$/),
  clientEmail: Joi.string().email(),
  clientAddress: Joi.string().min(1).max(50),
  shopName: Joi.string().min(1).max(50),
  shopPhone: Joi.string()
    .min(3)
    .max(20)
    .pattern(/[+*0-9]{3,20}$/),
  shopEmail: Joi.string().email(),
  shopStreet: Joi.string().min(1).max(50),
  shopSity: Joi.string().min(1).max(50),
  status: Joi.string()
    .valid(
      'Completed',
      'Confirmed',
      'Pending',
      'Cancelled',
      'Processing',
      'Shipped',
      'Delivered',
    )
    .default('Processing'),
  shopId: Joi.string(),
  clientId: Joi.string(),
  clientOrders: Joi.array().items(clientOrderSchema).min(1),
});

