# Full-stack Boilerplate - React, Express, Node, TypeORM

This boilerplate is intended to allow for the quick setup of an application skeleton leveraging best practices, but also some opinionated libary and technology selections based on my preferred tools. However, outside of the major technologies being leveraged, it should be possible to easily remove or substitute many of the technologies (eg. replacing PostegreSQL with MongoDB, Express with Koa, or TailwindCSS in favor of SASS).

## Application Overview

### Frontend

#### Technologies

- **Library:** React (built from Create-React-App)
- **Routing:** React-Router-Dom
- **Styling:** TailwindCSS

### Backend

#### Technologies

- **Environment:** NodeJS
- **Framework:** Express
- **Language:** Typescript
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Testing:** Jest & Supertest

## Installation

1. Clone this git repository: `git clone https://github.com/trm313/react-typeorm-ts-postgres.git [directory]`

2. Install the server packages: `npm install`

3. Install the client packages: `cd client && npm install`

4. Create a `.env` file at the server root, and add keys as defined in the `./src/config/env.ts` file

> `PG_URL` is your PostegreSQL connection string in the form of `postgresql://[username]:[password]@[host]:[port]]/[database]`
>
> Example: `postgresql://myuser:pass123@localhost:5432/mydatabase`

## Running the Application

### Development Runtime

In two terminals execute:

`npm run dev` - starts the server in watch mode on port 3001

`npm run client` - starts the client in development & watch mode on port 3000

Calls prefaced with `/api` will be proxied to the development server on port 3001, as configured in the `setupProxy.js` file

### Production Runtime

Execute `npm run heroku-postbuild`, which will trigger both the backend server and the React frontend client to build. The application will then be served statically from the server root

#### Production Build Process

If present, Heroku will run the `heroku-postbuild` script *instead* of the `build` script. The `heroku-postbuild` script in the root `package.json` file will trigger a full build of the application, including:
1. Compiling the TypeScript server into a JavaScript `dist/` folder
2. Installing the frontend dependencies
3. Building the frontend React client into the `client/build` folde

##### Backend Server

The `build` script from the server root will trigger `tsc` which will compile the source into the `dist/` folder. 

Running `npm start` from the server root will then execute `node dist/server.js`, spinning up the server from the compiled `dist/` folder. 

The server will be looking to serve the front-end application from the `client/build` folder, which is compiled in the Frontend build step. The Frontend build is triggered by the `heroku-postbuild` script, which is automatically triggered when publishing to Heroku.

##### Frontend Application

The `heroku-postbuild` script triggers the frontend to build its dependencies, and then launches the `build` script from the client `package.json` file. This `build` script launches two additional scripts: `build:css` and `build:react`.

`build:css` tells TailwindCSS to compile from the `src/styles/index.css` file into an output file `src/index.css`, which is referenced directly from the `index.js` frontend entry point.

`build:react` triggers the standard Create-React-App build process, which builds the client into subfolder `./Build`, which is served from the backend server directly.

# Resources

Server skeleton, middlewares, routes, unit tests, integration tests:

- Tutorial: [Product ready NodeJS REST APIs setup using TypeScript](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
- Source Code [alexpermyakov/node-rest-api](https://github.com/alexpermyakov/node-rest-api/tree/step.9)

# To Do List

- [x] Server static client/build directory from server
- [ ] Set up user authentication and authorization
- [ ] Push to heroku (ensure it builds the static frontend, get Heroku Postgres running)
