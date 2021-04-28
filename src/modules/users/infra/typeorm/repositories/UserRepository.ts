import { ICreateUserDTO } from '@modules/users/dtos';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../../models/User';
import UserTypeorm from '../entities/User';

export default class UserRepository implements IUserRepository {
  private userRepository: Repository<UserTypeorm>;

  constructor() {
    this.userRepository = getRepository(UserTypeorm);
  }
  public async create(data: ICreateUserDTO): Promise<User> {
    const users = this.userRepository.create(data);

    await this.userRepository.save(users);

    return users;
  }
}
