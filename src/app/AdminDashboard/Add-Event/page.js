"use client"; // Client-side component

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import AdminLayout from "../AdminLayout";

export default function AddEvent() {
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventOrganizer, setNewEventOrganizer] = useState("");
  const [newEventCategory, setNewEventCategory] = useState("Conference");
  const [newEventCapacity, setNewEventCapacity] = useState("");
  const [newEventTickets, setNewEventTickets] = useState([{ type: "", price: "", quantity: "" }]);
  const [newEventImage, setNewEventImage] = useState(null); 
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const validateForm = () => {
    if (!newEventName || !newEventDate || !newEventDescription || !newEventLocation || !newEventOrganizer || !newEventCapacity || !newEventImage) {
      setErrorMessage("Please fill in all fields and upload an image.");
      return false;
    }
    if (isNaN(newEventCapacity) || newEventCapacity <= 0) {
      setErrorMessage("Capacity must be a positive number.");
      return false;
    }
    return true;
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...newEventTickets];
    updatedTickets[index][field] = value;
    setNewEventTickets(updatedTickets);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEventImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = () => {
    setErrorMessage(""); 

    if (!validateForm()) return; 

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const newEvent = {
      id: Date.now(),
      name: newEventName,
      date: newEventDate,
      description: newEventDescription,
      location: newEventLocation,
      organizer: newEventOrganizer,
      category: newEventCategory,
      capacity: newEventCapacity,
      tickets: newEventTickets,  
      image: newEventImage, 
    };
    const updatedEvents = [...storedEvents, newEvent];
    localStorage.setItem("events", JSON.stringify(updatedEvents));

   
    setSuccessMessage("Event added successfully!");

    setNewEventName("");
    setNewEventDate("");
    setNewEventDescription("");
    setNewEventLocation("");
    setNewEventOrganizer("");
    setNewEventCategory("Conference");
    setNewEventCapacity("");
    setNewEventTickets([{ type: "", price: "", quantity: "" }]);
    setNewEventImage(null);

    setTimeout(() => {
      router.push("/AdminDashboard/All-Event");
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 flex flex-col mt-10 items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Add Event</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter event name"
              className="border px-4 py-2 rounded-lg w-full mb-2"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
            />
            <input
              type="date"
              className="border px-4 py-2 rounded-lg w-full mb-2"
              value={newEventDate}
              onChange={(e) => setNewEventDate(e.target.value)}
            />
            <textarea
              placeholder="Enter event description"
              className="border px-4 py-2 rounded-lg w-full mb-2"
              value={newEventDescription}
              onChange={(e) => setNewEventDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter event location"
              className="border px-4 py-2 rounded-lg w-full mb-2"
              value={newEventLocation}
              onChange={(e) => setNewEventLocation(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter event organizer"
              className="border px-4 py-2 rounded-lg w-full mb-2"
              value={newEventOrganizer}
              onChange={(e) => setNewEventOrganizer(e.target.value)}
            />
            <select
              className="border px-4 py-2 rounded-lg w-full mb-2"
              value={newEventCategory}
              onChange={(e) => setNewEventCategory(e.target.value)}
            >
              <option value="Conference">Conference</option>
              <option value="Concert">Concert</option>
              <option value="Function">Function</option>
              <option value="Workshop">Workshop</option>
              <option value="Webinar">Webinar</option>
            </select>
            <input
              type="number"
              placeholder="Enter event capacity"
              className="border px-4 py-2 rounded-lg w-full mb-2"
              value={newEventCapacity}
              onChange={(e) => setNewEventCapacity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          {newEventImage && (
            <div className="mb-4">
              <img src={newEventImage} alt="Event Preview" className="w-full h-40 object-cover rounded-lg" />
            </div>
          )}

          <h2 className="text-xl font-bold mb-4">Event Tickets</h2>
          {newEventTickets.map((ticket, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Ticket Type (e.g., General Admission)"
                className="border px-4 py-2 rounded-lg"
                value={ticket.type}
                onChange={(e) => handleTicketChange(index, "type", e.target.value)}
              />
              <input
                type="number"
                placeholder="Ticket Price"
                className="border px-4 py-2 rounded-lg"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, "price", e.target.value)}
              />
              <input
                type="number"
                placeholder="Ticket Quantity"
                className="border px-4 py-2 rounded-lg"
                value={ticket.quantity}
                onChange={(e) => handleTicketChange(index, "quantity", e.target.value)}
              />
            </div>
          ))}

          <button
            onClick={handleAddEvent}
            className="bg-blue-950 text-white px-4 py-2 rounded transition duration-300 ease-in-out hover:bg-blue-900 w-full"
          >
            Add Event
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
