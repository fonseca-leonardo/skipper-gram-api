import { container } from 'tsyringe';
import { Request, Response } from 'express';

import IController from '@shared/classes/IController';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';

import {
  CreatePostService,
  ListPostService,
  PostDetailService,
  UpdatePostService,
} from '../../../service';

export default class PostController implements IController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { postId } = request.params;

    const postDetail = container.resolve(PostDetailService);

    const post = await postDetail.execute({ postId });

    return response.formatedJson(post);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { title, text, campaignId } = request.body;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, 401);
    }

    const { _id } = request.user;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      title,
      text,
      userId: _id,
      campaignId,
    });

    return response.formatedJson(post);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { skip, take, searchTerm } = request.body;

    const listPost = container.resolve(ListPostService);

    const post = await listPost.execute({
      skip,
      take,
      searchTerm,
    });

    return response.formatedJson(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, text, campaignId } = request.body;
    const { postId } = request.params;

    const listPost = container.resolve(UpdatePostService);

    const post = await listPost.execute({
      title,
      text,
      campaignId,
      postId,
    });

    return response.formatedJson(post);
  }
}
