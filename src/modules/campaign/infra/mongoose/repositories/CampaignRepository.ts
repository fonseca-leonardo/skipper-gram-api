import { ICreateCampaignDTO, IFilterCampaignDTO } from '@modules/campaign/dtos';
import ICampaignRepository from '@modules/campaign/repositories/ICampaignRepository';
import Campaign from '../../models/Campaign';

import MongooseCampaign from '../entities/Campaign';
import MongoosePost from '@modules/posts/infra/mongoose/entities/Post';

export default class CampaignRepository implements ICampaignRepository {
  public async findById(
    campaignId: string,
  ): Promise<Campaign | undefined | null> {
    const campaign = await MongooseCampaign.findById(campaignId);

    return campaign;
  }

  public async create(data: ICreateCampaignDTO): Promise<Campaign> {
    const campaign = new MongooseCampaign(data);

    await campaign.save();

    return campaign;
  }

  public async list({
    user,
    searchTerm,
    skip,
    take,
  }: IFilterCampaignDTO): Promise<{ list: Campaign[]; count: number }> {
    const list = await MongooseCampaign.find({
      user,
      title: { $regex: `.*${searchTerm}.*`, $options: 'i' },
    })
      .skip(skip)
      .limit(take)
      .exec();

    const count = await MongooseCampaign.find({
      user,
      title: { $regex: `.*${searchTerm}.*`, $options: 'i' },
    })
      .countDocuments()
      .exec();

    return { list, count };
  }
  public async delete(campaign: Campaign): Promise<void> {
    await MongoosePost.updateMany({ campaign: campaign }, { campaign: null });

    await MongooseCampaign.deleteOne({ _id: campaign._id });
  }

  public async update(campaign: Campaign): Promise<Campaign> {
    await MongooseCampaign.updateOne({ _id: campaign._id }, campaign).exec();

    return campaign;
  }
}
