"use client"; 

import { useState, useEffect } from "react";
import UserLayout from "../UserLayout";

export default function MyEvents() {
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        const storedMyEvents = JSON.parse(localStorage.getItem("myEvents")) || [];
        setMyEvents(storedMyEvents);
    }, []);

    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">My Registered Events</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                    {myEvents.length > 0 ? (
                        myEvents.map((event, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                <img src={event.image || "/images/default-event.jpg"} alt={event.name} className="w-full h-40 object-cover rounded-t-lg" />
                                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{event.name}</h3>
                                <div className="text-gray-600 mb-4 space-y-2">
                                    <p><strong>Date:</strong> {event.date}</p>
                                    <p><strong>Location:</strong> {event.location}</p>
                                    <p><strong>Organizer:</strong> {event.organizer}</p>
                                    <p><strong>Category:</strong> {event.category}</p>
                                    <p><strong>Description:</strong> {event.description}</p>
                                    <p><strong>Tickets:</strong> {event.quantity}</p>
                                </div>
                                <div className="text-gray-600 space-y-1">
                                    <p><strong>Name:</strong> {event.userInfo.name}</p>
                                    <p><strong>Email:</strong> {event.userInfo.email}</p>
                                    <p><strong>Contact:</strong> {event.userInfo.contact}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-lg">You have not registered for any events yet.</p>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
