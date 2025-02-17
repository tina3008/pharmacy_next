import { model, Schema } from 'mongoose';

const shopsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    sity: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    addInfo: {
      type: String,
    },
    delivery: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no',
    },
    rating: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ShopsCollection = model('shops', shopsSchema);

