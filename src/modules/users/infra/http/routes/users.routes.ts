import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthenticationMiddleware from '@shared/infra/http/middlewares/authentication';

import {
  UserController,
  RecoverPasswordController,
  SessionController,
} from '../controller';
import { container } from 'tsyringe';

export default class TemplateRouter {
  private router: Router;

  private authenticationMiddleware: AuthenticationMiddleware;

  private userController: UserController;
  private recoverPasswordController: RecoverPasswordController;
  private sessionController: SessionController;

  constructor() {
    this.router = Router({ mergeParams: true });

    this.authenticationMiddleware = container.resolve(AuthenticationMiddleware);

    this.userController = new UserController();
    this.recoverPasswordController = new RecoverPasswordController();
    this.sessionController = new SessionController();
  }

  public init() {
    this.router.post(
      '/signUp',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          name: Joi.string().required(),
        },
      }),
      this.userController.show,
    );

    this.router.post(
      '/recoverPassword',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
        },
      }),
      this.recoverPasswordController.store,
    );

    this.router.patch(
      '/recoverPassword',
      celebrate({
        [Segments.BODY]: {
          newPassword: Joi.string().required(),
          token: Joi.string().required(),
        },
      }),
      this.recoverPasswordController.update,
    );

    this.router.post(
      '/signin',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        },
      }),
      this.sessionController.store,
    );

    this.router.get(
      '/authorize',
      (req, res, next) => this.authenticationMiddleware.init(req, res, next),
      this.sessionController.index,
    );

    return this.router;
  }
}
