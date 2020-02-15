import { getRepository } from "typeorm";
import random from "randomstring";
import { Event } from "../../entity/Event";

/**
 * GET /event/:id -- Get Single Event by ID
 * @param eventId
 * @param ownerUid
 */
export const getEvent = async (eventId: number, ownerUid: string) => {
  const eventRepository = getRepository(Event);
  let event = await eventRepository.findOne({
    id: eventId,
    ownerUid: ownerUid
  });
  return event;
};

/**
 * GET /events -- Get All Events for User
 * @param ownerUid
 */
export const getEvents = async (ownerUid: string) => {
  const eventRepository = getRepository(Event);
  let events = await eventRepository.find({ ownerUid: ownerUid });
  return events;
};

/**
 * POST /events -- Create New Event
 * @param data: { ownerUid, name, hosts, startTime }
 */
export const createEvent = async (data: any) => {
  const eventRepository = getRepository(Event);
  let { ownerUid, name, hosts, startTime } = data;

  let event = new Event();
  event.ownerUid = ownerUid;
  event.name = name;
  event.hosts = hosts;
  event.startTime = startTime;
  event.code = await generateUniqueEventCode();

  await eventRepository.save(event);
  return event;
};

const generateUniqueEventCode = async () => {
  const eventRepository = getRepository(Event);
  let uniqueCheck = false;
  let userCode = "";
  do {
    userCode = random.generate({
      length: 6,
      capitalization: "uppercase",
      charset: "alphabetic",
      readable: true
    });

    var existing = await eventRepository.find({ code: userCode });
    if (existing.length === 0) {
      uniqueCheck = true;
    }
  } while (!uniqueCheck);

  return userCode;
};

/**
 * DELETE /event/:id -- Delete Event by ID
 * @param eventId
 * @param userId
 */
export const deleteEvent = async (eventId: number, userId: string) => {
  const eventRepository = getRepository(Event);
  await eventRepository.delete({ id: eventId, ownerUid: userId });
  return "Event deleted";
};

/**
 * PUT /event/:id -- Update Event by ID
 * @param eventId
 * @param userId
 * @param data
 */
export const updateEvent = async (
  eventId: number,
  userId: string,
  data: any
) => {
  console.log("updateEvent");
  const eventRepository = getRepository(Event);
  let event = await eventRepository.update(
    { id: eventId, ownerUid: userId },
    data
  );
  return event;
};
