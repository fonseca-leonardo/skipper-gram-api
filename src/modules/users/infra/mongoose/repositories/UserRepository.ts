import { ICreateUserDTO } from '@modules/users/dtos';
import { IUserRepository } from '@modules/users/repositories';
import User from '../../models/User';
import UserModel from '../entities/User';

export default class UserRepository implements IUserRepository {
  public async create({
    password,
    email,
    name,
  }: ICreateUserDTO): Promise<User> {
    const user = new UserModel({ name, password, email });

    await user.save();

    return user;
  }

  public async findById(_id: string): Promise<User | null | undefined> {
    return UserModel.findById(_id).exec();
  }

  public async findByEmail(email: string): Promise<User | null | undefined> {
    const user = await UserModel.findOne({ email }).exec();

    return user;
  }

  public async update(user: User): Promise<User> {
    const { password, email, name } = user;

    await UserModel.updateOne(
      { _id: user._id },
      { password, email, name },
    ).exec();

    return user;
  }
}
