"use client";
import Image from "next/image";
import logo from "../assets/logo.png"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const  token  =  localStorage.getItem('token') ;
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (token) {
      setShowLogout(true);
    } else {
      setShowLogout(false);
    }
  }, [token]);

  const handleLogOut = () => {
    localStorage.removeItem('token'); 
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <nav className="flex justify-between items-center p-4">
        <div className="text-white text-lg font-bold">
          <Image alt="Logo" src={logo} width={50} height={50} />
        </div>
        <div>
          {
            showLogout ? <button onClick={handleLogOut} className="cursor-pointer bg-red-500 text-white rounded-full px-4 py-2 mr-2">
              Log Out
            </button> : <div>
              <button className="bg-white text-black rounded-full px-4 py-2 mr-2">
                <Link href={'/auth/login'} >Login</Link>
              </button>
              <button className="bg-black text-white rounded-full px-4 py-2">
                <Link href={'/auth/register'} >Sign Up</Link>
              </button>
            </div>
          }
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg mb-4">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <div className="flex flex-col sm:flex-row">
          <button className="bg-blue-500 text-white rounded-full px-6 py-3 mb-2 sm:mb-0 sm:mr-2">
            <Link href={'/home'} >Get Started</Link>
          </button>
          <button className="bg-gray-500 text-white rounded-full px-6 py-3">Learn More</button>
        </div>
      </div>
      <footer className="text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 AutoQuil. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
