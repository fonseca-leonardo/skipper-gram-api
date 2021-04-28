import { Schema, Document, Model, model } from 'mongoose';

import User from '../../models/User';

type UserDocument = User & Document;

interface UserModel extends Model<UserDocument> {}

const UserSchema = new Schema<UserDocument, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
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

export default model<UserDocument, UserModel>('User', UserSchema);
