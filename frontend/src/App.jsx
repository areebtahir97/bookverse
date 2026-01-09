import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import BookDetails from './pages/BookDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyLibrary from './pages/MyLibrary.jsx'

function App() {


  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#f8f7f2]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book/:id' element={<BookDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/library' element={<ProtectedRoute><MyLibrary /></ProtectedRoute>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
