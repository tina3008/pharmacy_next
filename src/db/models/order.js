import  { model, Schema } from 'mongoose';

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
    clientAddress:
      {type: String,
      required: true,}
    ,
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
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,

    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrdersCollection = model('orders', OrdersSchema);
