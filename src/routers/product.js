import { Router } from 'express';
import { isValidProductID } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  schemaProductPost,
  schemaProductPatch,
} from '../validation/product.js';
import {
  getProductIDController,
  getProductsController,
  createProductController,
  deleteProductController,
  changeProductController,
} from '../controllers/product.js';
import reviewRouter from './review.js';


const productRouter = Router({ mergeParams: true });

productRouter.use(authenticate);

productRouter.get('/', ctrlWrapper(getProductsController));

productRouter.get(
  '/:productId',
   isValidProductID,
  ctrlWrapper(getProductIDController),
);

productRouter.post(
  '/add',
  upload.single('photo'),
  validateBody(schemaProductPost),
  ctrlWrapper(createProductController),
);
productRouter.delete(
  '/:productId/delete',
  isValidProductID,
  ctrlWrapper(deleteProductController),
);
productRouter.put(
  '/:productId/edit',
  upload.single('photo'),
  isValidProductID,
  validateBody(schemaProductPatch),
  ctrlWrapper(changeProductController),
);

productRouter.use('/:productId/review', isValidProductID, reviewRouter);

export default productRouter;
