import { OrdersCollection } from '../db/models/order.js';
import { ProductsCollection } from '../db/models/products.js';
import { ClientsCollection } from '../db/models/client.js';
import { ShopsCollection } from '../db/models/shops.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllOrders = async ({
  page = 1,
  perPage = 10,
  productId,
  shopId,
  clientId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const ordersQuery = OrdersCollection.find();

  if (productId) ordersQuery.where('productId').equals(productId);
  if (clientId) ordersQuery.where('clientId').equals(clientId);
  if (shopId) ordersQuery.where('shopId').equals(shopId);

  const [ordersCount, orders] = await Promise.all([
    OrdersCollection.countDocuments(ordersQuery.getFilter()),
    ordersQuery.skip(skip).limit(limit).exec(),
  ]);

  const paginationData = calculatePaginationData(ordersCount, perPage, page);

  return {
    data: orders,
    ...paginationData,
  };
};

const createOrder = async ({ clientId, productId, amount, shopId }) => {
  if (!clientId || !productId || !amount) {
    throw { status: 400, message: 'All fields important!' };
  }

  const client = await ClientsCollection.findById(clientId);
  if (!client) {
    throw { status: 404, message: 'Client not found' };
  }
  const shop = await ShopsCollection.findById(shopId);
  if (!client) {
    throw { status: 404, message: 'Shop not found' };
  }

  const product = await ProductsCollection.findById(productId);
  if (!product) {
    throw { status: 404, message: 'Product not found' };
  }

  const newOrder = new OrdersCollection({
    clientId,
    productId,
    shopId,
    amount,
    productName: product.name,
    productPrice: product.price,
    productPhoto: product.photo,
    shopName: shop.name,
    shopPhone: shop.phone,
    shopEmail: shop.email,
    shopStreet: shop.street,
    shopSity: shop.sity,
    clientName: client.name,
    clientPhone: client.phone,
    clientEmail: client.email,
  });
  console.log('newOrder---', newOrder);

  await newOrder.save();

  return await OrdersCollection.findById(newOrder._id)
    .populate('clientId', 'name phone email')
    .populate('productId', 'name price photo')
    .populate('shopId', 'name phone email street city');
};

function deleteOrder(orderId, clientId) {
  console.log("del _id: orderId,clientId,", orderId, clientId);

  return OrdersCollection.findOneAndDelete({
    _id: orderId,
    clientId,
  });
}

const patchOrder = async (productId, clientId, payload, orderId, options) => {
  const rawResult = await OrdersCollection.findOneAndUpdate(
    { _id: productId, clientId, orderId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    order: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export { getAllOrders, createOrder, deleteOrder, patchOrder };
