import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ErrorMessages from '@constants/ErrorMessages';
import IController from '@shared/classes/IController';
import ServerError from '@shared/errors/ServerError';
import {
  CreateCampaignService,
  DeleteCampaignService,
  ListCampaignService,
  UpdateCampaignService,
} from '@modules/campaign/service';

export default class CampaignController implements IController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { skip, take, searchTerm } = request.body;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { _id } = request.user;

    const listCampaign = container.resolve(ListCampaignService);

    const list = await listCampaign.execute({
      searchTerm,
      skip,
      take,
      userId: _id,
    });

    return response.formatedJson(list);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { title, tagColor } = request.body;

    if (!request.user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND);
    }

    const { _id } = request.user;

    const createCampaign = container.resolve(CreateCampaignService);

    const campaign = await createCampaign.execute({
      title,
      tagColor,
      userId: _id,
    });

    return response.formatedJson(campaign);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, tagColor } = request.body;
    const { campaignId } = request.params;

    const updatedCampaign = container.resolve(UpdateCampaignService);

    const campaign = await updatedCampaign.execute({
      title,
      tagColor,
      campaignId,
    });

    return response.formatedJson(campaign);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { campaignId } = request.params;

    const deleteCampaign = container.resolve(DeleteCampaignService);

    await deleteCampaign.execute({ campaignId });

    return response.formatedJson({});
  }
}
