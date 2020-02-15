import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import axios from "axios";

const EventForm = ({ refresh }) => {
  const user = useSelector(store => store.user);
  const [newOpen, setNewOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    hosts: "",
    startTime: new Date()
  });

  const onFormChange = e =>
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  const onStartDateChange = date => {
    setForm({
      ...form,
      ["startTime"]: date
    });
  };

  const onFormSubmit = async e => {
    e.preventDefault();
    console.log("onFormSubmit", form);

    if (form.name && form.hosts && form.startTime) {
      let data = form;
      try {
        axios.defaults.headers.common["FIREBASE_AUTH_TOKEN"] =
          user.data.accessToken;
        const result = await axios.post("/api/v1/events", data);
        setNewOpen(false);
        setForm({
          name: "",
          hosts: "",
          startTime: new Date()
        });
        refresh();
      } catch {
        console.log("Error submitting form");
      }
    } else {
      console.log("Missing required fields");
    }
  };

  const onFormCancel = async () => {
    setNewOpen(false);
  };

  return (
    <div className="w-full max-w-lg">
      <button
        className="flex items-center bg-green-500 text-white py-2 px-4 rounded shadow"
        onClick={() => setNewOpen(!newOpen)}
      >
        <i className="lni-plus mr-3" />
        New Event
      </button>
      {newOpen && (
        <form className="flex flex-col items-center" onSubmit={onFormSubmit}>
          <div className="form-group">
            <span className="form-label">Name</span>
            <input
              className="form-input"
              type="text"
              name="name"
              placeholder="Event name"
              value={form.name}
              onChange={onFormChange}
            />
          </div>

          <div className="form-group">
            <span className="form-label">Hosts</span>
            <input
              className="form-input"
              type="text"
              name="hosts"
              placeholder="Bill Gates, CEO; Brad Pitt, CMO"
              value={form.hosts}
              onChange={onFormChange}
            />
          </div>

          <div className="form-group">
            <span className="form-label">Start Date</span>
            <DateTimePicker
              name="startTime"
              onChange={onStartDateChange}
              value={form.startTime}
              className="form-input"
            />
          </div>

          <div className="flex items-center">
            <button
              className="py-2 px-4 bg-gray-600 text-white rounded shadow flex items-center mr-4"
              type="button"
              onClick={() => onFormCancel()}
            >
              <i className="lni-ban mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-teal-500 text-white rounded shadow flex items-center"
            >
              <i className="lni-save mr-2" />
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EventForm;
