import { Request, Response } from 'express';

export default interface ICRUDOptions {
  tablename: string;

  request: Request;

  response: Response;
}
