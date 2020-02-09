# Full-stack Boilerplate - React, Express, Node, TypeORM

This boilerplate is intended to allow for the quick setup of an application skeleton leveraging best practices, but also some opinionated libary and technology selections based on my preferred tools. However, outside of the major technologies being leveraged, it should be possible to easily remove or substitute many of the technologies (eg. replacing PostegreSQL with MongoDB, Express with Koa, or TailwindCSS in favor of SASS).

## Application Overview

[Live Demo](https://no-postgrets.herokuapp.com/) of this repository hosted on Heroku.

_Note: The demo is hosted on a free Heroku dyno, so it will likely require a few seconds to warm up_

### Frontend

#### Technologies

- **Library:** React (built from Create-React-App)
- **State:** Redux (configured via Redux Toolkit)
- **Routing:** React-Router-Dom
- **Styling:** TailwindCSS
- **Authentication:** Firebase with Firebase UI

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

In two terminals execute the following commands from the application root:

`npm run dev` - starts the server in watch mode on port 3001

`npm run client` - starts the client in development & watch mode on port 3000

In development mode, calls from the frontend that are prefaced with `/api` will be proxied to the development server on port 3001, as configured in the `setupProxy.js` file

### Production Runtime

Executing `npm run heroku-postbuild` will trigger both the backend server and the React frontend client to build. The application will then be served statically from the server root.

You can execute this command locally to test functionality of a static deployment, and it will also be key to deploying your application to Heroku as described below

#### Deploying to Heroku

To deploy this application to Heroku:

1. Configure a new Heroku application, and connect your repository to the Heroku app however you like (connected Github repo, for example)
2. Setup your Postgres database. A free option is via the "Heroku Postgres" add-on, which can be added to your Heroku app from the `Resources` tab
3. Add your environment variables to the Heroku application on the `Settings` tab. **Important:** Without the `PG_URL` variable, the application will not start
4. Deploy your application, and (optional) set up auto-deployments from your repository's `master` branch

When deployed, Heroku will install the dependencies configured in the application's root `package.json` file, and then execute the `heroku-postbuild` script. Once finished, Heroku will run the command specified in the `Procfile` at the application's root, which for us is `npm start`.

#### Production Build Process

If present, Heroku will run the `heroku-postbuild` script _instead_ of the `build` script. The `heroku-postbuild` script in the root `package.json` file will trigger a full build of the application, including:

1. Compiling the TypeScript server into JavaScript in the `dist/` folder
2. Installing the frontend dependencies
3. Building the frontend React client into the `client/build` folder

For more granular details, see the specific breakdowns below

##### Backend Server

The `build` script from the server root will trigger `tsc` which will compile the source into the `dist/` folder. This location is specified in the `tsconfig.json` file via the `outDir` key.

Running `npm start` from the server root will then execute `node dist/server.js`, spinning up the server from the compiled `dist/` folder.

The server will be looking to serve the front-end application from the `client/build` folder, which is compiled in the Frontend build step. The Frontend build is triggered by the `heroku-postbuild` script, which is automatically triggered when publishing to Heroku.

##### Frontend Application

The `heroku-postbuild` script triggers the frontend to build its dependencies, and then launches the `build` script from the client `package.json` file. This `build` script launches two additional scripts: `build:css` and `build:react`.

`build:css` tells TailwindCSS to compile from the `src/styles/index.css` file into an output file `src/index.css`, which is referenced directly from the `index.js` frontend entry point.

`build:react` triggers the standard Create-React-App build process, which builds the client into subfolder `./Build`, which is served from the backend server directly.

## Authentication

### Overview

User authentication is handled via Firebase. On the front-end, this repo leverages the drop-in Firebase UI component to handle all authentication forms and providers. Authentication is persisted in local storage, and automatically validated on page load.

During this authentication validation, the user's information and `access_token` are collected, and stored in the Redux `user` state.

This `access_token` is then supplied in the Authorization Header during calls to protected routes on the backend, where the token is validated with Firebase inside a router middleware, to then facilitate all data fetching calls.

### Detailed Process Flow

#### Frontend Authentication & Routing

Firebase is initialized on the frontend in the `client/services/firebase.js` file, and exports various utilities, that can be called as needed.

Inside the `App` component is a `useEffect` call that will launch a function to listen for updates to Firebase authentication, `listenToFirebaseAuth`. This will trigger on page load (when the user's stored data is validated), when a user logs in, and when a user logs out.

Callbacks from this function will invoke Redux Actions `signUserIn` and `signUserOut` as appropriate, which will update the `userReducer` state.

There is a `/logout` route configured that will also invoke Firebase's `auth.signOut()` function (thereby triggering the `signUserOut` action), as well as automatically redirecting the user back to the `/` route.

Protected routes can be configured, and there is an example set up in the `App` component. Since it can take a couple of seconds to validate a returning user (who might refresh the page on a protected route), the `PrivateRoute` component will render a `LoadingScreen` component if that validation process is in progress. This prevents the user from being redirected back to the fall-back route during this gap.

#### Sending API Calls for User-Protected Routes

Coming soon...

#### Backend Authentication & Authorization

The `auth.ts` middleware can be applied to any route handlers to ensure the user making the API call is authenticated, and then provide them with the data corresponding to their account.

This middleware will decode the provided token to reveal their user details. These user details can then safely be used to query for eg. the posts belonging to that user.

More details coming soon..

# Resources

Server skeleton, middlewares, routes, unit tests, integration tests:

- Tutorial: [Product ready NodeJS REST APIs setup using TypeScript](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
- Source Code [alexpermyakov/node-rest-api](https://github.com/alexpermyakov/node-rest-api/tree/step.9)

# To Do List

- [ ] Set up user authentication and authorization workflows
- [ ] Configure a boilerplate Admin Dashboard, accessible via a protected frontend route
- [ ] Setup example CRUD actions from within the Admin Dashboard
