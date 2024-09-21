import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType'); 
    const isLoggedIn = !!storedUserType;

    if (isLoggedIn) {
      setUserType(storedUserType);
      setIsAuthenticated(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userType');
    setUserType(null);
    setIsAuthenticated(false);
    router.push('/'); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-950 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">

          <Link href="/AdminDashboard" className="text-2xl font-bold">
          EventSphere
          </Link>

          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          <nav className="hidden lg:flex space-x-8">
            <Link href="/AdminDashboard/Add-Event" className="no-underline text-lg text-white hover:text-gray-300 transition duration-300">
              Add Event
            </Link>
            <Link href="/AdminDashboard/All-Event" className="no-underline text-lg text-white hover:text-gray-300 transition duration-300">
              All Events
            </Link>
          </nav>

          {isAuthenticated && (
            <div className="hidden lg:flex items-center space-x-4 text-lg">
              <div>{userType === 'admin' ? 'Admin' : 'User'}</div>
              <button
                onClick={handleSignOut}
                className="text-red-500 hover:text-red-700 transition duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {isOpen && (
          <nav className="lg:hidden mt-4">
            <Link href="/AdminDashboard/Add-Event" className="block text-lg text-white py-2 hover:bg-gray-700 transition">
              Add Event
            </Link>
            <Link href="/AdminDashboard/All-Event" className="block text-lg text-white py-2 hover:bg-gray-700 transition">
              All Events
            </Link>
            {isAuthenticated && (
              <>
                <div className="block text-lg text-white py-2">
                  {userType === 'admin' ? 'Admin' : 'User'}
                </div>
                <button
                  onClick={handleSignOut}
                  className="block text-lg text-red-500 py-2 hover:bg-gray-700 transition"
                >
                  Sign Out
                </button>
              </>
            )}
          </nav>
        )}
      </header>

      <main>{children}</main>
    </div>
  );
}
