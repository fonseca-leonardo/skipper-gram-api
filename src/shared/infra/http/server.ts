import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, {
  Express,
  NextFunction,
  Request,
  Response,
  Router,
} from 'express';
import cors from 'cors';
import { container, inject, injectable } from 'tsyringe';

import '@shared/container';

import Database from '../database';
import ICRUDProvider from '@shared/container/providers/CRUDProvider/models/ICRUDProvider';

import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';
import Middlewares from './middlewares';
import AppRoutes from './routes';
import AutoRoutes from './routes/autoRoutes';
import { CelebrateError } from 'celebrate';

@injectable()
export default class Server {
  private database: Database;
  private router: Express;
  private appMiddlewares: Middlewares;
  private appRoutes: AppRoutes;
  private autoRoutes: AutoRoutes;

  constructor(
    @inject('CRUDProvider')
    private CRUDProvider: ICRUDProvider,
  ) {
    this.router = express();

    this.database = new Database();
    this.appMiddlewares = new Middlewares();
    this.appRoutes = new AppRoutes();
    this.autoRoutes = container.resolve(AutoRoutes);
  }

  public async init() {
    await this.database.init();
    this.middlewares();
    this.routes();
    this.errorHandler();
    return this.router;
  }

  private middlewares() {
    this.router.use(cors());

    const { handleResponseMiddleware } = this.appMiddlewares.init();
    this.router.use(handleResponseMiddleware);
  }

  private routes() {
    this.router.use(express.json());

    this.router.use(this.appRoutes.init());
    this.router.use(this.autoRoutes.init());
  }

  private errorHandler() {
    this.router.use(
      (err: Error | any, __: Request, response: Response, _: NextFunction) => {
        if (err instanceof ServerError) {
          return response
            .status(err.statusCode)
            .formatedJson({}, { message: err.message, success: false });
        }

        if (err instanceof CelebrateError) {
          let errorMessage: string | undefined = err.details.get('body')
            ?.message;

          if (!errorMessage) {
            errorMessage = err.details.get('query')?.message;
          }

          return response
            .status(400)
            .formatedJson({}, { message: errorMessage, success: false });
        }

        console.log(err);

        return response
          .status(500)
          .formatedJson(
            {},
            { message: ErrorMessages.SERVER_INTERNAL_ERROR, success: false },
          );
      },
    );
  }
}
