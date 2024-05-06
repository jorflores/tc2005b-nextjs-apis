import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import the Link component

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/login', { username, password });
            localStorage.setItem('token', data.token);  // Store the token in localStorage
            setMessage('Login successful. Redirecting...');
            router.push('/');  // Redirect to homepage or dashboard as needed
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form className="p-6 bg-gray-100 rounded shadow-md" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
                {message && <p className="mt-4 text-red-600">{message}</p>}
                <div className="mt-4">
                    <p className="text-center text-sm text-gray-600">No tienes cuenta? <Link className="text-blue-500 hover:text-blue-700" href="/register">Crear cuenta</Link></p>
                </div>
            </form>
        </div>
    );
}
