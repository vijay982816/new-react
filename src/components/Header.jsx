import { Link } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState, useContext } from 'react'
import UserContext from "../context/UserContext.jsx";

const Header = () => {





    // const [user, setUser] = useState({
    //     islogin: false,
    //     role: "",
    //     username: ''

    // })


    // const settingUser = async () => {


    //     const response = await isLoggedIn()
    //     // console.log(response)
    //     setUser(response)

    // }







    const { loggedInUser, logout, isLoggedIn } = useContext(UserContext)

 
    const handleLogout = async () => {


         await logout()



    }


    // useEffect(() => {

    //     isLoggedIn()

    // }, [])

    return (
        <>


            <header className="text-gray-600 body-font bg-gray-300">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Admin&Local User</span>
                    </a>



                    {

                        loggedInUser.islogin ?
                            <div className="flex items-center space-x-4 md:ml-auto">
                                <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleLogout}>

                                    Logout
                                </button>

                                <div className="font-medium dark:text-white text-black">
                                    <div className='bg-white px-5 py-2'>


                                        <h1>{loggedInUser.username}</h1>
                                    </div>

                                </div>

                                <svg className="border-2 w-10 h-10 p-3 bg-white rounded-full border-gray-500 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>

                            </div>
                            : <div className="md:ml-auto">

                                <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">

                                    <Link to='/login'>Login</Link>
                                </button>

                                <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">


                                    <Link to='/register'>Register</Link>
                                </button>

                            </div>

                    }


                </div>
            </header>


        </>

    )
}

export default Header