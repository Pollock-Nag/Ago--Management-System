import React from 'react'
import NavBar from '../components/NavBar';
import Login from '../components/Login';
import Signup from '../components/Signup';
import "../css/HomePage.css"

import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div className='HomePageBody'>
            <>
                <NavBar></NavBar><br />
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <h3 class="animate-charcter"> Welcomr to Agro Management System</h3>
                        </div>
                    </div>
                </div>

                <br></br>
                <Container>

                    <Row>
                        <Col></Col>
                        <Col></Col>



                        <Col><Login></Login></Col>
                        <Col><Signup></Signup></Col>


                    </Row>
                </Container>
            </>

        </div>
    )
}

export default HomePage