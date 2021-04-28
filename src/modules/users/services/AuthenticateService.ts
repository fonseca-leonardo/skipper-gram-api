import ErrorMessages from '@constants/ErrorMessages';
import ServerError from '@shared/errors/ServerError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repositories';

interface IRequest {
  id: string;
}

interface IResponse {
  id: string;

  name: string;

  email: string;
}

@injectable()
export default class AuthenticateService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ServerError(ErrorMessages.USER_NOT_FOUND, 400);
    }

    const { _id, name, email } = user;

    return {
      id: _id,
      name,
      email,
    };
  }
}
