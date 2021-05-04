## How to install

First you need to clone the repository using Git.

```bash
git clone https://github.com/fonseca-leonardo/skipper-gram-api.git
```

After cloning, now you have to install the dependencies with **npm** or **yarn.**

```bash
# with npm
npm install
# or with yarn
yarn install
```

## Run Skipper Gram

After the installation process you need to create the **.env** file to set the environment variables, you can use the **[.env.example](https://github.com/fonseca-leonardo/skipper-gram-frontend/blob/master/.env.example)** and complete the variables values.

```bash
#For development purpose leave it with development
ENVIROMENT=development
#When running in production enviroment use bellow value
#ENVIROMENT=production

#MongoDB host
DB_HOST=
#MongoDB port
DB_PORT=
#MongoDB username
DB_USERNAME=
#MongoDB passowrd
DB_PASSWORD=
#MongoDB database
DB_DATABASE=

#Secret for JWT authentication
TOKEN_SECRET=

#Your mail host server
MAIL_HOST=
#Your mail port server
MAIL_PORT=
#Your mail username
MAIL_USERNAME=
#Your mail password
MAIL_PASSWORD=

#Skipper frontend url
FRONT_URL=

# Port that will be opened, default is 3333
PORT=
```

### Running in development environment

With the .env created you can start with **npm** or **yarn**:

```bash
# with npm
npm run dev

# or with yarn
yarn run dev
```

and happy hacking 😁

### Running in production environment

First you need you build the project by running

```bash
# with npm
npm run build

# or with yarn
yarn run dev
```

When the build is finished you will a dist folder will be created and now Skipper Gram is ready to run on production mode with:

```bash
# with npm
npm start

# or with yarn
yarn start
```

and enjoy 😁

## Docker

Skipper Gram also has a docker image on Docker Hub:

[Docker Hub](https://hub.docker.com/r/leonardof45/skipper-gram-api)

Pull the image, run it and let docker do the trick for you. Just don't forget to set the environment variables when running the container.
