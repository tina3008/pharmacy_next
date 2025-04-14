import mongoose from 'mongoose';

import { OrdersCollection } from '../db/models/order.js';
import { ProductsCollection } from '../db/models/products.js';
import { InoutmoneysCollection } from '../db/models/inoutmoneys.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getShopStatistics = async (shopId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      throw new Error('Invalid shopId format');
    }
    const uniqueClients = await OrdersCollection.distinct('clientId', {
      shopId,
    });
    const clientCount = uniqueClients.length;
    const uniqueSuppliers = await ProductsCollection.distinct('suppliers', {
      shopId,
    });
    const supplierCount = uniqueSuppliers.length;
    const productCount = await ProductsCollection.countDocuments({ shopId });
    return { clientCount, supplierCount, productCount };
  } catch (error) {
    console.error('Statistics error:', error);
    return {
      clientCount: null,
      supplierCount: null,
      productCount: null,
    };
  }
};

export const getIOMoney = async ({ page = 1, perPage = 6 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const iOMoneyQuery = InoutmoneysCollection.find();

  const [iOMoneysCount, iOMoneys] = await Promise.all([
    InoutmoneysCollection.find().merge(iOMoneyQuery).countDocuments(),
    iOMoneyQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(iOMoneysCount, perPage, page);

  return {
    data: iOMoneys,
    ...paginationData,
  };
};

export const getRecentClientsAndOrders = async (shopId, limit = 5) => {
  const orders = await OrdersCollection.find({ shopId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('clientId', 'name email phone');

  return orders.map((order) => ({
    client: order.clientId,
    clientName: order.clientName,
    clientEmail: order.clientEmail,
    total: order.total,
    date: order.createdAt,
    order: order._id,
  }));
};

export const getDailyExpensesList = async (shopId) => {
  const expenseList = await ProductsCollection.find({ shopId })
    .select('name price supplier')
    .lean();

  return expenseList.map((product) => ({
    product: product.name,
    cost: product.price,
    supplier: product.supplier,
  }));
};

export const getDailyIncomeList = async (shopId, date = new Date()) => {
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const incomeList = await OrdersCollection.find({
    shopId,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  })
    .select('productName amount productPrice createdAt')
    .lean();

  return incomeList.map((order) => ({
    product: order.productName,
    amount: order.amount,
    total: order.total,
    date: order.createdAt,
  }));
};

export const getDetailClientsAndOrders = async (clientId) => {
  const orders = await OrdersCollection.find({ clientId })
    .populate('clientId', 'name email')
    .populate(
      'clientOrders.productId',
      'photo medicine price category supplier name',
    );

  const formattedOrders = orders.flatMap((order) =>
    order.clientOrders.map((product) => ({
      client: order.clientId,
      productId: product.productId,
      price: product.productPrice,
      amount: product.amount,
      summ: product.totalAmount,
      date: order.createdAt,
    })),
  );
  const totalSumm = formattedOrders.reduce((acc, item) => acc + item.summ, 0);
  return { orders: formattedOrders, totalSumm };
};
