import { inject, injectable } from 'tsyringe';
import { Request, Response, NextFunction, Router } from 'express';

import User from '@modules/template/infra/models/User';
import ICRUDProvider from '@shared/container/providers/CRUDProvider/models/ICRUDProvider';

type IExpressMethod = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<void>;

interface IAutoRouteConfig {
  route?: string;

  middleware?: IExpressMethod;

  disable?: boolean;
}

interface IAutoRoute {
  tablename: string;
  model: any;
  config?: {
    index?: IAutoRouteConfig;
    show?: IAutoRouteConfig;
    create?: IAutoRouteConfig;
    update?: IAutoRouteConfig;
    delete?: IAutoRouteConfig;
  };
}

@injectable()
export default class AutoRoutes {
  private autoRoutes: IAutoRoute[];
  private router: Router;

  constructor(
    @inject('CRUDProvider')
    private CRUDProvider: ICRUDProvider,
  ) {
    this.autoRoutes = [];

    this.router = Router();
  }

  public init(): Router {
    this.autoRoutes.forEach(route => {
      // CREATE ROUTE
      if (!route.config?.create?.disable) {
        if (route.config?.create?.middleware) {
          this.router.post(
            this.chooseRoutePath(route.tablename, route.config.create),
            route.config.create.middleware,
            (request, response) =>
              this.CRUDProvider.store({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        } else {
          this.router.post(
            this.chooseRoutePath(route.tablename, route?.config?.create),
            (request, response) =>
              this.CRUDProvider.store({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        }
      }

      // INDEX ROUTE
      if (!route.config?.index?.disable) {
        if (route.config?.index?.middleware) {
          this.router.get(
            this.chooseRoutePath(`${route.tablename}/:id`, route.config.index),
            route.config.index.middleware,
            (request, response) =>
              this.CRUDProvider.index({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        } else {
          this.router.get(
            this.chooseRoutePath(
              `${route.tablename}/:id`,
              route?.config?.index,
            ),
            (request, response) =>
              this.CRUDProvider.index({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        }
      }

      // SHOW ROUTE
      if (!route.config?.show?.disable) {
        if (route.config?.show?.middleware) {
          this.router.get(
            this.chooseRoutePath(route.tablename, route.config.show),
            route.config.show.middleware,
            (request, response) =>
              this.CRUDProvider.read({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        } else {
          this.router.get(
            this.chooseRoutePath(route.tablename, route?.config?.show),
            (request, response) =>
              this.CRUDProvider.read({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        }
      }

      // DELETE ROUTE
      if (!route.config?.delete?.disable) {
        if (route.config?.delete?.middleware) {
          this.router.delete(
            this.chooseRoutePath(`${route.tablename}/:id`, route.config.delete),
            route.config.delete.middleware,
            (request, response) =>
              this.CRUDProvider.index({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        } else {
          this.router.delete(
            this.chooseRoutePath(
              `${route.tablename}/:id`,
              route?.config?.delete,
            ),
            (request, response) =>
              this.CRUDProvider.read({
                tablename: route.tablename,
                request,
                response,
              }),
          );
        }
      }
    });

    return this.router;
  }

  private chooseRoutePath(
    tablename: string,
    config?: IAutoRouteConfig,
  ): string {
    if (config?.route) {
      return `${config.route}`;
    } else {
      return `/${tablename}`;
    }
  }
}
