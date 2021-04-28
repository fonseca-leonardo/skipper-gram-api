import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IController from '@shared/classes/IController';
import {
  RecoverPasswordService,
  ChangePasswordService,
} from '@modules/users/services';

export default class RecoverPasswordController implements IController {
  public async store(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const registerUser = container.resolve(RecoverPasswordService);

    await registerUser.execute({ email });

    return response.formatedJson(
      {},
      {
        message: `Enviamos um e-mail para ${email} com o passo a passo para trocar sua senha.`,
        success: true,
      },
    );
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { newPassword, token } = request.body;

    const changePassword = container.resolve(ChangePasswordService);

    await changePassword.execute({ newPassword, recoverId: token });

    return response.formatedJson(
      {},
      {
        message: `Senha troca com sucesso.`,
        success: true,
      },
    );
  }
}
