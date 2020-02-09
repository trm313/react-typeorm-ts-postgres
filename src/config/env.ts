import dotenv from "dotenv";
dotenv.config();

export default {
  PG_URL: process.env.PG_URL,
  OPEN_CAGE_DATA_KEY: process.env.OPEN_CAGE_DATA_KEY
};
