import { Request, Response } from 'express';

export default interface IController {
  show(request: Request, response: Response): Promise<Response>;

  store?(request: Request, response: Response): Promise<Response>;
}
