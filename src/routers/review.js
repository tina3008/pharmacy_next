import { Router } from 'express';
import { isValidReviewID } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { schemaReviewPost, schemaReviewtPatch } from '../validation/review.js';
import {
  getReviewController,
  createReviewerController,
  deleteReviewController,
  changeReviewController,
} from '../controllers/review.js';

const reviewRouter = Router({ mergeParams: true });

reviewRouter.use(authenticate);

reviewRouter.get('/', ctrlWrapper(getReviewController));

reviewRouter.post(
  '/add',
  validateBody(schemaReviewPost),
  ctrlWrapper(createReviewerController),
);
reviewRouter.delete(
  '/:reviewId/delete',
  isValidReviewID,
  ctrlWrapper(deleteReviewController),
);
reviewRouter.put(
  '/:reviewId/edit',
  isValidReviewID,
  validateBody(schemaReviewtPatch),
  ctrlWrapper(changeReviewController),
);

export default reviewRouter;
