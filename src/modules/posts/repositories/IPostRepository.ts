import User from '@modules/users/infra/models/User';
import ICreatePostDTO from '../dtos/ICreatePostDTO';
import IFilterPostDTO from '../dtos/IFilterPostDTO';
import Post from '../infra/models/Post';

export default interface IPostRepository {
  findById(_id: string, user: User): Promise<Post | null | undefined>;

  create(data: ICreatePostDTO): Promise<Post>;

  list(options: IFilterPostDTO): Promise<{ list: Post[]; count: number }>;

  delete(post: Post): Promise<void>;

  update(post: Post): Promise<Post>;
}
