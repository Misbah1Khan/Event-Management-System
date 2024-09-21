"use client"; // Client-side component

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdminLayout from "../AdminLayout";

function EditEventComponent() {
  const [eventData, setEventData] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  // Load the specific event details
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const eventToEdit = storedEvents.find((event) => event.id === Number(eventId));
    if (eventToEdit) {
      setEventData(eventToEdit);
      setTickets(eventToEdit.tickets || []);
    }
  }, [eventId]);

  if (!eventData) return <div>Loading event details...</div>;

  // Handle updating the event
  const handleSaveChanges = () => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = storedEvents.map((event) => {
      if (event.id === eventData.id) {
        return { ...eventData, tickets };
      }
      return event;
    });
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    router.push("/AdminDashboard/All-Event");
  };

  // Handle input changes for event details
  const handleInputChange = (field, value) => {
    setEventData({ ...eventData, [field]: value });
  };

  // Handle ticket input changes
  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][field] = value;
    setTickets(updatedTickets);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col mt-10 items-center">
      <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <div className="mb-4">
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full mb-2"
            value={eventData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          <input
            type="date"
            className="border px-4 py-2 rounded-lg w-full mb-2"
            value={eventData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
          <textarea
            className="border px-4 py-2 rounded-lg w-full mb-2"
            value={eventData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full mb-2"
            value={eventData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full mb-2"
            value={eventData.organizer}
            onChange={(e) => handleInputChange("organizer", e.target.value)}
          />
        </div>

        {/* Edit Ticket Section */}
        <h2 className="text-xl font-bold mb-4">Edit Tickets</h2>
        {tickets.map((ticket, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              className="border px-4 py-2 rounded-lg"
              value={ticket.type}
              onChange={(e) => handleTicketChange(index, "type", e.target.value)}
            />
            <input
              type="number"
              className="border px-4 py-2 rounded-lg"
              value={ticket.price}
              onChange={(e) => handleTicketChange(index, "price", e.target.value)}
            />
            <input
              type="number"
              className="border px-4 py-2 rounded-lg"
              value={ticket.quantity}
              onChange={(e) => handleTicketChange(index, "quantity", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={handleSaveChanges}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default function EditEvent() {
  return (
    <AdminLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEventComponent />
      </Suspense>
    </AdminLayout>
  );
}
