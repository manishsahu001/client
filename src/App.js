import React from 'react'
import PostState from './context/PostState';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import AddPost from './components/AddPost';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';


const App = () => {
  return (
    <>
    <div style={{backgroundColor: "#f3fbfe", minHeight: "100vh"}}>
    <PostState>
      <BrowserRouter>
      <Sidebar />
      <ToastContainer />
    <div className='container'>
      <Routes>
        <Route exact path='/' element={<Home />}/>
        {/* <Route exact path='/profile' element={<Profile />}/> */}
        <Route exact path='/addpost' element={<AddPost />} />
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/signup' element={<Signup />}/>
      </Routes>
    </div>
      </BrowserRouter>
      
    </PostState>
    </div>
    </>
  )
}

export default App
