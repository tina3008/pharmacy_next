import { model, Schema } from 'mongoose';

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    spent: {
      type: String,
      default: '0',
    },
    address: {
      type: String,
      required: true,
    },
    register_date: {
      type: Date,
    },
    photo: { type: String },
    reviews: { type: Object, default: {} },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ClientsCollection = model('clients', clientSchema);
