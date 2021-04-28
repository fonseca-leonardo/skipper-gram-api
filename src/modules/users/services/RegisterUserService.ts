import { inject, injectable } from 'tsyringe';
import { resolve } from 'path';

import ServerError from '@shared/errors/ServerError';
import ErrorMessages from '@constants/ErrorMessages';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import { IUserRepository } from '../repositories';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

interface IRequest {
  email: string;

  password: string;

  name: string;
}

@injectable()
export default class RegisterUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email, password, name }: IRequest) {
    const userAlreadyRegistered = await this.userRepository.findByEmail(email);

    if (userAlreadyRegistered) {
      throw new ServerError(ErrorMessages.USER_ALREADY_REGISTERED);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    const welcomeView = resolve(__dirname, '..', 'views', 'welcome.hbs');

    await this.mailProvider.sendMail({
      to: {
        email: user.email,
        name: user.name,
      },
      templateData: {
        file: welcomeView,
        variables: {
          name: user.name,
        },
      },
      subject: 'Bem vindo ao Skipper Gram',
    });

    return user;
  }
}
