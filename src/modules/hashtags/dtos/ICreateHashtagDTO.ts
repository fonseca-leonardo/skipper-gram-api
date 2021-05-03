import User from '@modules/users/infra/models/User';

export default interface ICreateHashtagDTO {
  name: string;

  tags: string[];

  tagColor: string;

  user: User;
}
