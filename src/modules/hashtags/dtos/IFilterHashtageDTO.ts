import User from '@modules/users/infra/models/User';

export default interface IFilterHashtageDTO {
  skip: number;

  take: number;

  user: User;

  searchTerm: string;
}
