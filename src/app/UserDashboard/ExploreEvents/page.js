"use client"; 

import { useState, useEffect } from "react";
import UserLayout from "../UserLayout";

export default function ExploreEvents() {
    const [events, setEvents] = useState([]);
    const [myEvents, setMyEvents] = useState([]); 
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1); 
    const [userInfo, setUserInfo] = useState({ name: "", email: "", contact: "" }); 

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        const storedMyEvents = JSON.parse(localStorage.getItem("myEvents")) || [];
        setEvents(storedEvents);
        setMyEvents(storedMyEvents);
    }, []);

    const handleRegisterClick = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        setQuantity(1);
        setUserInfo({ name: "", email: "", contact: "" });
    };

    const handleRegister = () => {
        const updatedEvents = events.map((event) => {
            if (event.id === selectedEvent.id) {
                const updatedSold = (event.sold || 0) + parseInt(quantity, 10);
                return {
                    ...event,
                    sold: updatedSold,
                    tickets: event.tickets.map(ticket => ({
                        ...ticket,
                        sold: (ticket.sold || 0) + parseInt(quantity, 10)
                    }))
                };
            }
            return event;
        });

        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        const updatedMyEvents = [
            ...myEvents,
            { ...selectedEvent, userInfo, quantity }
        ];
        setMyEvents(updatedMyEvents);
        localStorage.setItem("myEvents", JSON.stringify(updatedMyEvents));

        alert(`Registered ${userInfo.name} (${userInfo.email}) for ${quantity} ticket(s) to ${selectedEvent.name}`);

        handleCloseModal();
    };

    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">Explore Events</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                                <img src={event.image || "/Images/WEB3.jpg"} alt={event.name} className="w-full h-48 object-cover rounded-t-lg" />
                                <h3 className="text-xl font-bold text-gray-900 mt-3 mb-2">{event.name}</h3>
                                <button
                                    className="bg-blue-950 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md w-full"
                                    onClick={() => handleRegisterClick(event)}
                                >
                                    Register
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-lg">No events available.</p>
                    )}
                </div>

                {isModalOpen && selectedEvent && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedEvent.name}</h2>
                            <p className="text-gray-600 mb-2"><strong>Date:</strong> {selectedEvent.date}</p>
                            <p className="text-gray-600 mb-2"><strong>Location:</strong> {selectedEvent.location}</p>
                            <p className="text-gray-600 mb-2"><strong>Organizer:</strong> {selectedEvent.organizer}</p>
                            <p className="text-gray-600 mb-2"><strong>Category:</strong> {selectedEvent.category}</p>
                            <p className="text-gray-600 mb-4"><strong>Description:</strong> {selectedEvent.description}</p>

                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                                <input
                                    type="text"
                                    value={userInfo.name}
                                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Contact Number</label>
                                <input
                                    type="text"
                                    value={userInfo.contact}
                                    onChange={(e) => setUserInfo({ ...userInfo, contact: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    min="1"
                                    max={selectedEvent.capacity - (selectedEvent.sold || 0)} 
                                    className="w-full p-2 border rounded-lg"
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 ease-in-out"
                                    onClick={handleCloseModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-all duration-300 ease-in-out"
                                    onClick={handleRegister}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
