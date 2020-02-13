import { getRepository } from "typeorm";
import { Event } from "../../entity/Event";

export const createEvent = async (data: any) => {
  const eventRepository = getRepository(Event);
  let { ownerUid, name, hosts, startTime } = data;
  console.log(data);
  let event = new Event();
  event.ownerUid = ownerUid;
  event.name = name;
  event.hosts = hosts;
  event.startTime = startTime;
  event.code = "AFSDF";

  await eventRepository.save(event);
  return event;
};
