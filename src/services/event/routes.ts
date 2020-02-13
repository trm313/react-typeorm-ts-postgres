import { Request, Response } from "express";

import { verifyAuth } from "../../middleware/auth";

import { checkNewEventParams } from "../../middleware/checks";

import { createEvent } from "./EventController";

export default [
  {
    path: "/api/v1/events",
    method: "get",
    handler: [
      verifyAuth,
      async (req: Request, res: Response) => {
        console.log("user: ", req.user);
        res.status(200).send({ route: "/api/v1/events" });
      }
    ]
  },
  {
    path: "/api/v1/events",
    method: "post",
    handler: [
      verifyAuth,
      checkNewEventParams,
      async (req: Request, res: Response) => {
        let data = req.body;
        data.ownerUid = req.user?.uid;
        console.log({ data, user: req.user });
        let event = await createEvent(data);
        res.status(201).send({ event });
      }
    ]
  }
];
