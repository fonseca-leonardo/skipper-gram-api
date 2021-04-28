import { inject, injectable } from 'tsyringe';

import ErrorMessages from '@constants/ErrorMessages';
import ServerError from '@shared/errors/ServerError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';

import { IRecoverPasswordRepository, IUserRepository } from '../repositories';

interface IRequest {
  recoverId: string;

  newPassword: string;
}

@injectable()
export default class ChangePasswordService {
  constructor(
    @inject('RecoverPasswordRepository')
    private recoverPasswordRepository: IRecoverPasswordRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ recoverId, newPassword }: IRequest) {
    const recoverPassword = await this.recoverPasswordRepository.findValid(
      recoverId,
    );

    if (!recoverPassword) {
      throw new ServerError(ErrorMessages.INVALID_RECOVER_PASSWORD_TOKEN, 400);
    }

    const { user } = recoverPassword;

    user.password = await this.hashProvider.generateHash(newPassword);

    await this.userRepository.update(user);

    await this.recoverPasswordRepository.markAsUsed(recoverId);
  }
}
