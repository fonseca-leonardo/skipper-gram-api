import { Request, Response } from 'express';

import IController from '@shared/classes/IController';

export default class TemplateController implements IController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.formatedJson({ hello: 'world' });
  }
}
