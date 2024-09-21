"use client";

import { useState, useEffect } from "react";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents);
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Event List</h2>
      {events.length === 0 ? (
        <p>No events added yet.</p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index} className="border p-4 mb-2 flex justify-between">
              <div>
                <h3 className="text-xl">{event.title}</h3>
                <p>{event.description}</p>
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteEvent(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
