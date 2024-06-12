import dotenv from "dotenv";

dotenv.config();

const _secrets = {
  // node
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  // cors
  ALLOW_ORIGIN_ONE: process.env.ALLOW_ORIGIN_ONE,
};

export const secrets = Object.freeze(_secrets);
