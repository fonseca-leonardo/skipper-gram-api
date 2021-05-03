import { Schema, Document, Model, model } from 'mongoose';
import Hashtag from '../../models/Hashtag';

type HashtagDocument = Hashtag & Document;

interface HashtagModel extends Model<HashtagDocument> {}

const HashtagSchema = new Schema<HashtagDocument, HashtagModel>(
  {
    name: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    tagColor: {
      type: String,
      required: true,
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

export default model<HashtagDocument, HashtagModel>('Hashtag', HashtagSchema);
