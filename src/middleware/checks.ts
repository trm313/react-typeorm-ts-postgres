import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { HTTP400Error } from "../utils/httpErrors";
import { User } from "../entity/User";

async function validateEmail(email: string) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q) {
    throw new HTTP400Error("Missing q parameter");
  } else {
    next();
  }
};

export const checkNewUserParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let body = req.body;

  if (!body.email) {
    throw new HTTP400Error("Email is required to sign up");
  } else if (!validateEmail(body.email)) {
    throw new HTTP400Error("Email is not valid");
  } else {
    next();
  }
};

export const checkEmailIsUnique = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email } = req.body;
  const entries = await getRepository(User).find({
    where: { email: email.toLowerCase() }
  });
  if (entries.length > 0) {
    throw new HTTP400Error("Email is already in use");
  } else {
    next();
  }
};

export const checkNewEventParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, hosts, startTime } = req.body;
  if (!name || !hosts || !startTime) {
    throw new HTTP400Error("Missing required fields");
  } else {
    next();
  }
};
