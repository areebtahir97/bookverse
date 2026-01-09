import React from 'react'
import '../index.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { API_BASE_URL } from '../../../server/configs/api'

const Signup = () => {
  const navigate=useNavigate()
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // redirect to login
      navigate("/login");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  
  
  }


  return (
     <div className="flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        
        <h2 className=" bg-white pinyon-script-regular text-4xl text-gray-500 font-semibold text-center">Create an Account</h2>
        <p className=" bg-white text-sm text-gray-500 text-center mt-2">
          Join BookVerse and start tracking your reading
        </p>
        {error && (
                  <p className="text-red-500 text-sm text-center mt-4">{error}</p>
                )}
        <form onSubmit={handleSignup} className=" bg-white mt-8 space-y-5">
          <div className=' bg-white'>
            <label className=" bg-white block text-sm font-medium mb-1">Name</label>
            <input
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              type="text"
              placeholder="Your name"
              className=" bg-white w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className=' bg-white'>
            <label className=" bg-white block text-sm font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              className=" bg-white w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className=' bg-white'>
            <label className=" bg-white block text-sm font-medium mb-1">Password</label>
            <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              className=" bg-white w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
          
            type="submit"
            className="w-full mt-4 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className=" bg-white text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to={'/login'} className=" bg-white text-blue-600 cursor-pointer">Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Signup