import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';
import Campaign from '@modules/campaign/infra/models/Campaign';

import IPostRepository from '../repositories/IPostRepository';
import Post from '../infra/models/Post';

interface IRequest {
  skip?: number;

  searchTerm: string;

  take?: number;

  userId: string;
}

interface IResponse {
  postList: Post[];
  count: number;
}

@injectable()
export default class ListPostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    skip,
    take,
    searchTerm,
    userId,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { list, count } = await this.postRepository.list({
      searchTerm,
      user,
      skip: skip || 0,
      take: take || 10,
    });

    return { postList: list, count };
  }
}
