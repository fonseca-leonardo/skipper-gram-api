import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/users/repositories';

import ICampaignRepository from '../repositories/ICampaignRepository';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';

interface IRequest {
  title: string;

  tagColor: string;

  userId: string;
}

interface IResponse {
  _id: string;

  title: string;

  tagColor: string;

  createdAt: Date;

  updatedAt: Date;
}

@injectable()
export default class CreateCampaignService {
  constructor(
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    title,
    tagColor,
    userId,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const campaign = await this.campaignRepository.create({
      tagColor,
      title,
      user,
    });

    return {
      _id: campaign._id,
      createdAt: campaign.createdAt,
      tagColor: campaign.tagColor,
      title: campaign.title,
      updatedAt: campaign.updatedAt,
    };
  }
}
