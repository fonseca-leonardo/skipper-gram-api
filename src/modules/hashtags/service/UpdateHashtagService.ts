import ErrorMessages from '@constants/ErrorMessages';
import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import IHashtagRepository from '../repositories/IHashtagRepository';

interface IRequest {
  userId: string;

  hashtagId: string;

  tags?: string[];

  tagColor?: string;

  name?: string;
}

interface IResponse {
  name: string;

  tags: string[];

  tagColor: string;

  updatedAt: Date;

  createdAt: Date;
}

@injectable()
export default class UpdateHashtagService {
  constructor(
    @inject('HashtagRepository')
    private hashtagRepository: IHashtagRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    hashtagId,
    userId,
    tags,
    tagColor,
    name,
  }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const hashtag = await this.hashtagRepository.findById(hashtagId);

    if (!hashtag) {
      throw new ServerError(ErrorMessages.HASHTAG_NOT_FOUND);
    }

    if (tags) {
      hashtag.tags = tags;
    }

    if (tagColor) {
      hashtag.tagColor = tagColor;
    }

    if (name) {
      hashtag.name = name;
    }

    const updatedHashtag = await this.hashtagRepository.update(hashtag);

    return {
      name: updatedHashtag.name,
      tags: updatedHashtag.tags,
      createdAt: updatedHashtag.createdAt,
      updatedAt: updatedHashtag.updatedAt,
      tagColor: updatedHashtag.tagColor,
    };
  }
}
