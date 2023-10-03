"use client"

import React, { useState } from 'react';
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
        const user = await signIn('credentials', {
            redirect: false,
            username, password
        })
        console.log(user)
        if (user.error === null) {
            router.push('/')
        }

    };

    return (
        <div className=" min-h-screen flex items-center justify-center">
            <div className=" border border-gray-100 dark:border-zinc-800-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Login to Your Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block  text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    {/* <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Login
                    </button> */}
                    <Button>LogIn</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
