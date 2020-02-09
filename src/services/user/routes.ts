import { Request, Response } from "express";

import { verifyAuth } from '../../middleware/auth';

import {
  checkNewUserParams,
  checkEmailIsUnique
} from "../../middleware/checks";


import { createUser } from "./UserController";

export default [
  {
    path: "/api/v1/user",
    method: "get",
    handler: [
      verifyAuth,
      async ({ query }: Request, res: Response) => {
        res.status(200).send({ route: "/api/v1/user" });
      }
    ]
  },
  {
    path: "/api/v1/user",
    method: "post",
    handler: [
      checkNewUserParams,
      checkEmailIsUnique,
      async ({ body }: Request, res: Response) => {
        let user = await createUser(body);
        res.status(201).send({ user });
      }
    ]
  }
];
