import { container } from 'tsyringe';
import { Request, Response } from 'express';

import IController from '@shared/classes/IController';
import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';
import { AuthenticateService, LoginService } from '@modules/users/services';

export default class SessionController implements IController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const login = container.resolve(LoginService);

    const { token, name } = await login.execute({ email, password });

    return response.formatedJson({}, { token, message: `Bem vindo, ${name}` });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    if (!request.user) {
      throw new ServerError(ErrorMessages.NOT_ALLOWED, 401);
    }

    const { _id } = request.user;

    const authenticate = container.resolve(AuthenticateService);

    const { id, name, email } = await authenticate.execute({ id: _id });

    return response.formatedJson({ _id: id, name, email });
  }
}
