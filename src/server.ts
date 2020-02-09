import http from "http";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { createConnection } from "typeorm";
import * as firebase from "firebase-admin";

import env from "./config/env";

import Entities from "./entity";
import { User } from "./entity/User";

import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";

dotenv.config();

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

createConnection({
  type: "postgres",
  url: env.PG_URL,
  entities: [User]
})
  .then(async connection => {
    console.log(`Connected to PostgreSQL database`);

    const firebaseConfig = {
      type: "service_account",
      projectId: env.FIREBASE_PROJECT_ID,
      privateKey:
        env.FIREBASE_PRIVATE_KEY &&
        env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: env.FIREBASE_CLIENT_EMAIL
    };

    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseConfig),
      databaseURL: env.FIREBASE_DATABASE_URL
    });
    console.log("Firebase initialized");

    await connection.synchronize();

    const router = express();

    // Serve frontend from client/build (need to step back out of dist)
    // Possible "to do" - have react:build move the client folder into dist/
    router.use(express.static(path.join(__dirname, "../client/build")));

    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);

    router.use("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

    const { PORT = 3001 } = process.env;
    const server = http.createServer(router);

    server.listen(PORT, () =>
      console.log(`Server is running on http://localhost:${PORT}`)
    );
  })
  .catch(error => console.log(error));
