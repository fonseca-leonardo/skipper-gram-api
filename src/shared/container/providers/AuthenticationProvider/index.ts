import { container } from 'tsyringe';
import JwtProvider from './implementations/JwtProvider';
import IAuthenticationProvider from './models/IAuthenticationProvider';

container.registerSingleton<IAuthenticationProvider>(
  'AuthenticationProvider',
  JwtProvider,
);
