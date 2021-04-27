import ITokendata from './ITokendata';
import ITokenConfig from './ITokenConfig';

export default interface IAuthenticationProvider {
  sign<T>(data: ITokendata<T>, secret: string, config: ITokenConfig): string;

  authorize<T>(token: string, secret: string): ITokendata<T> | undefined;
}
