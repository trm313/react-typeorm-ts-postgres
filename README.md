# Full-stack Boilerplate - React, Express, Node, TypeORM

## Development Runtime

In two terminals execute:

`npm run dev` - starts the server in watch mode on port 3001

`npm run client` - starts the client in development & watch mode on port 3000

Calls prefaced with /api will be proxied to the development server on port 3001, configured in the `setupProxy.js` file

## Production Runtime

Execute `npm run heroku-postbuild`, which will trigger the React client to build. The application will then be served statically from the server root

## Frontend

### Technologies

- **Library:** React (built from Create-React-App)
- **Routing:** React-Router-Dom
- **Styling:** TailwindCSS

## Backend

### Technologies

- **Environment:** NodeJS
- **Framework:** Express
- **Language:** Typescript
- **ORM:** TypeORM
- **Database:** PostgreSQL
- **Testing:** Jest & Supertest

# Resources

Server skeleton, middlewares, routes, unit tests, integration tests:

- Tutorial: [Product ready NodeJS REST APIs setup using TypeScript](https://itnext.io/production-ready-node-js-rest-apis-setup-using-typescript-postgresql-and-redis-a9525871407)
- Source Code [alexpermyakov/node-rest-api](https://github.com/alexpermyakov/node-rest-api/tree/step.9)

# To Do List

- [x] Server static client/build directory from server
- [ ] Set up user authentication and authorization
- [ ] Push to heroku (ensure it builds the static frontend, get Heroku Postgres running)
