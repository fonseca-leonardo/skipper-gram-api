import { Router } from 'express';

import TemplateRouter from './template.routes';

export default class ModuleRoutes {
  private router: Router;
  private templateRouter: TemplateRouter;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.templateRouter = new TemplateRouter();
  }

  public init() {
    this.router.use('/template', this.templateRouter.init());

    return this.router;
  }
}
