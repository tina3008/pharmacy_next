import { Router } from 'express';
import shopRouter from './shop.js';
import authRouter from './auth.js';
// import statisticRouter from './statistic.js';
import clientRouter from './client.js';
import orderRouter from './order.js';
import productsRouter from './products.js';
const router = Router();

router.use('/shop', shopRouter);
router.use('/user', authRouter);
router.use('/client', clientRouter);
router.use('/order', orderRouter);
router.use('/products', productsRouter);
// router.use('/statistics', statisticRouter);


export default router;
