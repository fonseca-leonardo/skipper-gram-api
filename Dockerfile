FROM node:lts-alpine

COPY package.json ./

RUN yarn install
COPY . .
RUN yarn run build
COPY . .


EXPOSE 3333

CMD [ "node", "dist/app.js" ]
