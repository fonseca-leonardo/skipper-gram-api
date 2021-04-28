import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RegisterUserService } from '@modules/users/services';
import IController from '@shared/classes/IController';

export default class UserController implements IController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { email, password, name } = request.body;

    const registerUser = container.resolve(RegisterUserService);

    const user = await registerUser.execute({ email, password, name });

    return response.formatedJson(user);
  }
}
