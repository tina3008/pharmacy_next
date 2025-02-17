import {ShopsCollection} from '../db/models/shops.js';
import { SORT_ORDER } from '../constants/index.js';

const getAllShop = async ({
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const shopsQuery = ShopsCollection.find();

  if (filter.shopType) {
    shopsQuery.where('shopType').equals(filter.shopType);
  }

  shopsQuery.where('userId').equals(userId);
  const [count, shops] = await Promise.all([
    shopsQuery.clone().countDocuments(),
    shopsQuery.sort({ [sortBy]: sortOrder }).exec(),
  ]);

  return { count, shops };
};

function getShopById(shopId, userId) {
  return ShopsCollection.findOne({ _id: shopId, userId });
}

function createShop(shop) {
  return ShopsCollection.create(shop);
}

function deleteShop(shopId, userId) {
  return ShopsCollection.findOneAndDelete({ _id: shopId, userId });
}

const patchShop = async (shopId, userId, payload, options) => {
  const rawResult = await ShopsCollection.findOneAndUpdate(
    { _id: shopId, userId },
    payload,
    {
      new: true,
      upsert: false,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    shop: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export { getAllShop, getShopById, createShop, deleteShop, patchShop };
