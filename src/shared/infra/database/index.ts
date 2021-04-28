import dbConnection from './typeorm';
import mongooseConnection from './mongoose';

export default class Database {
  public async init() {
    try {
      await mongooseConnection();
    } catch (error) {
      console.log({ error });
    }
  }
}
