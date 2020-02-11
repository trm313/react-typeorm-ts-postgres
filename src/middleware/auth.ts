import { Request, Response, NextFunction } from "express";
import { auth } from "firebase-admin";
import { HTTP400Error } from "../utils/httpErrors";
import * as firebase from "firebase-admin";
import env from "../config/env";

export const initializeFirebase = () => {
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
};

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idToken = req.header("FIREBASE_AUTH_TOKEN");

  if (!idToken) {
    throw new HTTP400Error("Authentication required");
  }

  let decodedIdToken = await firebase.auth().verifyIdToken(idToken);
  req.user = {
    uid: decodedIdToken.uid,
    email: decodedIdToken.email
  };
  next();
};

export default firebase;
