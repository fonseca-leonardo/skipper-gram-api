import { inject, injectable } from 'tsyringe';

import ErrorMessages from '@constants/ErrorMessages';

import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IAuthenticationProvider from '@shared/container/providers/AuthenticationProvider/models/IAuthenticationProvider';
import ServerError from '@shared/errors/ServerError';

import { IUserRepository } from '../repositories';

interface IRequest {
  email: string;

  password: string;
}

@injectable()
export default class LoginSerive {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('AuthenticationProvider')
    private authenticationProvider: IAuthenticationProvider,
  ) {}

  public async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ServerError(ErrorMessages.INVALID_USER_CREDENTIALS, 400);
    }

    const validPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!validPassword) {
      throw new ServerError(ErrorMessages.INVALID_USER_CREDENTIALS, 400);
    }

    const token = this.authenticationProvider.sign<SkipperAPI.IUserTokenData>(
      {
        data: {
          _id: user._id,
        },
      },
      process.env.TOKEN_SECRET || 'secret-test',
      { expireIn: '8h' },
    );

    return { token, name: user.name };
  }
}
