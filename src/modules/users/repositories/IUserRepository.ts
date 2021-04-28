import { ICreateUserDTO } from '../dtos';

import User from '../infra/models/User';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;

  findById(_id: string): Promise<User | undefined | null>;

  findByEmail(email: string): Promise<User | undefined | null>;

  update(user: User): Promise<User>;
}
