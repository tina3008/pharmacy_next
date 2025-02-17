import { Router } from 'express';
import { isValidOrderId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { schemaOrderPost, schemaOrdertPatch } from '../validation/order.js';
import {
  getOrderController,
  createOrderController,
  deleteOrderController,
  changeOrderController,
} from '../controllers/order.js';

const orderRouter = Router({ mergeParams: true });

orderRouter.use(authenticate);

orderRouter.get('/', ctrlWrapper(getOrderController));

orderRouter.post(
  '/add',
  validateBody(schemaOrderPost),
  ctrlWrapper(createOrderController),
);
orderRouter.delete(
  '/:orderId/delete',
  isValidOrderId,
  ctrlWrapper(deleteOrderController),
);
orderRouter.put(
  '/:orderId/edit',
  isValidOrderId,
  validateBody(schemaOrdertPatch),
  ctrlWrapper(changeOrderController),
);

export default orderRouter;
