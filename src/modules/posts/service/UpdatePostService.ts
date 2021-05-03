import { inject, injectable } from 'tsyringe';

import ErrorMessages from '@constants/ErrorMessages';
import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';

import IPostRepository from '../repositories/IPostRepository';
import ICampaignRepository from '@modules/campaign/repositories/ICampaignRepository';

interface IRequest {
  postId: string;

  text?: string;

  title?: string;

  userId: string;

  campaignId?: string;
}

interface IResponse {}

@injectable()
export default class UpdatePostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CampaignRepository')
    private campaignRepository: ICampaignRepository,
  ) {}

  public async execute({
    postId,
    text,
    title,
    userId,
    campaignId,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const post = await this.postRepository.findById(postId, user);

    if (!post) {
      throw new ServerError(ErrorMessages.POST_NOTFOUND, 400);
    }

    if (title) {
      post.title = title;
    }

    post.text = text;

    if (campaignId) {
      const campaign = await this.campaignRepository.findById(campaignId);

      if (!campaign) {
        throw new ServerError(ErrorMessages.CAMPAIGN_NOT_FOUND);
      }

      post.campaign = campaign;
    } else {
      if (campaignId === null) {
        post.campaign = null;
      }
    }

    const updated = await this.postRepository.update(post);

    return updated;
  }
}
