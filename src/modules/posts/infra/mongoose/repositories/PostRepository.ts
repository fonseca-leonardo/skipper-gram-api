import { ICreatePostDTO, IFilterPostDTO } from '@modules/posts/dtos';
import IPostRepository from '@modules/posts/repositories/IPostRepository';
import User from '@modules/users/infra/models/User';
import Post from '../../models/Post';
import MongoosePost from '../entities/Post';

export default class PostRepository implements IPostRepository {
  public async findById(_id: string, user: User) {
    return MongoosePost.findOne({ _id, user }).populate('campaign').exec();
  }

  public async create(data: ICreatePostDTO): Promise<Post> {
    const post = new MongoosePost(data);

    await post.save();

    return post;
  }

  public async list({
    searchTerm,
    skip,
    user,
    take,
  }: IFilterPostDTO): Promise<{ list: Post[]; count: number }> {
    const posts = await MongoosePost.find({
      user,
      $or: [{ title: { $regex: `.*${searchTerm}.*`, $options: 'i' } }],
    })
      .skip(skip)
      .limit(take)
      .populate('campaign')
      .sort({ updatedAt: 'desc' })
      .exec();

    const count = await MongoosePost.find({
      user,
      $or: [{ title: { $regex: `.*${searchTerm}.*`, $options: 'i' } }],
    })
      .countDocuments()
      .exec();

    return { list: posts, count };
  }

  public async delete(post: Post): Promise<void> {
    await MongoosePost.deleteOne({ _id: post._id }).exec();
  }

  public async update(post: Post): Promise<Post> {
    await MongoosePost.updateOne({ _id: post._id }, post).exec();

    return post;
  }
}
