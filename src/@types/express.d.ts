interface FormatedJsonOptions {
  success?: boolean;
  token?: string;
  message?: string;
}

declare namespace Express {
  export interface Request {
    user?: {};
  }

  export interface Response {
    formatedJson(data: any, options?: FormatedJsonOptions): this;
  }
}
