import { Router } from 'express';
import AuthenticationMiddleware from '@shared/infra/http/middlewares/authentication';
import PostController from '../controller/PostController';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';

export default class PostRouter {
  private router: Router;

  private authenticationMiddleware: AuthenticationMiddleware;

  private postController: PostController;

  constructor() {
    this.router = Router({ mergeParams: true });

    this.authenticationMiddleware = container.resolve(AuthenticationMiddleware);

    this.postController = new PostController();
  }

  public init() {
    this.router.post(
      '/',
      celebrate({
        [Segments.BODY]: {
          title: Joi.string().required(),
          text: Joi.string().optional(),
          campaignId: Joi.string().optional(),
        },
      }),
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.postController.store,
    );

    this.router.get(
      '/:postId',
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.postController.index,
    );

    this.router.patch(
      '/:postId',
      celebrate({
        [Segments.BODY]: {
          title: Joi.string().optional(),
          text: Joi.string().optional(),
          campaignId: Joi.string().optional(),
        },
      }),
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.postController.update,
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
      this.postController.show,
    );

    return this.router;
  }
}
