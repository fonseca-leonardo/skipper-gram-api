import { Schema, Document, Model, model } from 'mongoose';

import RecoverPassword from '../../models/RecoverPassword';

type RecoverPasswordDocument = RecoverPassword & Document;

interface RecoverPasswordModel extends Model<RecoverPasswordDocument> {}

const RecoverPasswordSchema = new Schema<
  RecoverPasswordDocument,
  RecoverPasswordModel
>(
  {
    isUsed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export default model<RecoverPasswordDocument, RecoverPasswordModel>(
  'RecoverPassword',
  RecoverPasswordSchema,
);
