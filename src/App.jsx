import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/Home.jsx';

import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer } from "react-toastify";
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AddBill from './components/AddBill.jsx';



export default function App() {


  return (
    <>



      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />


      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<AddBill />} />



        {/* 
        <  Route path="/updateuser/:id" element={<UpdateUser />} />

        <  Route path="/view/:id" element={<ViewProfile />} /> */}







      </Routes>

    </>

  )
}