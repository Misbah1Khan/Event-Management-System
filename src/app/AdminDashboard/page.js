"use client";
import React from 'react'
import AdminLayout from './AdminLayout';
import Link from 'next/link';

const page = () => {
    return (
        <AdminLayout>
            <div className="min-h-screen bg-gray-100 py-10 px-4">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Admin Dashboard</h1>
                        <p className="text-lg text-gray-600">
                            Manage your events efficiently with our comprehensive dashboard. Here you can explore events, view and register all your existing events, and ensure a smooth event management experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">Add Event</h2>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-800"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Create a new event and add it to your event schedule. Provide all necessary details to ensure your event is a success.
                            </p>
                            <Link
                                href="/AdminDashboard/Add-Event"
                                className="inline-block px-6 py-2 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                Go to Add Event
                            </Link>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">All Events</h2>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-800"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 11h14M12 4l-4 4m0 0l4 4m-4-4h8"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-6">
                                View and manage all the events you have created. Edit event details, track attendance, and more.
                            </p>
                            <Link
                                href="/AdminDashboard/All-Event"
                                className="inline-block px-6 py-2 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                Go to All Events
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default page