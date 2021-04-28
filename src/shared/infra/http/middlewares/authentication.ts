import { inject, injectable } from 'tsyringe';
import { NextFunction, Request, Response } from 'express';

import IAuthenticationProvider from '@shared/container/providers/AuthenticationProvider/models/IAuthenticationProvider';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';

@injectable()
export default class AuthenticationMiddleware {
  constructor(
    @inject('AuthenticationProvider')
    private authProvider: IAuthenticationProvider,
  ) {}

  public async init(
    request: Request,
    _: Response,
    next: NextFunction,
  ): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new ServerError(ErrorMessages.NOT_ALLOWED);
    }

    const [, token] = authorization.split(' ');

    const decoded = this.authProvider.authorize<SkipperAPI.IUserTokenData>(
      token,
      process.env.TOKEN_SECRET || '',
    );

    if (!decoded) {
      throw new ServerError(ErrorMessages.NOT_ALLOWED);
    }

    const { data } = decoded;

    request.user = data;

    return next();
  }
}
