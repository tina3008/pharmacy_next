import {
  getAllOrders,
  createOrder,
  deleteOrder,
  patchOrder,
} from '../services/order.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getOrderController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  console.log('Query Params:', req.query);

  const products = await getAllOrders({
    page,
    perPage,
    productId: req.query.productId,
    shopId: req.query.shopId,
    clientId: req.query.clientId,
  });

  res.json({
    status: 200,
    message: 'Successfully found orders!',
    data: products,
  });
};

export const createOrderController = async (req, res) => {
  const { amount, clientId, productId, shopId } = req.body;
  console.log(
    'bodylog amount, clientId, productId, shopId,',
    amount,
    clientId,
    productId,
    shopId,
  );

  const order = await createOrder(req.body);

  console.log(
    'amount, clientId, productId',
    amount,
    clientId,
    productId,
    shopId,
  );

  res.status(201).json({
    status: 201,
    message: 'Successfully created a order!',
    data: order,
  });
};

export const deleteOrderController = async (req, res) => {
  const { clientId } = req.body;
  const { orderId } = req.params;
  const order = await deleteOrder(orderId, clientId);

  if (!order) {
    throw createHttpError(404, `product not found id ${orderId}`);
  }
  res.status(204).send();
};

export const changeOrderController = async (req, res, next) => {
  const { clientId, productId } = req.body;
  const { orderId } = req.params;
  const result = await patchOrder(orderId, clientId, productId, {
    ...req.body,
  });

  if (!result) {
    next(createHttpError(404, `order not found ${orderId}`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully changed order ${orderId}!`,
    data: result.order,
  });
};
