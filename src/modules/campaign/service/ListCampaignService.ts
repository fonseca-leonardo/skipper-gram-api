import ErrorMessages from '@constants/ErrorMessages';
import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import Campaign from '../infra/models/Campaign';
import ICampaignRepository from '../repositories/ICampaignRepository';

interface IRequest {
  userId: string;

  searchTerm: string;

  skip: number;

  take: number;
}

type IResponse = {
  campaignList: Campaign[];

  count: number;
};

@injectable()
export default class ListCampaignService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,
  ) {}

  public async execute({
    userId,
    searchTerm,
    skip,
    take,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { count, list } = await this.campaignRepository.list({
      take,
      skip,
      searchTerm,
      user,
    });

    return {
      campaignList: list,
      count,
    };
  }
}
