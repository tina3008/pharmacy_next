import { ReviewsCollection } from '../db/models/reviews.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAllReviews = async ({
  page = 1,
  perPage = 3,
 productId,
  clientId,

}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const reviewsQuery = ReviewsCollection.find();
    reviewsQuery.where('productId').equals(productId);
    reviewsQuery.where('clientId').equals(clientId);

  const [reviewsCount, reviews] = await Promise.all([
    ReviewsCollection.find().merge(reviewsQuery).countDocuments(),
    reviewsQuery
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(reviewsCount, perPage, page);

  return {
    data: reviews,
    ...paginationData,
  };
};


function createReview(review) {
  return ReviewsCollection.create(review);
}

function deleteReview( reviewId, clientId) {
  return ReviewsCollection.findOneAndDelete({
    _id: reviewId,
    clientId,
  });
}

const patchReview = async (
  productId,
  clientId,
  payload,
  reviewId,
  options,
) => {
  const rawResult = await ReviewsCollection.findOneAndUpdate(
    { _id: productId, clientId, reviewId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;
  return {
    review: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export {
  getAllReviews,
  createReview,
  deleteReview,
  patchReview,
};
