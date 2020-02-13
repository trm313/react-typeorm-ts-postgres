import { Request, Response } from "express";

import { verifyAuth } from "../../middleware/auth";

import { checkNewEventParams } from "../../middleware/checks";

import {
  createEvent,
  getEvents,
  deleteEvent,
  getEvent
} from "./EventController";

export default [
  {
    path: "/api/v1/event/:id",
    method: "get",
    handler: [
      verifyAuth,
      async (req: Request, res: Response) => {
        let user = req.user;
        let eventId = req.params.id;
        let events = await getEvent(+eventId, user!.uid);
        res.status(200).send({ events });
      }
    ]
  },
  {
    path: "/api/v1/events",
    method: "get",
    handler: [
      verifyAuth,
      async (req: Request, res: Response) => {
        let user = req.user;
        let events = await getEvents(user!.uid);
        res.status(200).send({ events });
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
        let event = await createEvent(data);
        res.status(201).send({ event });
      }
    ]
  },
  {
    path: "/api/v1/event/:id",
    method: "delete",
    handler: [
      verifyAuth,
      async (req: Request, res: Response) => {
        let eventId = req.params.id;
        let user = req.user;
        let message = await deleteEvent(+eventId, user!.uid);
        res.status(200).send({ message });
      }
    ]
  }
];
