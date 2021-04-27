import { Response } from 'express';
import ICRUDOptions from './ICRUDOptions';

export default interface ICRUDProvider {
  read(options: ICRUDOptions): Promise<Response>;

  index(options: ICRUDOptions): Promise<Response>;

  store(option: ICRUDOptions): Promise<Response>;

  delete(option: ICRUDOptions): Promise<Response>;
}
