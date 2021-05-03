import ErrorMessages from '@constants/ErrorMessages';
import { IUserRepository } from '@modules/users/repositories';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import IPostRepository from '../repositories/IPostRepository';

interface IRequest {
  postId: string;

  userId: string;
}

type IResponse = void;

@injectable()
export default class DeletePostService {
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

    await this.postRepository.delete(post);
  }
}
