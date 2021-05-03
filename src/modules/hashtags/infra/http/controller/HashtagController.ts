import { container } from 'tsyringe';
import { Request, Response } from 'express';

import IController from '@shared/classes/IController';
import {
  CreateHashtagService,
  DeleteHashtagService,
  ListHashtagService,
  UpdateHashtagService,
} from '@modules/hashtags/service';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';

export default class HashtagController implements IController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { skip, take, searchTerm } = request.body;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { _id } = request.user;

    const listHashtag = container.resolve(ListHashtagService);

    const list = await listHashtag.execute({
      searchTerm,
      skip,
      take,
      userId: _id,
    });

    return response.formatedJson(list);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, tagColor, tags } = request.body;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { _id } = request.user;

    const createHashtag = container.resolve(CreateHashtagService);

    const hashtag = await createHashtag.execute({
      name,
      userId: _id,
      tagColor,
      tags,
    });

    return response.formatedJson(hashtag);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, tagColor, tags } = request.body;
    const { hashtagId } = request.params;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { _id } = request.user;

    const updateHashtag = container.resolve(UpdateHashtagService);

    const updatedHashtag = await updateHashtag.execute({
      userId: _id,
      hashtagId,
      tagColor,
      tags,
      name,
    });

    return response.formatedJson(updatedHashtag);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { hashtagId } = request.params;

    const deleteHashtag = container.resolve(DeleteHashtagService);

    await deleteHashtag.execute({ hashtagId });

    return response.formatedJson({});
  }
}
