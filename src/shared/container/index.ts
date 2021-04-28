import { container } from 'tsyringe';

import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import MongooseUserRepository from '@modules/users/infra/mongoose/repositories/UserRepository';
import IRecoverPasswordRepository from '@modules/users/repositories/IRecoverPasswordRepository';
import MongooseRecoverPasswordRepository from '@modules/users/infra/mongoose/repositories/RecoverPasswordRepository';

container.registerSingleton<IRecoverPasswordRepository>(
  'RecoverPasswordRepository',
  MongooseRecoverPasswordRepository,
);

container.registerSingleton<IUserRepository>(
  'UserRepository',
  MongooseUserRepository,
);
