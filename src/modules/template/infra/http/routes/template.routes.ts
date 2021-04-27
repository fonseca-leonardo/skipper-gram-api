import { Router } from 'express';
import { TemplateController } from '../controller';

export default class TemplateRouter {
  private router: Router;
  private templateController: TemplateController;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.templateController = new TemplateController();
  }

  public init() {
    this.router.get('/', this.templateController.show);

    return this.router;
  }
}
