import { container } from 'tsyringe';

import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import MongooseUserRepository from '@modules/users/infra/mongoose/repositories/UserRepository';

import IRecoverPasswordRepository from '@modules/users/repositories/IRecoverPasswordRepository';
import MongooseRecoverPasswordRepository from '@modules/users/infra/mongoose/repositories/RecoverPasswordRepository';

import IPostRepository from '@modules/posts/repositories/IPostRepository';
import PostRepository from '@modules/posts/infra/mongoose/repositories/PostRepository';

import ICampaignRepository from '@modules/campaign/repositories/ICampaignRepository';
import MongooseCampaignRepository from '@modules/campaign/infra/mongoose/repositories/CampaignRepository';

import IHashtagRepository from '@modules/hashtags/repositories/IHashtagRepository';
import MongooseHashtagRepository from '@modules/hashtags/infra/mongoose/repositories/HashtagRepository';

container.registerSingleton<IHashtagRepository>(
  'HashtagRepository',
  MongooseHashtagRepository,
);

container.registerSingleton<ICampaignRepository>(
  'CampaignRepository',
  MongooseCampaignRepository,
);

container.registerSingleton<IPostRepository>('PostRepository', PostRepository);

container.registerSingleton<IRecoverPasswordRepository>(
  'RecoverPasswordRepository',
  MongooseRecoverPasswordRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  MongooseUserRepository,
);
