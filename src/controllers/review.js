import {
  getAllReviews,
  createReview,
  deleteReview,
  patchReview,
} from '../services/review.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getReviewController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const products = await getAllReviews({
    page,
    perPage,
    productId: req.params.productId,
    shopId: req.params.shopId,
  });

  res.json({
    status: 200,
    message: 'Successfully found reviews!',
    data: products,
  });
};

export const createReviewerController = async (req, res) => {
  const { shopId, productId, clientId } = req.params;
  const productFields = {
    ...req.body,
    userId: req.user._id,
    shopId,
    productId,
    clientId,
  };

  const product = await createReview(productFields);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a review!',
    data: product,
  });
};

export const deleteReviewController = async (req, res) => {
  const { reviewId, clientId } = req.params;
  const review = await deleteReview(clientId, reviewId);

  if (!review) {
    throw createHttpError(404, `product not found id ${reviewId}`);
  }
  res.status(204).send();
};

export const changeReviewController = async (req, res, next) => {
  const { reviewId, clientId, productId } = req.params;

  const result = await patchReview(reviewId, clientId, productId, {
    ...req.body,
  });

  if (!result) {
    next(createHttpError(404, `Review not found ${reviewId}`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully changed review ${reviewId}!`,
    data: result.review,
  });
};
