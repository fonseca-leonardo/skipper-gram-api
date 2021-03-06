import { Router } from 'express';

import UserRouter from './users.routes';

export default class ModuleRoutes {
  private router: Router;
  private userRouter: UserRouter;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.userRouter = new UserRouter();
  }

  public init() {
    this.router.use('/users', this.userRouter.init());

    return this.router;
  }
}
