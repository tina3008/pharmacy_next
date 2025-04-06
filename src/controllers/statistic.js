import {
  getDailyExpensesList,
  getDailyIncomeList,
  getRecentClientsAndOrders,
  getShopStatistics,
  getDetailClientsAndOrders,
  getIOMoney,
} from '../services/statistic.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getStatisticsController = async (req, res) => {
  const { shopId } = req.params;
  const { page, perPage } = parsePaginationParams(req.query);

  if (!shopId) {
    return res.status(400).json({ message: 'shopId is missing' });
  }
  const stats = await getShopStatistics(shopId);

  const recentClients = await getRecentClientsAndOrders(shopId);
  const dailyIncomeList = await getDailyIncomeList(shopId);
  const dailyExpensesList = await getDailyExpensesList(shopId);

  const dailyIOMoney = await getIOMoney({
    page,
    perPage,
  });

  if (!recentClients) {
    throw createHttpError(404, `clients not found`);
  }
  if (!dailyIncomeList) {
    throw createHttpError(404, `income not found`);
  }
  if (!dailyExpensesList) {
    throw createHttpError(404, `expenses not found`);
  }
  if (!dailyIOMoney) {
    throw createHttpError(404, `money statistic not found`);
  }
  const totalIncome = dailyIncomeList.reduce(
    (sum, order) => sum + order.total,
    0,
  );
  const totalExpenses = dailyExpensesList.reduce(
    (sum, expense) => sum + parseFloat(expense.cost),
    0,
  );

  res.status(200).json({
    status: 200,
    message: `Successfully found statistic for  id ${shopId}!`,
    data: stats,
    recentClients,
    incomeList: dailyIncomeList,
    expenseList: dailyExpensesList,
    totalIncome,
    totalExpenses,
    profit: totalIncome - totalExpenses,
    dailyIOMoney,
  });
};

export const getStatisticsIdController = async (req, res) => {
  const { clientId } = req.params;

  const { orders, totalSumm } = await getDetailClientsAndOrders(clientId);

  if (!orders || orders.length === 0) {
    throw createHttpError(404, `Statistic not found for clientId ${clientId}`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found statistics for id ${clientId}!`,
    orders,
    totalSumm,
  });
};
