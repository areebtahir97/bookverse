import { useNavigate } from 'react-router'
import book_logo from '../assets/book.svg'
import '../index.css'
import { useEffect } from 'react'
import { Link } from 'react-router'
import {useAuth} from '../context/AuthContext.jsx'
import { useLocation } from "react-router-dom";

const Header = () => {
  const {user, setUser, setIsLoggedIn,isLoggedIn } = useAuth();
  const navigate = useNavigate();


   


  async function handleLogout() {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include", 
    });

    // reset frontend state
    setUser(null);
    setIsLoggedIn(false);

    navigate("/login");
  }

  return (
    <div className='flex items-center justify-between py-4 px-2'>
      <div className='flex items-center gap-1 cursor-pointer' onClick={()=>navigate('/')}>
          <img className='w-9 sm:w-8 ' src={book_logo} alt="" />
          <h1 className='pinyon-script-regular  text-4xl'>Bookverse</h1>
      </div>
        {!isLoggedIn ? (<div className='flex items-center gap-4 sm:gap-3'>
          <Link to={"/library"} className="text-gray-700 font-medium hover:text-black">My Library</Link>
                <Link to={'/login'} className='flex text-white items-center gap-2 bg-[#615DEC] px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>Login</Link>
                <Link to={'/signup'} className='flex  text-white items-center gap-2  bg-[#615DEC] px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'>Signup</Link>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          {isLoggedIn && (<span className="text-gray-600">Hi, {user?.username}</span>)}
          <Link to={"/library"} className="text-gray-700 font-medium hover:text-black">My Library</Link>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-full text-white hover:bg-red-600 transition">Logout</button>
        </div>
      )}
    </div>
  )
}

export default Header