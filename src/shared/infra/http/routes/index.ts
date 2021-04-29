import { Router } from 'express';
import UserModule from '@modules/users/infra/http/routes';
import PostModule from '@modules/posts/infra/http/routes';

export default class AppRoutes {
  private router: Router;
  private userModuleRouter: UserModule;
  private postModuleRouter: PostModule;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.userModuleRouter = new UserModule();
    this.postModuleRouter = new PostModule();
  }

  public init() {
    this.router.use(this.userModuleRouter.init());
    this.router.use(this.postModuleRouter.init());

    return this.router;
  }
}
