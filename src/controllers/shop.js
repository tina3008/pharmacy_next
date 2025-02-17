import {
  createShop,
  deleteShop,
  getAllShop,
  getShopById,
  patchShop,
} from '../services/shop.js';
import createHttpError from 'http-errors';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getShopsController = async (req, res) => {
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const shops = await getAllShop({
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.json({
    status: 200,
    message: 'Successfully found shops!',
    data: shops,
  });
};

export const getShopIDController = async (req, res) => {
  const { shopId } = req.params;
  const shop = await getShopById(shopId, req.user._id);

  if (!shop) {
    throw createHttpError(404, `Shop not found, ${shopId}`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found shop with id ${shopId}!`,
    data: shop,
  });
};

export const createShopController = async (req, res) => {
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const shopFields = {
  ...req.body,
  userId: req.user._id,
  photo: photoUrl,
  };

  const shop = await createShop(shopFields);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a shop!',
    data: shop,
  });
};

export const deleteShopController = async (req, res) => {
  const { shopId } = req.params;

  const contact = await deleteShop(shopId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'shop not found');
  }

  res.status(204).send();
};

export const changeShopController = async (req, res, next) => {
  const { shopId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await patchShop(shopId, req.user._id, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, `shop not found ${shopId}`));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a shop!',
    data: result.shop,
  });
};
