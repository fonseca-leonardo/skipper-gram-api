import { ICreateHashtagDTO } from '../dtos';
import IFilterHashtageDTO from '../dtos/IFilterHashtageDTO';
import Hashtag from '../infra/models/Hashtag';

export default interface IHashtagRepository {
  findById(hashtagId: string): Promise<Hashtag | undefined | null>;

  create(data: ICreateHashtagDTO): Promise<Hashtag>;

  list(data: IFilterHashtageDTO): Promise<{ list: Hashtag[]; count: number }>;

  update(hashtag: Hashtag): Promise<Hashtag>;

  delete(hashtag: Hashtag): Promise<Hashtag>;
}
