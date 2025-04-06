import { model, Schema } from 'mongoose';

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    medicine: {
      type: String,

    },
    suppliers: {
      type: String,

    },
    brend: {
      type: String,

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
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'shop',
      required: true,
    },
    stock: {
        type: String,
      default: "0",
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

export const ProductsCollection = model('products', productsSchema);

