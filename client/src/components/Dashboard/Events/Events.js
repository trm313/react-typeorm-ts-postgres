import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import EventForm from "../EventForm";
import EventItem from "./EventItem";

const Events = () => {
  const user = useSelector(store => store.user);
  const [events, setEvents] = useState(null);

  async function fetchEvents() {
    try {
      axios.defaults.headers.common["FIREBASE_AUTH_TOKEN"] =
        user.data.accessToken;
      const result = await axios.get("/api/v1/events");
      setEvents(result.data.events);
    } catch {
      setEvents("ERROR");
    }
  }

  async function deleteEvent(id) {
    axios.defaults.headers.common["FIREBASE_AUTH_TOKEN"] =
      user.data.accessToken;
    const result = await axios.delete("/api/v1/event/" + id);
    fetchEvents();
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <h1>Events</h1>
      <EventForm refresh={fetchEvents} />
      <div className="flex flex-col">
        {events === "ERROR" && (
          <div className="bg-red-600 text-white flex flex-col">
            <p>
              <strong>Error</strong>
            </p>
            <p>Could not create event</p>
          </div>
        )}
        {!events && (
          <div className="bg-gray-500 w-32 h-32 flex items-center justify-center">
            <i className="lni-spinner-solid spin-inf text-3xl" />
          </div>
        )}
        {events !== "ERROR" &&
          events &&
          events.map(event => (
            <EventItem event={event} onDelete={deleteEvent} />
          ))}
      </div>
    </div>
  );
};

export default Events;
