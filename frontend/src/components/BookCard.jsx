import React from 'react'
import { useNavigate } from 'react-router'


const BookCard = ({book}) => {
    const navigate=useNavigate()
    function handleClick(){
        navigate(`/book/${book.id}`,{state:{book}})
    }
  return (
    <div  className="
        bg-white 
        rounded-xl 
        shadow-md 
        p-3 
        cursor-pointer
        transition-all 
        duration-300 
        hover:-translate-y-1 
        hover:shadow-lg
      " onClick={handleClick}
       >
      
      <img
        src={book.cover}
        alt={book.title}
        className=" bg-white w-full h-56 object-contain rounded-lg"
      />

      <div className="mt-3 bg-white">
        <h3 className=" bg-white text-sm font-semibold">
          {book.title}
        </h3>

        <p className=" bg-white text-xs text-gray-500 mt-1">
          {book.author}
        </p>
      </div>

    </div>
  )
}

export default BookCard