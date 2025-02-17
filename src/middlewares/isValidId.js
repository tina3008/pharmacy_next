import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

const validateId = (paramName, errorMessage) => (req, res, next) => {
  const id = req.params[paramName];

  if (!isValidObjectId(id)) {
    throw createHttpError(404, errorMessage);
  }

  next();
};

export const isValidID = validateId('shopId', 'Not found');
export const isValidProductID = validateId('productId', 'Product not found');
export const isValidClientID = validateId('clientId', 'Client not found');
export const isValidReviewID = validateId('reviewId', 'Review not found');
export const isValidOrderId = validateId('orderId', 'Order not found');
