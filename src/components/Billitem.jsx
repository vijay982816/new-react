import React, { useEffect } from 'react'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext.jsx'
import { toast } from 'react-toastify';

const Billitem = ({ name, billno, product, id, price }) => {

    const navigate = useNavigate()

    const { deleteUser, isLoggedIn, loggedInUser, logout, } = useContext(UserContext)

    const [isAdmin, setIsAdmin] = useState(null)

    // const checkAdmin = async () => {


    //     const checkLogin = await isLoggedIn()
    //     if (checkLogin.success) {



    //         if (checkLogin.role == 'admin') {
    //             setIsAdmin(true)
    //         }


    //     }

    // }



    const handleDelete = () => {


        deleteUser(id)

        toast.error('User deleted successfully', {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

    }


    useEffect(() => {
        // checkAdmin()

    }, [])


    return (
        <>


            <tr>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                                {name}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{billno}</p>
                </td>  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{product}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">{price}</p>
                </td>
                {

                    loggedInUser.role =='admin' && <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center md:text-left">

                        <button className=" my-1  px-3 py-1 font-semibold text-green-900 leading-tight bg-green-100 rounded-full " onClick={() => navigate(`updateuser/${id}`)}>

                            Update
                        </button>

                        <button className=" my-1  px-3 font-semibold text-red-900 leading-tight rounded-full bg-red-100 px-3 py-1 md:mx-2"
                            onClick={handleDelete}>

                            Delete
                        </button>


                    </td>

                }
            </tr>
        </>

    )
}

export default Billitem