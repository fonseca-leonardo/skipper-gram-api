import { inject, injectable } from 'tsyringe';

import IAuthenticationProvider from '@shared/container/providers/AuthenticationProvider/models/IAuthenticationProvider';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';
import { NextFunction, Request, Response } from 'express';

@injectable()
export default class AuthenticationMiddleware {
  constructor(
    @inject('AuthenticationProvider')
    private authProvider: IAuthenticationProvider,
  ) {
    this.authProvider = this.authProvider;
  }

  public async init(request: Request, next: NextFunction): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new ServerError(ErrorMessages.NOT_ALLOWED);
    }

    const [, token] = authorization.split(' ');

    const decoded = this.authProvider.authorize<{ id: string; name: string }>(
      token,
      process.env.TOKEN_SECRET || '',
    );

    return next();
  }
}
