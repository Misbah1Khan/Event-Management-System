"use client"; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../AdminLayout";

export default function ShowEvents() {
    const [events, setEvents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(storedEvents);
    }, []);

    const handleDeleteEvent = (id) => {
        const updatedEvents = events.filter((event) => event.id !== id);
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    const handleEditEvent = (id) => {
        router.push(`/AdminDashboard/Edit-Event?id=${id}`);
    };

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">All Events</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                            >
                                {event.image && (
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-full h-40 object-cover rounded-t-lg mb-4"
                                    />
                                )}
                                
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.name}</h3>

                                <div className="text-gray-600 space-y-2">
                                    <p>
                                        <strong>Date:</strong> {event.date}
                                    </p>
                                    <p>
                                        <strong>Location:</strong> {event.location}
                                    </p>
                                    <p>
                                        <strong>Organizer:</strong> {event.organizer}
                                    </p>
                                    <p>
                                        <strong>Category:</strong> {event.category}
                                    </p>
                                    <p>
                                        <strong>Capacity:</strong> {event.capacity}
                                    </p>
                                    <p>
                                        <strong>Description:</strong> {event.description}
                                    </p>
                                </div>



                                {event.tickets && event.tickets.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="text-lg font-bold text-gray-700 mb-2">Tickets</h4>
                                        <ul className="list-none list-inside space-y-1">
                                            {event.tickets.map((ticket, index) => (
                                                <li key={index} className="text-gray-600">
                                                    <strong>Type:</strong> {ticket.type} -
                                                    <strong> Price:</strong> ${ticket.price} -
                                                    <strong> Quantity:</strong> {ticket.quantity} -
                                                    <strong> Sold:</strong> {ticket.sold || 0}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="mt-6 flex space-x-4">
                                    <button
                                        className="bg-blue-950 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                                        onClick={() => handleDeleteEvent(event.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-blue-950 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                                        onClick={() => handleEditEvent(event.id)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-lg">No events available.</p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
