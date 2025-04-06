import { Router } from 'express';
import {
  getFetchProductsController,
  getFetchProductsCategoriesController,
} from '../controllers/product.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import reviewRouter from './review.js';
import { isValidProductID } from '../middlewares/isValidId.js';

const productsRouter = Router();

productsRouter.get('/', ctrlWrapper(getFetchProductsController));
productsRouter.get('/categories', ctrlWrapper(getFetchProductsCategoriesController));
productsRouter.use('/:productId/review', isValidProductID, reviewRouter);
export default productsRouter;
