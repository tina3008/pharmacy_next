import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  patchProduct,
} from '../services/product.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getProductsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const products = await getAllProducts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
    shopId: req.params.shopId,
  });

  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductIDController = async (req, res) => {
  const { productId, shopId } = req.params;
  const product = await getProductById(productId, req.user._id, shopId);

  if (!product) {
    throw createHttpError(404, `product not found, ${productId}`);
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const photo = req.file;
  let photoUrl;
  const { shopId } = req.params;
  console.log('shopId', shopId);

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const productFields = {
    ...req.body,
    userId: req.user._id,
    shopId,
    photo: photoUrl,
  };

  console.log('productFields', productFields);

  const product = await createProduct(productFields);
  // await updateStatistics();
  res.status(201).json({
    status: 201,
    message: 'Successfully created a product!',
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId, shopId } = req.params;
  const product = await deleteProduct(productId, req.user._id, shopId);

  if (!product) {
    throw createHttpError(404, `product not found id ${productId}`);
  }
  res.status(204).send();
};

export const changeProductController = async (req, res, next) => {
  const { productId, shopId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await patchProduct(productId, req.user._id, shopId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, `Product not found ${productId}`));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully changed product ${productId}!`,
    data: result.Product,
  });
};
