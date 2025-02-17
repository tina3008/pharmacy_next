import { Router } from 'express';
import {
  getShopIDController,
  getShopsController,
  createShopController,
  deleteShopController,
  changeShopController,
} from '../controllers/shop.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { schemaShopPost, schemaShopPatch } from '../validation/shop.js';
import { isValidID } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import productRouter from './product.js';
import statisticRouter from './statistic.js';
import { upload } from '../middlewares/multer.js';

const shopRouter = Router();

shopRouter.use(authenticate);

shopRouter.get('/', ctrlWrapper(getShopsController));

shopRouter.get('/:shopId', isValidID, ctrlWrapper(getShopIDController));

shopRouter.post(
  '/create',
  upload.single('photo'),
 validateBody(schemaShopPost),
  ctrlWrapper(createShopController),
);

shopRouter.delete(
  '/:shopId',
  isValidID,

  ctrlWrapper(deleteShopController),
);
shopRouter.put(
  '/:shopId/update',
  upload.single('photo'),
  validateBody(schemaShopPatch),
  ctrlWrapper(changeShopController),
);

shopRouter.use('/:shopId/product', isValidID, productRouter);
shopRouter.use('/:shopId/statistics', isValidID, statisticRouter);
export default shopRouter;
