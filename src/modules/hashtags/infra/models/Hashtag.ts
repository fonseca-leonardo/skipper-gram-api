export default interface Hashtag {
  _id: string;

  name: string;

  tags: string[];

  tagColor: string;

  createdAt: Date;

  updatedAt: Date;
}
