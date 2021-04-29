import { ICreatePostDTO, IFilterPostDTO } from '@modules/posts/dtos';
import IPostRepository from '@modules/posts/repositories/IPostRepository';
import Post from '../../models/Post';
import MongoosePost from '../entities/Post';

export default class PostRepository implements IPostRepository {
  public async findById(_id: string) {
    return MongoosePost.findOne({ _id }).exec();
  }

  public async create(data: ICreatePostDTO): Promise<Post> {
    const post = new MongoosePost(data);

    await post.save();

    return post;
  }

  public async list({
    searchTerm,
    skip,
    take,
  }: IFilterPostDTO): Promise<Post[]> {
    const posts = await MongoosePost.find({
      $or: [
        { title: { $regex: `.*${searchTerm}.*`, $options: 'i' } },
        { 'campaign.name': { $regex: `.*${searchTerm}.*`, $options: 'i' } },
      ],
    })
      .skip(skip)
      .limit(take)
      .populate('campaign')
      .exec();

    return posts;
  }

  public async delete(post: Post): Promise<void> {
    await MongoosePost.deleteOne({ _id: post._id }).exec();
  }

  public async update(post: Post): Promise<Post> {
    await MongoosePost.updateOne({ _id: post._id }, post).exec();

    return post;
  }
}
