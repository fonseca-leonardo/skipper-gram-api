import { verify, sign } from 'jsonwebtoken';

import IAuthenticationProvider from '../models/IAuthenticationProvider';
import ITokenConfig from '../models/ITokenConfig';
import ITokendata from '../models/ITokendata';

export default class JwtProvider implements IAuthenticationProvider {
  sign<T>(data: ITokendata<T>, secret: string, config: ITokenConfig): string {
    return sign(data, secret, { expiresIn: config.expireIn });
  }

  authorize<T>(token: string, secret: string): ITokendata<T> | undefined {
    try {
      const decoded = verify(token, secret) as ITokendata<T>;

      return decoded;
    } catch (error) {
      return;
    }
  }
}
