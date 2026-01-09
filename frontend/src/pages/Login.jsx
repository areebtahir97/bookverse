import { Link, useNavigate } from 'react-router'
import '../index.css'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const Login = () => {
  const navigate=useNavigate()
  const {setUser,setIsLoggedIn}=useAuth()

  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault()
    setError("")
  

  try {
    const res=await fetch("http://localhost:3000/api/login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      credentials:"include",
      body:JSON.stringify({email,password})
    })

    const data=await res.json()

    if (!res.ok){
      setError(data.message)
    }

    //update global state
    setUser(data.user)
    setIsLoggedIn(true)

    //navigate to home
    navigate('/')
  } catch (error) {
    setError("Something went wrong. Please try again.");
  }
  }
  return (
    <div className='flex items-center justify-center px-6 py-20 '>
        <div className='w-full max-w-md bg-white rounded-xl shadow-md p-8'>
            <h2 className='bg-white pinyon-script-regular text-4xl font-semibold text-gray-500 text-center mt-2'>Welcome Back</h2>
            <p className='bg-white  text-sm text-gray-500 text-center mt-2'>
                Login to continue to Bookverse
            </p>
            {error && (
              <p className="text-red-500 text-sm text-center mt-4">{error}</p>
            )}
            <form onSubmit={handleLogin} className=" bg-white mt-8 space-y-5">
          <div className='bg-white'>
            <label className="bg-white block text-sm font-medium mb-1">Email</label>
            <input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="you@example.com"
              className="bg-white w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className='bg-white'>
            <label className="bg-white block text-sm font-medium mb-1">Password</label>
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="••••••••"
              className="bg-white w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="bg-white text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to={'/signup'} className="bg-white text-blue-600 cursor-pointer">Sign up</Link>
        </p>

        </div>
    </div>
  )
}

export default Login