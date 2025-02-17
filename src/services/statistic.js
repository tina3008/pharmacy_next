import mongoose from 'mongoose';

import { OrdersCollection } from '../db/models/order.js';
import { ProductsCollection } from '../db/models/products.js';

export const getShopStatistics = async (shopId) => {
  console.log('shopId tatistics', shopId);
  try {
    if (!mongoose.Types.ObjectId.isValid(shopId)) {
      throw new Error('Invalid shopId format');
    }
    const uniqueClients = await OrdersCollection.distinct('clientId', {
      shopId,
    });
    const clientCount = uniqueClients.length;
    const uniqueSuppliers = await ProductsCollection.distinct('supplier', {
      shopId,
    });
    const supplierCount = uniqueSuppliers.length;
    const productCount = await ProductsCollection.countDocuments({ shopId });
    return { clientCount, supplierCount, productCount };
  } catch (error) {
    console.error('Statistics error:', error);
    return { clientCount: null, supplierCount: null, productCount: null };
  }
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
      total: order.amount * order.productPrice,
      date: order.createdAt,
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
      price: order.productPrice,
      total: order.amount * order.productPrice,
      date: order.createdAt,
    }));

};


export const getDetailClientsAndOrders = async (clientId) => {

    const orders = await OrdersCollection.find({ clientId })
      .populate('clientId', 'name email phone')
      .populate('productId', 'photo, medicine, price, category, supplier');

    return orders.map((order) => ({
      client: order.clientId,
      clientName: order.clientName,
      productName: order.productName,
      price: order.productPrice,
      amount: order.amount,
      summ: order.amount * order.productPrice,
      date: order.createdAt,
    }));

};

