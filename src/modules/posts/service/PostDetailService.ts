import ErrorMessages from '@constants/ErrorMessages';
import Campaign from '@modules/campaign/infra/models/Campaign';
import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import IPostRepository from '../repositories/IPostRepository';

interface IRequest {
  postId: string;

  userId: string;
}

interface IResponse {
  _id: string;
  title: string;
  text?: string;
  campaign?: Campaign | null;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export default class PostDetailService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ postId, userId }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const post = await this.postRepository.findById(postId, user);

    if (!post) {
      throw new ServerError(ErrorMessages.POST_NOTFOUND);
    }

    const { _id, title, text, campaign, createdAt, updatedAt } = post;

    return { _id, title, text, campaign, createdAt, updatedAt };
  }
}
