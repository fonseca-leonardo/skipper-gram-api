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
}

interface IResponse {
  postList: Post[];
}

@injectable()
export default class ListPostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    skip,
    take,
    searchTerm,
  }: IRequest): Promise<IResponse> {
    const post = await this.postRepository.list({
      searchTerm,
      skip: skip || 0,
      take: take || 10,
    });

    return { postList: post };
  }
}
