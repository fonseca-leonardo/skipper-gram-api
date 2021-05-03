import User from '@modules/users/infra/models/User';

export default interface ICreateCampaignDTO {
  title: string;

  tagColor: string;

  user: User;
}
