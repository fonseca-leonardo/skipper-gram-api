import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import { IRecoverPasswordRepository, IUserRepository } from '../repositories';

interface IRequest {
  email: string;
}

@injectable()
export default class RecoverPasswordService {
  constructor(
    @inject('RecoverPasswordRepository')
    private recoverPasswordRepository: IRecoverPasswordRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      return {};
    }

    const recover = await this.recoverPasswordRepository.create(user);

    const forgotPasswordView = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      templateData: {
        file: forgotPasswordView,
        variables: {
          name: user.name,
          link: `${process.env.FRONT_URL}/recuperar/${recover._id}`,
        },
      },
      subject: 'Troque sua senha',
    });

    return {};
  }
}
