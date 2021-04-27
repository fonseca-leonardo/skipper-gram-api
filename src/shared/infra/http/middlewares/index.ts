import HandleResponseMiddleware from './handleResponse';
import AuthenticationMiddleware from './authentication';
import { container } from 'tsyringe';

export default class Middlewares {
  private handleResponseMiddleware: HandleResponseMiddleware;

  private authenticationMiddleware: AuthenticationMiddleware;

  constructor() {
    this.authenticationMiddleware = container.resolve(AuthenticationMiddleware);

    this.handleResponseMiddleware = container.resolve(HandleResponseMiddleware);
  }

  public init() {
    return {
      authenticationMiddleware: this.authenticationMiddleware.init,
      handleResponseMiddleware: this.handleResponseMiddleware.init,
    };
  }
}
