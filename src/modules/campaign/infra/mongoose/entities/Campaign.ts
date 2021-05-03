import { Schema, Document, Model, model } from 'mongoose';
import MongoosePost from '@modules/posts/infra/mongoose/entities/Post';

import Campaign from '../../models/Campaign';

type CampaignDocument = Campaign & Document;

interface CampaignModel extends Model<CampaignDocument> {}

const CampaignSchema = new Schema<CampaignDocument, CampaignModel>(
  {
    title: {
      type: String,
      required: true,
    },

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

export default model<CampaignDocument, CampaignModel>(
  'Campaign',
  CampaignSchema,
);
