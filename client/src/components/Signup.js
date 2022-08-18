import React from 'react'
import '../css/Signup.css'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Axios from 'axios';


const Signup = () => {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [NID, setNID] = useState("");
    const [phoneNumber, setphoneNumber] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    /************** VALIDATION START *****************/
    function validation() {
        let is_valid_name = nameValidation();
        let is_valid_email = emailValidation();
        let is_valid_NID = nidValidation();
        let is_valid_password = passwordValidation();
        let is_valid_phoenNumber = phoneNumberValidation();



        if (is_valid_name && is_valid_email && is_valid_NID && is_valid_password && is_valid_phoenNumber) {
            insertInfo();
        }
        else {
            alert("Invalid info")
        }
    }

    /* NAME VALIDATION */
    function nameValidation() {
        var isValid = true;
        if (name === "") {
            isValid = false;
        }
        return isValid;
    }
    /* EMAIL VALIDATION */
    function emailValidation() {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        let isValid = false;
        if (pattern.test(email)) {
            isValid = true;
        }
        else {
            isValid = false;
        }

        return isValid;
    }
    /* NID VALIDATION */
    function nidValidation() {
        let isValid = false;

        if (NID.length === 10) {
            isValid = true;
        }

        return isValid;

    }
    /* PHONE NUMBER VALIDATION */
    function phoneNumberValidation() {
        let isValid = false;

        if (phoneNumber.length === 11) {
            isValid = true;
        }

        return isValid;

    }

    /* PASSWORD VALIDATION */
    function passwordValidation() {
        let isValid = false;
        if (password === confirmPassword) {
            isValid = true;
        }
        return isValid;
    }
    /************** VALIDATION END *****************/


    /************** INSERTING DATA BEGIN ****************/
    function insertInfo() {
        Axios.post('http://localhost:3001/api/insert', { name: name, address: address, email: email, NID: NID, phoneNumber: phoneNumber, password: password }).then((response) => {
            let res = response.data.length; //if len == 0 duplicate data
            if (res === 0) {
                alert("You Data Already Exist")
            } else {
                alert("Signin Successful")
            }

        }).then(function () { window.location = "http://localhost:3000/"; });
    }
    /************** INSERTING DATA END *****************/

    return (
        <div className='SignUpbody'>

            <div className='SignUpTitleContainer'>
                Signup
            </div>



            <div className='SignUpForm'>

                <div className='nameContainer'><input class="form-control" type="text" name='name' placeholder='Name' onChange={(e) => { setName(e.target.value) }}></input></div>

                <div className='addressContainer'><input class="form-control" type="text" name='address' placeholder='Address (Area,District)' onChange={(e) => { setAddress(e.target.value) }}></input>
                </div>


                <div className='emailContainer'><input class="form-control" type="email" name='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}></input></div>
                <div className='NIDContainer' > <input class="form-control" type="number" name='NID' placeholder='10 digit NID Number' onChange={(e) => { setNID(e.target.value) }}></input></div>

                <div className='phoneNumberContainer' > <input class="form-control" type="number" name='phoneNumber' placeholder='Phone Number(11 digit)' onChange={(e) => { setphoneNumber(e.target.value) }}></input></div>

                <div className='passwordContainer'><input class="form-control" type="password" name='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }}></input></div>
                <div className='confirmPasswordContainer' ><input class="form-control" type="password" name='confirmPassword' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}></input></div>


                <div className="buttonContainer"><Button variant="outline-primary" size="sm" onClick={validation}>Signup</Button ></div>


            </div>

        </div>
    )
}

export default Signup