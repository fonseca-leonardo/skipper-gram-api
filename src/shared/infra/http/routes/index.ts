import { Router } from 'express';

import TemplateModule from '@modules/template/infra/http/routes';

export default class AppRoutes {
  private router: Router;
  private templateModuleRouter: TemplateModule;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.templateModuleRouter = new TemplateModule();
  }

  public init() {
    this.router.use(this.templateModuleRouter.init());

    return this.router;
  }
}
