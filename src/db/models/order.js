
import { model, Schema } from 'mongoose';

const ClientOrdersSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    productName: {
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
    productCategory: {
      type: String,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: function () {
        return this.productPrice * this.amount;
      },
    },
  },
  {
    _id: false,
  },
);

const OrdersSchema = new Schema(
  {
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
    clientAddress: {
      type: String,
      required: true,
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
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: 'clients',
      required: true,
    },
    clientOrders: [ClientOrdersSchema],
    total: {
      type: Number,
      required: true,
      default: function () {
        return this.clientOrders.reduce(
          (sum, order) => sum + order.totalAmount,
          0,
        );
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrdersCollection = model('orders', OrdersSchema);
