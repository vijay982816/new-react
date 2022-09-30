import React from 'react'
import { useState } from 'react'
import UserContext from './UserContext.jsx'
import axios from 'axios';
const UsersStates = (props) => {

    const [localenv, setlocalEnv] = useState({ HOST: 'https://3010-vijay982816-backendcurd-6k5lcxb1x4m.ws-us69.gitpod.io' })

    const [users, setUsers] = useState([])

    // Geting all user
    const getUsers = async () => {
        // API Call 
        const response = await fetch(`${localenv.HOST}/api/users/getUsers`);

        const myjson = await response.json()
        setUsers(myjson)

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

                    const { success, authtoken, username } = response.data
                    return {
                        success, authtoken, username
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

                    const { success, authtoken, username } = response.data
                    return {
                        success, authtoken, username
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


    //update user 


    const updateUser = async (id, name, age, phone, uploadProfileImage) => {



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




    return (


        <UserContext.Provider value={{ registerUser, loginuser, updateUser, deleteUser, users, oneUser, getUsers, }}>



            {props.children}

        </UserContext.Provider>


    )
}

export default UsersStates;