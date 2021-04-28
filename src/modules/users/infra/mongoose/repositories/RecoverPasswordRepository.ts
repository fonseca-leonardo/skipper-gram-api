import { IRecoverPasswordRepository } from '@modules/users/repositories';
import RecoverPassword from '../../models/RecoverPassword';
import User from '../../models/User';

import MongooseRecoverPassword from '../entities/RecoverPassword';

export default class RecoverPasswordRepository
  implements IRecoverPasswordRepository {
  public async create(user: User): Promise<RecoverPassword> {
    const recoverPassword = new MongooseRecoverPassword({ user });

    await recoverPassword.save();

    return recoverPassword;
  }

  public async findValid(
    recoverId: string,
  ): Promise<RecoverPassword | null | undefined> {
    return MongooseRecoverPassword.findOne({
      _id: recoverId,
      isUsed: false,
    }).populate('user');
  }

  public async markAsUsed(recoverId: string): Promise<void> {
    await MongooseRecoverPassword.updateOne(
      { _id: recoverId },
      { isUsed: true },
    );
  }
}
