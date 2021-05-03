import ErrorMessages from '@constants/ErrorMessages';
import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import IHashtagRepository from '../repositories/IHashtagRepository';

interface IRequest {
  userId: string;

  name: string;

  tags: string[];

  tagColor: string;
}

interface IResponse {
  name: string;

  tags: string[];

  tagColor: string;

  updatedAt: Date;

  createdAt: Date;
}

@injectable()
export default class CreateHashtagService {
  constructor(
    @inject('HashtagRepository')
    private hashtagRepository: IHashtagRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    tags,
    tagColor,
    userId,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const hashtag = await this.hashtagRepository.create({
      tags,
      name,
      user,
      tagColor,
    });

    return {
      name: hashtag.name,
      tags: hashtag.tags,
      createdAt: hashtag.createdAt,
      updatedAt: hashtag.updatedAt,
      tagColor: hashtag.tagColor,
    };
  }
}
