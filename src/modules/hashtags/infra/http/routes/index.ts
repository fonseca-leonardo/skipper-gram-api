import { Router } from 'express';

import HashtagRouter from './hashtags.routes';

export default class ModuleRoutes {
  private router: Router;
  private hashtagRouter: HashtagRouter;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.hashtagRouter = new HashtagRouter();
  }

  public init() {
    this.router.use('/hashtags', this.hashtagRouter.init());

    return this.router;
  }
}
