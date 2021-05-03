import ErrorMessages from '@constants/ErrorMessages';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import ICampaignRepository from '../repositories/ICampaignRepository';

interface IRequest {
  campaignId: string;
}

@injectable()
export default class DeleteCampaignService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,
  ) {}

  public async execute({ campaignId }: IRequest) {
    const campaign = await this.campaignRepository.findById(campaignId);

    if (!campaign) {
      throw new ServerError(ErrorMessages.CAMPAIGN_NOT_FOUND);
    }

    await this.campaignRepository.delete(campaign);
  }
}
