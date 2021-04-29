import ErrorMessages from '@constants/ErrorMessages';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import IPostRepository from '../repositories/IPostRepository';

interface IRequest {
  postId: string;

  text?: string;

  title?: string;

  campaignId?: string;
}

interface IResponse {}

@injectable()
export default class UpdatePostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    postId,
    text,
    title,
    campaignId,
  }: IRequest): Promise<IResponse> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new ServerError(ErrorMessages.POST_NOTFOUND, 400);
    }

    if (title) {
      post.title = title;
    }

    post.text = text;

    if (campaignId) {
      // TO DO: Update Campaign
    }

    const updated = await this.postRepository.update(post);

    return updated;
  }
}
