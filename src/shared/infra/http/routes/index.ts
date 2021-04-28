import { Router } from 'express';
import UserModule from '@modules/users/infra/http/routes';

export default class AppRoutes {
  private router: Router;
  private userModuleRouter: UserModule;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.userModuleRouter = new UserModule();
  }

  public init() {
    this.router.use(this.userModuleRouter.init());

    return this.router;
  }
}
