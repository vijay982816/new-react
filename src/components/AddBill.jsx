import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext.jsx'
import { toast } from 'react-toastify';
import { useEffect } from 'react';


const AddBill = () => {





    const [bill, setBill] = useState({
        name: "",
        product: "",
        billno: "",
        price: ''



    })
    const [alert, setAlert] = useState({
        display: false,
        message: "Im your alert"


    })






    const onChange = (e) => {
        setBill({ ...bill, [e.target.name]: e.target.value })
    }


    const { addBill } = useContext(UserContext)


    const submitForm = async () => {


        console.log(bill)

        if (bill.name && bill.billno && bill.product && bill.price
        ) {


            if (bill.name.length <= 3) {

                setAlert({ message: 'Enter a Valid Name', display: true })
            }
            else if (bill.price <= 0) {


                setAlert({ message: 'Enter a valid price', display: true })


            }
            else if (bill.product.length <= 4) {


                setAlert({ message: 'Enter a vlid Product ', display: true })


            } else if (bill.billno.length <= 0) {


                setAlert({ message: 'Enter a valid bill no', display: true })


            }
            else {




                const response = await addBill(bill)







                if (response.success == true) {

                    await localStorage.setItem('authtoken', response.authtoken);
                    await localStorage.setItem('username', response.username);
                    await localStorage.setItem('role', response.role);


                    toast.success("Order successfully ", {
                        position: "top-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    setBill({
                        name: "",
                        product: "",
                        billno: "",
                        price: ''
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





            }





        } else {


            setAlert({ message: 'Please Enter Valid Details', display: true })


        }




    }



    const navigate = useNavigate()

    const handleCancel = () => {

        navigate('/')

    }


    const handleLogin = () => {
        navigate('/login')
    }







    return (


        <>



            <div >

                <div className={`py-12 bg-gray-700 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0  `} id="modal">




                    <div className={`bg-red-100 border mb-5 mx-auto w-11/12 md:w-2/3 max-w-lg border-red-400 text-red-700 px-4 py-3 rounded relative ${!alert.display ? 'hidden' : ''}`} role="alert">
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
                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 mb-10">Order Your item</h2>

                            </div>



















                            <form>





                                <input type={'text'} id="name" className="pmb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter Biller Name " value={bill.name} onChange={onChange} name='name' />


                                <input type={'text'} id="billno" className="pmb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter Your Bill no (mostly automatically generated ) " value={bill.billno} onChange={onChange} name='billno' />



                                <input type={'text'} id="product" className="pmb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Enter Product Name " value={bill.product} onChange={onChange} name='product' />


                                <input type={'number'} id="price" className="pmb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="price " value={bill.price} onChange={onChange} name='price' />





                                {/* 
                                <input type='password' id="password" className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border" placeholder="Password" value={user.password} onChange={onChange} name='password' autoComplete={user.password} /> */}


                            </form>










                            <div className="my-3 flex items-center justify-start w-full">
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onClick={submitForm}>Order</button>
                                <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onClick={handleCancel}>Cancel</button>
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

            </div >


        </>



    )
}

export default AddBill