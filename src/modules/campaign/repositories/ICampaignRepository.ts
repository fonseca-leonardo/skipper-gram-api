import User from '@modules/users/infra/models/User';
import { IFilterCampaignDTO, ICreateCampaignDTO } from '../dtos';
import Campaign from '../infra/models/Campaign';

export default interface ICampaignRepository {
  findById(campaignId: string): Promise<Campaign | null | undefined>;

  create(data: ICreateCampaignDTO): Promise<Campaign>;

  list(data: IFilterCampaignDTO): Promise<{ list: Campaign[]; count: number }>;

  delete(campaign: Campaign): Promise<void>;

  update(campaign: Campaign): Promise<Campaign>;
}
