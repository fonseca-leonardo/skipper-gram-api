import ICreatePostDTO from '../dtos/ICreatePostDTO';
import IFilterPostDTO from '../dtos/IFilterPostDTO';
import Post from '../infra/models/Post';

export default interface IPostRepository {
  findById(_id: string): Promise<Post | null | undefined>;

  create(data: ICreatePostDTO): Promise<Post>;

  list(options: IFilterPostDTO): Promise<Post[]>;

  delete(post: Post): Promise<void>;

  update(post: Post): Promise<Post>;
}
