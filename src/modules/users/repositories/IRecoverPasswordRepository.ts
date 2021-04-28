import RecoverPassword from '../infra/models/RecoverPassword';
import User from '../infra/models/User';

export default interface IRecoverPasswordRepository {
  create(user: User): Promise<RecoverPassword>;

  findValid(recoverId: string): Promise<RecoverPassword | undefined | null>;

  markAsUsed(recoverId: string): Promise<void>;
}
