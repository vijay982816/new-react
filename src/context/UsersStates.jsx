import React from 'react'
import { useState, useEffect } from 'react'
import UserContext from './UserContext.jsx'
import axios from 'axios';
const UsersStates = (props) => {

    const [localenv, setlocalEnv] = useState({ HOST: 'https://3010-vijay982816-backendcurd-6k5lcxb1x4m.ws-us67.gitpod.io' })

    const [loggedInUser, setloggedInUser] = useState({})
    const [bills, setBills] = useState([])





    // checking user is login or not

    const isLoggedIn = async () => {


        console.log('is loggedin start');

        const authtoken = await localStorage.getItem('authtoken');
        const username = await localStorage.getItem('username');
        const role = await localStorage.getItem('role')

        console.log(authtoken, username, role)


        if (authtoken && username && role) {


            console.log('in loggedin true');
            setloggedInUser({
                islogin: true,
                username: username,
                role: role
            })
            console.log(loggedInUser)


        } else {
            console.log('in loggedin false');
            setloggedInUser({
                islogin: false,
                username: username,
                role: role
            })
            console.log(loggedInUser)

        }







        console.log('is loggedin end');
    }


    const logout = async () => {

        try {

            console.log('logout start')


            await localStorage.removeItem("authtoken");
            await localStorage.removeItem("username");
            await localStorage.removeItem("role")




            setloggedInUser({
                islogin: false,
                role: "",
                username: ''

            })





            console.log('logout end', loggedInUser)
        } catch (error) {
            console.log(error)
        }

    }



    //one user find 


    const oneUser = async (id) => {

        // API Call 

        const response = await fetch(`${localenv.HOST}/api/users/getuser/${id}`);
        const myjson = await response.json()

        return myjson
    }

    // Registering a user 
    const registerUser = async (user) => {



        if (user.role == 'admin') {

            const url = `${localenv.HOST}/admin/register`

            const config = {

                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }


            }



            const registredUser = await axios.post(url, user, config)

                .then(response => {

                    const { data, message } = response;
                    return message;
                })

                .catch(async (error) => {

                    const message = await error.response.data.error
                    return message

                })




            return registredUser

        }
        else {


            const url = `${localenv.HOST}/user/register`

            const config = {

                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }


            }



            const registredUser = await axios.post(url, user, config)

                .then(response => {

                    const { data, message } = response;
                    return message;
                })

                .catch(async (error) => {

                    const message = await error.response.data.error
                    return message

                })




            return registredUser




        }
    }



    //login user 

    const loginuser = async (user) => {


        if (user.role == 'admin') {

            const url = `${localenv.HOST}/admin/login`

            const config = {

                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }


            }



            const logedinUser = await axios.post(url, user, config)

                .then(response => {

                    const { success, authtoken, username, role } = response.data
                    return {
                        success, authtoken, username, role
                    };
                })

                .catch(async (error) => {

                    const { data } = await error.response

                    return {
                        message: data.error,
                        success: data.success
                    }

                })




            return logedinUser

        }
        else {


            const url = `${localenv.HOST}/user/login`

            const config = {

                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }


            }



            const registredUser = await axios.post(url, user, config)

                .then(response => {

                    console.log(response)

                    const { success, authtoken, username, role } = response.data
                    return {
                        success, authtoken, username, role
                    };
                })

                .catch(async (error) => {

                    const { data } = await error.response

                    return {
                        message: data.error,
                        success: data.success
                    }

                    // return error.response.data

                })




            return registredUser




        }




    }



    // Geting all Bills
    const getBills = async () => {


        console.log('get bills is working ')


        if (loggedInUser.islogin){


            const Allbills = await fetch(`${localenv.HOST}/bill/getallbills`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "authtoken": localStorage.getItem('authtoken')
                }
            })
                .then(async response => {

                    const myresinjson = await response.json()
                    setBills(myresinjson)
                    return myresinjson;
                })

                .catch(async (error) => {


                    return error;


                })


            // console.log(Allbills)


            return Allbills

        }


      











    }


    //add bill /Order  
    const addBill = async (bill) => {




        const url = `${localenv.HOST}/bill/generatebill`


        const config = {

            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }


        }



        const addedBill = await axios.post(url, bill, config)

            .then(async (done) => {

                const { data, message } = await done.data




                console.log('added bill is ', data)
                console.log(typeof data)

                // console.log('old bills ', bills)
                const newbills = await bills.concat(data)

                console.log("new bills ", newbills);

                // setBills(newbills)
                // console.log('new bills ', bills)

                return {
                    success: true,
                    data: data,
                    message
                };



            })
            .catch(async (error) => {

                const { data } = await error.response

                return {
                    message: data.error,
                    success: false
                }

                // return error.response.data

            })

        console.log('addedbill is ', addedBill)




        return addedBill










    }


    // updating bill 

    const updateBill = async (id, name, age, phone, uploadProfileImage) => {



        const updatedUsers = await users.filter((user) => { return user._id !== id })
        const updatedUsers2 = updatedUsers.concat(response.data.data)
        setUsers(updatedUsers2)

        const formdata = new FormData();

        formdata.append("name", name)
        formdata.append("age", age)
        formdata.append("phone", phone)
        formdata.append("uploadProfileImage", uploadProfileImage)


        const url = `${localenv.HOST}/api/users/updateuser/${id}`

        const config = {

            headers: {
                "Content-Type": "multipart/form-data",
            }


        }





        const response = await axios.put(url, formdata, config)
            .catch(error => console.log(error.message))





        return response.data.message

    }

    //deleting user

    const deleteUser = async (id) => {



        const newUsers = await users.filter((user) => { return user._id !== id })
        setUsers(newUsers)


        const url = `${localenv.HOST}/api/users/deleteuser/${id}`

        const response = await axios.delete(url)
            .catch(error => console.log(error.message))






        return response.data.message
    }

    // useEffect(() => {

    //     isLoggedIn()

    // }, [])



    return (


        <UserContext.Provider value={{ registerUser, loginuser, getBills, isLoggedIn, deleteUser, loggedInUser, logout, oneUser, bills, addBill }}>



            {props.children}

        </UserContext.Provider>


    )
}

export default UsersStates;