import 'reflect-metadata';

import { container } from 'tsyringe';

import Server from '@shared/infra/http/server';

const server = container.resolve(Server);

const port = process.env.PORT || 3333;

server
  .init()
  .then(app => {
    app.listen(port, () => {
      console.log(`Server started: ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
    console.log('Error while starting Server');
  });
