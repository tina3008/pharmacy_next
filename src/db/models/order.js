import mongoose, { model, Schema } from 'mongoose';

const OrdersSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientPhone: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    productPhoto: {
      type: String,
    },
    shopName: {
      type: String,
      required: true,
    },
    shopPhone: {
      type: String,
      required: true,
    },
    shopEmail: {
      type: String,
      required: true,
    },
    shopStreet: {
      type: String,
      required: true,
    },
    shopSity: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'Completed',
        'Confirmed',
        'Pending',
        'Cancelled',
        'Processing',
        'Shipped',
        'Delivered',
      ],
      default: 'Processing',
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'shops',
      required: true,
      // default: new mongoose.Types.ObjectId('67a7acc7eab0986670cccd1b'),
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'clients',
      required: true,
      // default: new mongoose.Types.ObjectId('65dfb600243f7f001c5e36b3'),
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
      // default: new mongoose.Types.ObjectId('67aa817202c59a4a92629569'),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrdersCollection = model('orders', OrdersSchema);
