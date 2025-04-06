import { model, Schema } from 'mongoose';

const inoutmoneysSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Error', 'Income', 'Expense'],
      default: 'Expense',
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const InoutmoneysCollection = model('inoutmoneys', inoutmoneysSchema);
