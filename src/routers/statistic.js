import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  getStatisticsController,
  getStatisticsIdController,
} from '../controllers/statistic.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { isValidClientID, isValidID } from '../middlewares/isValidId.js';

const statisticRouter = Router({ mergeParams: true });
statisticRouter.use(authenticate);

 statisticRouter.get('/', isValidID, ctrlWrapper(getStatisticsController));

statisticRouter.get(
  '/:clientId/goods',
  isValidClientID,
  ctrlWrapper(getStatisticsIdController),
);

export default statisticRouter;
