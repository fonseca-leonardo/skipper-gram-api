import ErrorMessages from '@constants/ErrorMessages';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import ICampaignRepository from '../repositories/ICampaignRepository';

interface IRequest {
  campaignId: string;

  title?: string;

  tagColor?: string;
}

@injectable()
export default class UpdateCampaignService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,
  ) {}

  public async execute({ campaignId, title, tagColor }: IRequest) {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new ServerError(ErrorMessages.CAMPAIGN_NOT_FOUND);
    }

    if (title) {
      campaign.title = title;
    }

    if (tagColor) {
      campaign.tagColor = tagColor;
    }

    const updatedCampaign = await this.campaignRepository.update(campaign);

    return updatedCampaign;
  }
}
