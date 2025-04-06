import { ProductsCollection } from '../db/models/products.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

const getAllProducts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
  shopId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

   const productsQuery = ProductsCollection.find();
  productsQuery.where('shopId').equals(shopId);
  productsQuery.where('userId').equals(userId);

  const [productsCount, products] = await Promise.all([
    ProductsCollection.find().merge(productsQuery).countDocuments(),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return {
    data: products,
    ...paginationData,
  };
};

const getFechProducts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const productsQuery = ProductsCollection.find();
  if (filter.category) {
    productsQuery.where('category').equals(filter.category);
  }
  if (filter.name) {
    productsQuery.where('name').equals(filter.name);
  }
  const [productsCount, products] = await Promise.all([
    ProductsCollection.find().merge(productsQuery).countDocuments(),
    productsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, perPage, page);

  return {
    data: products,
    ...paginationData,
  };
};

const getCategoryProduct =  () => {
  return ProductsCollection.distinct('category');
};

function getProductById(productId, userId, shopId) {
  return ProductsCollection.findOne({ _id: productId, userId, shopId });
}

function createProduct(product) {
  return ProductsCollection.create(product);
}

function deleteProduct(productId, userId, shopId) {
  return ProductsCollection.findOneAndDelete({
    _id: productId,
    userId,
    shopId,
  });
}

const patchProduct = async (productId, userId, shopId, payload, options) => {
  const rawResult = await ProductsCollection.findOneAndUpdate(
    { _id: productId, userId, shopId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    Product: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  patchProduct,
  getFechProducts,
  getCategoryProduct,
};
