import User from '@modules/users/infra/models/User';
import Campaign from '@modules/campaign/infra/models/Campaign';

export default interface Post {
  _id: string;

  title: string;

  text?: string;

  createdAt: Date;

  updatedAt: Date;

  campaign?: Campaign | null;

  user: User;
}
