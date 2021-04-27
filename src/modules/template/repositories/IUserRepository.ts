import User from '../infra/models/User';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
}
