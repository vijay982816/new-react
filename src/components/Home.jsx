import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState, useContext } from 'react'
import Bill from "./Bill.jsx";
import Header from "./Header.jsx";
import UserContext from "../context/UserContext.jsx";

const Home = () => {


    const { isLoggedIn} = useContext(UserContext)

    useEffect(() => {

        isLoggedIn()
    }, [])

    return (
        <>


            <Header />



            <Bill />





        </>


    )
}

export default Home;