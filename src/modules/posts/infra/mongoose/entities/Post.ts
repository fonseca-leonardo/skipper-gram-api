import { Schema, Document, Model, model } from 'mongoose';

import Post from '../../models/Post';

type PostDocument = Post & Document;

interface PostModel extends Model<PostDocument> {}

const PostSchema = new Schema<PostDocument, PostModel>(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    campaign: {
      type: Schema.Types.ObjectId,
      ref: 'Campaign',
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

export default model<PostDocument, PostModel>('Post', PostSchema);
