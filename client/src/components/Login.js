import React from 'react'
import '../css/Login.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState("");
    const [NID, setNID] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();


    function fetchUser() {

        Axios.post('http://localhost:3001/api/getUser', { email: email, NID: NID, password: password }).then((response) => {
            let res = response.data[0]
            console.log(response)

            if (response.data.length === 0) {
                alert("Incorrect Info")
            } else {
                if (response.data[0].email == email && response.data[0].nid == NID) {
                    let input_email = response.data[0].email
                    let input_userid = response.data[0].id
                    let input_nid = response.data[0].nid
                    //alert("Login Success")
                    //console.log( input_email + "," + input_userid + "," + input_nid)
                    if (input_email.includes("adminpanel")) {

                        alert("ADMIN LOGIN SUCCESSFUL")
                        navigate('/admin/' + String(input_nid))


                    }
                    else {
                        alert("USER LOGIN SUCCESSFUL")
                        navigate('/user/' + String(input_nid))
                    }

                }
                else {
                    //reload this page
                }
            }

        });
    }

    return (
        <div className='Loginbody'>

            <div className='LoginTitleContainer'>
                Login
            </div>



            <div className='LoginForm'>


                <div className='emailContainer'><input class="form-control" type="email" name='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}></input></div>
                <div className='NIDContainer' > <input class="form-control" type="number" name='NID' placeholder='NID' onChange={(e) => { setNID(e.target.value) }}></input></div>

                <div className='passwordContainer'><input class="form-control" type="password" name='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }}></input></div>



                <div className="buttonContainer" onClick={fetchUser}><Button variant="outline-primary" size="sm" >Login</Button></div>


            </div>

        </div>
    )
}

export default Login
