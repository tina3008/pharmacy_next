import mongoose, { model, Schema } from 'mongoose';

const ReviewsSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    productPhoto: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
    },

    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'client',
      required: true,
      default: new mongoose.Types.ObjectId('67a9a018c3563e35a1c11ef3'),
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
      default: new mongoose.Types.ObjectId('67aa817202c59a4a92629569'),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ReviewsCollection = model('reviews', ReviewsSchema);
