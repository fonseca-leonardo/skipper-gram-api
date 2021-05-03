import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';
import Campaign from '@modules/campaign/infra/models/Campaign';

import IPostRepository from '../repositories/IPostRepository';

interface IRequest {
  userId: string;

  title: string;

  text?: string;

  campaignId?: string;
}

interface IResponse {
  title: string;
  _id: string;
  text?: string;
  campaign?: Campaign | null;
  updatedAt: Date;
}

@injectable()
export default class CreatePostService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    userId,
    title,
    text,
    campaignId,
  }: IRequest): Promise<IResponse> {
    let campaign: Campaign | undefined;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, 400);
    }

    const post = await this.postRepository.create({
      text,
      user,
      title,
      campaign,
    });

    return {
      _id: post._id,
      title: post.title,
      text: post.text,
      updatedAt: post.updatedAt,
      campaign: post.campaign,
    };
  }
}
