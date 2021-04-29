import { Router } from 'express';

import PostRouter from './posts.routes';

export default class ModuleRoutes {
  private router: Router;
  private postRouter: PostRouter;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.postRouter = new PostRouter();
  }

  public init() {
    this.router.use('/posts', this.postRouter.init());

    return this.router;
  }
}
