import { Request, Response } from 'express';

export default interface IController {
  show?(request: Request, response: Response): Promise<Response>;

  store?(request: Request, response: Response): Promise<Response>;

  index?(request: Request, response: Response): Promise<Response>;

  update?(request: Request, response: Response): Promise<Response>;

  delete?(request: Request, response: Response): Promise<Response>;
}
