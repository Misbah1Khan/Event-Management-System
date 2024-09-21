"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function Home() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); 
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email === "admin@example.com" && password === "admin123" && role === "admin") {
      localStorage.setItem("userType", "admin");
      router.push("/AdminDashboard");
    } else if (email === "user@example.com" && password === "user123" && role === "user") {
      localStorage.setItem("userType", "user");
      router.push("/UserDashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded-l-lg transition duration-300 ${
              role === "user" ? "bg-blue-950 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-2 rounded-r-lg transition duration-300 ${
              role === "admin" ? "bg-blue-950 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Admin
          </button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-950 text-white w-full py-2 rounded-lg hover:bg-blue-900 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
