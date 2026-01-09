import React from 'react'

const BookSearch = ({value,onChange,onSearch}) => {
  return (
    <div className="flex items-center gap-3 max-w-3xl mx-auto">
        <input type="text" placeholder='Search books by title or author...' value={value} onChange={(e)=>onChange(e.target.value)}  className="flex-1 px-5 py-3 bg-white rounded-full border outline-none focus:ring-2 focus:ring-blue-400 "/>
        <button onClick={onSearch} className='px-6 py-3 rounded-full text-white bg-blue-500 hover:bg-blue-600 transition' >Search</button>
    </div>
  )
}

export default BookSearch