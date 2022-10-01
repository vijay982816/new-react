import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext.jsx'
import { toast } from 'react-toastify';


const Login = () => {


    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: "",
        role: "user"


    })

    const [alert, setAlert] = useState({
        display: false,
        message: "Im your alert"


    })






    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const { loginuser, isLoggedIn } = useContext(UserContext)


    const submitForm = async () => {


        console.log(user)



        if (user.email && user.password && user.role) {


            if (user.email.length <= 7) {

                setAlert({ message: 'Enter a valid email', display: true })
            }
            else if (user.password.length < 7) {


                setAlert({ message: 'Enter a valid Password', display: true })


            }

            else {





                const response = await loginuser(user)



                if (response.success == true) {

                    await localStorage.setItem('authtoken', response.authtoken);
                    await localStorage.setItem('username', response.username);
                    await localStorage.setItem('role', response.role);


                    await isLoggedIn()

                    toast.success("Logged in successfully", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    setUser({
                        email: "",
                        password: "",
                        role: "",

                    })



                    setTimeout(() => {
                        navigate('/')
                    }, 1000);

                }
                else {
                    toast.error(response.message, {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }






                // navigate('/')




            }


        } else {

            await isLoggedIn()
            setAlert({ message: 'Please Fill All Fields', display: true })


        }









    }




    const handleCancel = () => {

        navigate('/')

    }


    const handleRegister = () => {
        navigate('/register')
    }







    return (


        <>



            <div >

                <div className={`py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0  `} id="modal">




                    <div className={`bg-red-100 border mb-5 mx-auto w-11/12 md:w-2/3 max-w-lg border-red-400 text-red-700 px-4 py-3 rounded relative ${!alert.display ? 'hidden' : ''}`} role="alert"


                    >
                        <strong className="font-bold">{alert.message}</strong>
                        {/* <span className="block sm:inline">Something seriously bad happened.</span> */}
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3"

                            onClick={() => setAlert({ ...alert, display: false })}
                        >
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div>







                    <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
                        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                            <div>
                                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 mb-10">Sign in to your account</h2>

                            </div>


                            <ul className="grid gap-6 w-full grid-cols-2 mb-6"

                                onChange={(event) => {


                                    setUser({ ...user, [event.target.name]: event.target.value })

                                }
                                }


                            >



                                < li >
                                    <input type="radio" id="local" name="role" value="user" className="hidden peer" required=""
                                        defaultChecked={true}

                                    />
                                    <label htmlFor="local" className="inline-flex justify-between items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-indigo-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="mx-auto">

                                            Local
                                        </div>

                                    </label>
                                </li>
                                <li>
                                    <input type="radio" id="admin" name="role" value="admin" className="hidden peer"


                                    />
                                    <label htmlFor="admin" className="inline-flex justify-between items-center p-2 w-full text-gray-500 bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-indigo-600 peer-checked:text-white hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 " >
                                        <div className="mx-auto " >

                                            admin
                                        </div>

                                    </label>
                                </li>
                            </ul>







                            <form>



                                <input type={'email'} id="email" className="pmb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter Your Email " value={user.email} onChange={onChange} name='email' />



                                <input type='password' id="password" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Password" value={user.password} onChange={onChange} name='password' autoComplete={user.password} />


                            </form>













                            <div className="flex items-center justify-start w-full">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={submitForm}>Sign-in</button>
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={handleRegister}>Register</button>
                            </div>
                            <button className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onClick={handleCancel} aria-label="close modal" role="button">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        </>



    )
}

export default Login