import dotenv from "dotenv";
dotenv.config();

export default {
  PG_URL: process.env.PG_URL,
  OPEN_CAGE_DATA_KEY: process.env.OPEN_CAGE_DATA_KEY,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY
};
