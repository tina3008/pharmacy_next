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
  try {
    const { clientId, shopId, clientOrders } = req.body;

    console.log('Request body:', req.body);

    if (!clientOrders || !Array.isArray(clientOrders) || !clientOrders.length) {
      return res.status(400).json({
        status: 400,
        message: 'clientOrders must be a non-empty array',
      });
    }

    const order = await createOrder({ clientId, shopId, clientOrders });

    res.status(201).json({
      status: 201,
      message: 'Successfully created an order!',
      data: order,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    });
  }
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
