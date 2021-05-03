import ErrorMessages from '@constants/ErrorMessages';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import IHashtagRepository from '../repositories/IHashtagRepository';

interface IRequest {
  hashtagId: string;
}

@injectable()
export default class DeleteHashtagService {
  constructor(
    @inject('HashtagRepository')
    private hashtagRepository: IHashtagRepository,
  ) {}

  public async execute({ hashtagId }: IRequest) {
    const hashtag = await this.hashtagRepository.findById(hashtagId);

    if (!hashtag) {
      throw new ServerError(ErrorMessages.HASHTAG_NOT_FOUND);
    }

    await this.hashtagRepository.delete(hashtag);
  }
}
