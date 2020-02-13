import React, { useState, useEffect } from "react";

const Events = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>Events</h1>
      <button className="flex items-center bg-green-500 text-white py-2 px-4 rounded shadow">
        <i className="lni-plus mr-3" />
        New Event
      </button>
    </div>
  );
};

export default Events;
