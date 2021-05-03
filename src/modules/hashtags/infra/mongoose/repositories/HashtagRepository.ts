import { ICreateHashtagDTO } from '@modules/hashtags/dtos';
import IFilterHashtageDTO from '@modules/hashtags/dtos/IFilterHashtageDTO';
import IHashtagRepository from '@modules/hashtags/repositories/IHashtagRepository';

import Hashtag from '../../models/Hashtag';
import MongooseHashtag from '../entities/Hashtag';

export default class HashtagRepository implements IHashtagRepository {
  public async findById(
    hashtagId: string,
  ): Promise<Hashtag | null | undefined> {
    const hashtag = await MongooseHashtag.findById(hashtagId);

    return hashtag;
  }

  public async create(data: ICreateHashtagDTO): Promise<Hashtag> {
    const hashtag = new MongooseHashtag(data);

    await hashtag.save();

    return hashtag;
  }

  public async list({
    searchTerm,
    skip,
    take,
    user,
  }: IFilterHashtageDTO): Promise<{ list: Hashtag[]; count: number }> {
    const list = await MongooseHashtag.find({
      user,
      name: { $regex: `.*${searchTerm}.*`, $options: 'i' },
    })
      .skip(skip)
      .limit(take)
      .exec();

    const count = await MongooseHashtag.find({
      user,
      name: { $regex: `.*${searchTerm}.*`, $options: 'i' },
    })
      .countDocuments()
      .exec();

    return { list, count };
  }

  public async update(hashtag: Hashtag): Promise<Hashtag> {
    await MongooseHashtag.findOneAndUpdate({ _id: hashtag._id }, hashtag);

    return hashtag;
  }

  public async delete(hashtag: Hashtag): Promise<Hashtag> {
    await MongooseHashtag.deleteOne({ _id: hashtag._id });

    return hashtag;
  }
}
