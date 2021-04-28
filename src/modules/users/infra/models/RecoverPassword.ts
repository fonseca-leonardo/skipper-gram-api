import User from './User';

export default interface RecoverPassword {
  _id: string;

  isUsed: boolean;

  createdAt: Date;

  updatedAt: Date;

  user: User;
}
