import { Router } from 'express';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';
import AuthenticationMiddleware from '@shared/infra/http/middlewares/authentication';
import { HashtagController } from '../controller';

export default class HashtagRouter {
  private router: Router;

  private authenticationMiddleware: AuthenticationMiddleware;

  private hashtagController: HashtagController;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.authenticationMiddleware = container.resolve(AuthenticationMiddleware);
    this.hashtagController = new HashtagController();
  }

  public init() {
    this.router.post(
      '',
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          tags: Joi.array().items(Joi.string()).min(0),
          tagColor: Joi.string()
            .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
            .required(),
        },
      }),
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.hashtagController.store,
    );

    this.router.patch(
      '/:hashtagId',
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().allow(null, '').optional(),
          tags: Joi.array().items(Joi.string()).min(0),
          tagColor: Joi.string()
            .allow(null, '')
            .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/)
            .optional(),
        },
      }),
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.hashtagController.update,
    );

    this.router.delete(
      '/:hashtagId',
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.hashtagController.delete,
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
      this.hashtagController.show,
    );

    return this.router;
  }
}
