import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthenticationMiddleware from '@shared/infra/http/middlewares/authentication';

import CampaignController from '../controller/CampaignController';

import { container } from 'tsyringe';

export default class UserRouter {
  private router: Router;

  private authenticationMiddleware: AuthenticationMiddleware;
  private campaignController: CampaignController;

  constructor() {
    this.router = Router({ mergeParams: true });

    this.authenticationMiddleware = container.resolve(AuthenticationMiddleware);

    this.campaignController = new CampaignController();
  }

  public init() {
    this.router.post(
      '/',
      celebrate({
        [Segments.BODY]: {
          title: Joi.string().required(),
          tagColor: Joi.string()
            .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
            .required(),
        },
      }),
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.campaignController.store,
    );

    this.router.patch(
      '/:campaignId',
      celebrate({
        [Segments.BODY]: {
          title: Joi.string().optional(),
          tagColor: Joi.string()
            .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
            .optional(),
        },
      }),
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.campaignController.update,
    );

    this.router.delete(
      '/:campaignId',
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.campaignController.delete,
    );

    this.router.post(
      '/list',
      celebrate({
        [Segments.BODY]: {
          skip: Joi.number().optional(),
          take: Joi.number().optional(),
          searchTerm: Joi.string().allow(null, '').required(),
        },
      }),
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.campaignController.show,
    );

    return this.router;
  }
}
