import React from "react";

const EventItem = ({ event, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-white shadow rounded p-4 my-2">
      <div className="flex-grow">
        <h6 className="uppercase text-lg font-bold text-gray-800">
          {event.name}
        </h6>
        <p>{event.hosts}</p>
        <p>{event.startTime}</p>
      </div>
      <button className="bg-red-500 text-white p-2 shadow cursor-pointer flex items-center justify-center rounded" onClick={() => onDelete(event.id)}>
        <i className="lni-close text-lg" />
      </button>
    </div>
  );
};

export default EventItem;
