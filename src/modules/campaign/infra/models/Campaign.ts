import User from '@modules/users/infra/models/User';

export default interface Campaign {
  _id: string;

  title: string;

  tagColor: string;

  user: User;

  createdAt: Date;

  updatedAt: Date;
}
