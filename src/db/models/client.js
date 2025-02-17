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
    photo: { type: String },
    reviews: { type: Object, default: {} },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ClientsCollection = model('clients', clientSchema);

