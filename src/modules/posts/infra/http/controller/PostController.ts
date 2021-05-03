import { container } from 'tsyringe';
import { Request, Response } from 'express';

import IController from '@shared/classes/IController';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';

import {
  CreatePostService,
  DeletePostService,
  ListPostService,
  PostDetailService,
  UpdatePostService,
} from '../../../service';

export default class PostController implements IController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { postId } = request.params;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, 401);
    }

    const { _id } = request.user;

    const postDetail = container.resolve(PostDetailService);

    const post = await postDetail.execute({ postId, userId: _id });

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

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, 401);
    }

    const { _id } = request.user;

    const listPost = container.resolve(ListPostService);

    const post = await listPost.execute({
      skip,
      take,
      userId: _id,
      searchTerm,
    });

    return response.formatedJson(post);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, text, campaignId } = request.body;
    const { postId } = request.params;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, 401);
    }

    const { _id } = request.user;

    const listPost = container.resolve(UpdatePostService);

    const post = await listPost.execute({
      title,
      text,
      campaignId,
      userId: _id,
      postId,
    });

    return response.formatedJson(post);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { postId } = request.params;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, 401);
    }

    const { _id } = request.user;

    const deletePost = container.resolve(DeletePostService);

    await deletePost.execute({
      postId,
      userId: _id,
    });

    return response.formatedJson({});
  }
}
