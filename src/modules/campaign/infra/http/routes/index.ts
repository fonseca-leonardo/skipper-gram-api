import { Router } from 'express';

import CampaignRouter from './campaign.routes';

export default class ModuleRoutes {
  private router: Router;
  private campaignRouter: CampaignRouter;

  constructor() {
    this.router = Router({ mergeParams: true });
    this.campaignRouter = new CampaignRouter();
  }

  public init() {
    this.router.use('/campaign', this.campaignRouter.init());

    return this.router;
  }
}
