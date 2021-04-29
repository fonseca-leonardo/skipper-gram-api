import Campaign from '@modules/campaign/infra/models/Campaign';
import User from '@modules/users/infra/models/User';

export default interface ICreatePostDTO {
  title: string;

  text?: string;

  campaign?: Campaign;

  user: User;
}
