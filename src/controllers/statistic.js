import {
  getDailyExpensesList,
  getDailyIncomeList,
  getRecentClientsAndOrders,
  getShopStatistics,
  getDetailClientsAndOrders,
} from '../services/statistic.js';
import createHttpError from 'http-errors';

export const getStatisticsController = async (req, res) => {
  const { shopId } = req.params;

  if (!shopId) {
    return res.status(400).json({ message: 'shopId is missing' });
  }
  const stats = await getShopStatistics(shopId);

  const recentClients = await getRecentClientsAndOrders(shopId);
  const dailyIncomeList = await getDailyIncomeList(shopId);
  const dailyExpensesList = await getDailyExpensesList(shopId);

  if (!recentClients) {
    throw createHttpError(404, `clients not found`);
  }
  if (!dailyIncomeList) {
    throw createHttpError(404, `income not found`);
  }
  if (!dailyExpensesList) {
    throw createHttpError(404, `expenses not found`);
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
  });
};

export const getStatisticsIdController = async (req, res) => {
  const { clientId } = req.params;

  const statClientOrders = await getDetailClientsAndOrders(clientId);

  if (!statClientOrders || statClientOrders.length === 0) {
    throw createHttpError(404, `Statistic not found, ${clientId}`);
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found statistics for id ${clientId}!`,
    data: statClientOrders,
  });
};
