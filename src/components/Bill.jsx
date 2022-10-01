import { useContext, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import UserContext from "../context/UserContext.jsx"


import { toast, ToastContainer } from 'react-toastify';
import Billitem from "./Billitem.jsx";

const Bill = () => {


    // const [bills, setBills] = useState([])

    const { getBills, loggedInUser, logout, isLoggedIn, bills } = useContext(UserContext)


    // const settingUser = () => {

    //     getBills();


    // }


    // const gettingBills = async () => {


    //     getBills();



    //     // if (loggedInUser) {

    //     //     if (loggedInUser.islogin) {
    //     //         console.log('gettingBills in')
    //     //         const response = await getBills()

    //     //         // console.log(response)

    //     //         setBills(response)

    //     //         // console.log(bills);

    //     //     }
    //     //     else {
    //     //         setBills([])
    //     //     }




    //     // }





    // }









    useEffect(() => {


         

        getBills();

        // settingUser()

    }, [])


    return (
        <>


            {
                // console.log(bills)
            }

            {

                !loggedInUser.islogin ? <h1 className="p-16" >Please login to see Bills / Orders </h1> : bills.length > 0 ? <div className="antialiased font-sans bg-gray-200">
                    <div className="container mx-auto px-4 sm:px-8">


                        <div className="py-8 lg:px-20">
                            <div>
                                <h2 className="text-2xl font-semibold leading-tight">Bills</h2>
                            </div>

                            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                    <table className="min-w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Biller Name
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Bill No.
                                                </th>

                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Product Name
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                    Price
                                                </th>
                                                {loggedInUser.role == "admin" && <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                                                    Actions
                                                </th>

                                                }


                                            </tr>
                                        </thead>
                                        <tbody>


                                            {bills.map((element) => {








                                                return <Billitem key={element._id} id={element._id} name={element.name} billno={element.billno} product={element.product} price={element.price} />
                                            }

                                            )

                                            }

                                        </tbody>
                                    </table>



                                    {



                                        loggedInUser.role == "admin" && <div
                                            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">

                                            <div className="inline-flex mt-2 xs:mt-0">
                                                <button
                                                    className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">



                                                    <Link to="/Order">Order Now</Link>


                                                </button>





                                            </div>
                                        </div>



                                    }





                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                    : <h1 className="pl-10">You didn't orderd anything </h1>
            }



            {/* 
                    // : <div className="text-center">
                    //     <h1 className="text-gray-900 whitespace-no-wrap mx-auto text-center">No bills Avilable</h1>
                    // </div> */}












        </>


    )
}

export default Bill;