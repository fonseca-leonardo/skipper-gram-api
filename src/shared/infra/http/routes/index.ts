import { Router } from 'express';
import UserModule from '@modules/users/infra/http/routes';
import PostModule from '@modules/posts/infra/http/routes';
import CampaignModule from '@modules/campaign/infra/http/routes';
import HashtagModule from '@modules/hashtags/infra/http/routes';

export default class AppRoutes {
  private router: Router;
  private userModuleRouter: UserModule;
  private postModuleRouter: PostModule;
  private campaignModule: CampaignModule;
  private hashtagModule: HashtagModule;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.userModuleRouter = new UserModule();
    this.postModuleRouter = new PostModule();
    this.campaignModule = new CampaignModule();
    this.hashtagModule = new HashtagModule();
  }

  public init() {
    this.router.use(this.userModuleRouter.init());
    this.router.use(this.postModuleRouter.init());
    this.router.use(this.campaignModule.init());
    this.router.use(this.hashtagModule.init());

    return this.router;
  }
}
