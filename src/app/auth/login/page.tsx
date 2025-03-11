"use client";
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export default function Login() {
    // Handle Router    
    const router = useRouter();

    // Check if user is already logged in or not
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            router.push('/');
        }
    }, []);

    // Handle States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    
    // Handle Email Submit
    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowPassword(true); 
    };

    // Handle Login Submit
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //   login request
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .catch((error) => {
                console.error('Error:', error);
            });
        if (!res.success) {

            setWrongPassword(true);
        }
        // Set token in local storage and redirect to home page
        if (res.token) {
            localStorage.setItem('token', `bearer ${res.token}`);
            setWrongPassword(false);
            router.push('/home');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="p-8 rounded-lg shadow-lg bg-gray-800 w-full max-w-md">
                {!showPassword ? (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-white">Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 rounded border border-gray-400 bg-gray-700 text-white"
                                placeholder='Email'
                            />
                        </div>
                        <button type="submit" className="w-full p-3 rounded bg-blue-500 text-white font-bold cursor-pointer">Next</button>
                        <div className="mt-4 flex justify-between">
                            <button type="button" className="p-2 rounded border border-gray-400 bg-gray-700 text-white cursor-pointer">Login with Google</button>
                            <button type="button" className="p-2 rounded border border-gray-400 bg-gray-700 text-white cursor-pointer">Login with GitHub</button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <button type="button" onClick={() => setShowPassword(false)} className="p-2 rounded bg-gray-600 text-white font-bold cursor-pointer mb-4">Back</button>
                        {wrongPassword && <p className='text-red-300 py-2 text-center'>Wrong Credentials</p>}
                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-white">Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 rounded border border-gray-400 bg-gray-700 text-white"
                            />
                        </div>
                        <button type="submit" className="w-full p-3 rounded bg-blue-500 text-white font-bold cursor-pointer">Login</button>
                    </form>
                )}
            </div>
        </div>
    );
}
