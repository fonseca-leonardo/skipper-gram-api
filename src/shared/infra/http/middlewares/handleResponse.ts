import { Request, Response, NextFunction } from 'express';

interface FormatedJsonOptions {
  success?: boolean;
  token?: string;
  message?: string;
}

export default class HandleResponseMiddleware {
  constructor() {}

  public async init(_: Request, response: Response, next: NextFunction) {
    response.formatedJson = (
      data: any,
      { success = true, token, message = '' }: FormatedJsonOptions = {},
    ) => response.json({ data, success, token, message });

    return next();
  }
}
