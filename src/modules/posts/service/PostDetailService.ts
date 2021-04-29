import ErrorMessages from '@constants/ErrorMessages';
import Campaign from '@modules/campaign/infra/models/Campaign';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import IPostRepository from '../repositories/IPostRepository';

interface IRequest {
  postId: string;
}

interface IResponse {
  _id: string;
  title: string;
  text?: string;
  campaign?: Campaign;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export default class PostDetailService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ postId }: IRequest): Promise<IResponse> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new ServerError(ErrorMessages.POST_NOTFOUND);
    }

    const { _id, title, text, campaign, createdAt, updatedAt } = post;

    return { _id, title, text, campaign, createdAt, updatedAt };
  }
}
