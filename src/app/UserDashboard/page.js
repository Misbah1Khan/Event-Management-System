"use client";
import React from 'react'
import UserLayout from './UserLayout'

const page = () => {
    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100 py-10 px-4">
                <div className="container mx-auto">

                

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the User Dashboard</h1>
                        <p className="text-lg text-gray-600">
                            Our Event Management App helps you easily organize, manage, and attend events. Whether you're hosting a large conference or simply attending a workshop, our platform provides you with all the tools you need to make your event experience seamless and enjoyable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">My Events</h2>
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
                                        d="M3 10h2m4 0h12m-6 4h6M9 6h10M9 14h10m4 0v6m0 0H4m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V4a2 2 0 00-2-2H6a2 2 0 00-2 2v16"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-6">
                                View and manage your events. Keep track of the events you're organizing or attending.
                            </p>
                            <a
                                href="/UserDashboard/MyEvents"
                                className="inline-block px-6 py-2 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                Go to My Events
                            </a>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold text-gray-800">Explore Events</h2>
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
                                        d="M21 10V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v3M7 10V7a2 2 0 012-2h2a2 2 0 012 2v3m7 4v5m-5-5v5m-4-5v5m1-11h2a2 2 0 012 2v3m0 0a2 2 0 002 2h2a2 2 0 002-2V10"
                                    />
                                </svg>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Find new events to attend. Explore events that match your interests and preferences.
                            </p>
                            <a
                                href="/UserDashboard/ExploreEvents"
                                className="inline-block px-6 py-2 text-white bg-blue-950 rounded-lg hover:bg-blue-900 transition-colors"
                            >
                                Go to Explore Events
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default page