import IUserRepository from '@modules/template/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../../models/User';
import UserTypeorm from '../entities/User';

export default class UserRepository implements IUserRepository {
  private userRepository: Repository<UserTypeorm>;

  constructor() {
    this.userRepository = getRepository(UserTypeorm);
  }
  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();

    return users;
  }
}
