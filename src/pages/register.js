import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // Import the Link component

export default function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/users/signup", {
        phone,
        password,
      });
      console.log(data);
      setMessage("Registration successful");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="p-6 bg-gray-100 rounded shadow-md"
        onSubmit={handleRegister}
      >
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </button>
        {message && <p className="mt-4 text-red-600">{message}</p>}
        <div className="mt-4">
          <p className="text-center text-sm text-gray-600">
            Ya tienes cuenta?{" "}
            <Link className="text-blue-500 hover:text-blue-700" href="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
