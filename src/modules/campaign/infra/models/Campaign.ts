import User from '@modules/users/infra/models/User';

export default interface Campaign {
  _id: string;

  title: string;

  createdAt: Date;

  updatedAt: Date;

  user: User;
}
