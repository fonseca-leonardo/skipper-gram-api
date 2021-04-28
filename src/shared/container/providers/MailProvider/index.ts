import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import DrenMailProvider from './implementations/DrenMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  dren: container.resolve(DrenMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
