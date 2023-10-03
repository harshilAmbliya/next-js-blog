"use client"

import React, { useState } from 'react';
// import { signUp } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const { toast } = useToast()
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        const data = { username, email, password }
        console.log(username, email, password);
        e.preventDefault();
        const res = await axios.post('/api/auth/register', {
            data
        })

        if (res.status === 201) {
            console.log("successfull craeted user");
            toast({
                description: `Hey , ${username} . You  Register successfully`
            });
            router.push("/login")
            setEmail('');
            setPassword('');
            setUsername('')
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="border border-gray-100 dark:border-zinc-800-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Register for Your Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your desired username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your desired Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Choose a password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <Button>Register</Button>
                </form>
            </div>
        </div>
    );
}

export default Register;
