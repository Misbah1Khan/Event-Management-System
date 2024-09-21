"use client"; 

import { useState } from "react";

export default function AddEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);

  const handleAddEvent = (e) => {
    e.preventDefault();

    const newEvent = { title, description };

    setEvents([...events, newEvent]);

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleAddEvent} className="bg-white p-4 shadow-md rounded mb-6">
      <h2 className="text-lg font-bold mb-4">Add New Event</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        className="border p-2 mb-4 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Event Description"
        className="border p-2 mb-4 w-full"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Event
      </button>
    </form>
  );
}
