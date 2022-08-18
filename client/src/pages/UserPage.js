import React from 'react'
import { useParams } from "react-router-dom";
import Cards from "../components/Cards";
import { useState } from 'react'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Card, CardGroup, Collapse } from 'react-bootstrap';
import Weather from '../components/Weather';
import "../css/UserPage.css"

const UserPage = () => {
    const { nid } = useParams();
    const [userName, setUserName] = useState("");
    const [productList, setProductList] = useState([]);
    const [searchProductList, setSearchProductList] = useState([]);

    const [queryQuestion, setQueryQuestion] = useState('');
    const [searchProduct, setSearchProduct] = useState('');

    const [cartProduct, setCartProduct] = useState([]);

    let total = 0
    //Detecting unauthorized login
    function fetchUser() {

        Axios.post('http://localhost:3001/api/getUserAdmin', { nid: nid }).then((response) => {


            if (response.data.length === 0) {
                window.location = "http://localhost:3000/"
                alert("Unauthorized Login")

            }
            else {
                let input_email = response.data[0].email
                if (input_email.includes("adminpanel")) {
                    window.location = "http://localhost:3000/"

                    alert("Unauthorized Login")
                } else {
                    setUserName(response.data[0].name)
                }
            }

        });
    }




    function logout() {
        localStorage.clear();
        window.location.href = 'http://localhost:3000';
    }

    function showcards(element) {

        return (

            <Cards
                key={element.id}
                count={element.count}
                description={element.details}
                imgsrc={element.image}
                title={element.name}
                price={element.price}
                nid={parseInt(nid)}


            />


        );

    }
    function search() {

        Axios.post('http://localhost:3001/api/productSearch', { searchProduct: searchProduct }).then((response) => {

            setSearchProductList(response.data);
        })

    }

    function showAll() {
        Axios.post('http://localhost:3001/api/productShowall').then((response) => {

            setProductList(response.data);
        })


    }

    function minimize() {
        window.location = "http://localhost:3000/user/" + nid
    }

    function showQueries() {
        //document.getElementById('queries').innerHTML = "Hello"
        Axios.post('http://localhost:3001/api/queriesShow').then((response) => {

            for (var i = 0; i < response.data.length; i++) {

                var result = document.createElement('p')

                var id = String(response.data[i].id);
                var que = response.data[i].question;
                var ans = response.data[i].answer;
                var format = "Query ID: " + id + " || Question: " + que + " || Reply: " + ans


                var newResult = document.createTextNode(format)
                result.appendChild(newResult)

                document.getElementById("queriesOutput").appendChild(result);


            }

            document.getElementById("showQueryButton").disabled = true;

        }
        )
    }

    function submitQuestion() {
        if (queryQuestion !== "") {
            Axios.post('http://localhost:3001/api/queryQuestion', { queryQuestion: queryQuestion }).then((response) => {

                let res = response.data.affectedRows; //if len == 0 duplicate data
                if (res === 0) {
                    alert("An Error Occur")
                } else {
                    alert("Query Successful")
                }

            })
        } else {
            alert("Empty Question Box")
        }


        //.then(window.location = "http://localhost:3000/admin/" + nid)

    }

    function showCart() {

        Axios.post('http://localhost:3001/api/cartShow', { nid: parseInt(nid) }).then((response) => {

            setCartProduct(response.data)
            for (var i = 0; i < response.data.length; i++) {
                total += response.data[i].productcost

            }


            document.getElementById("total_amount").innerHTML = total
            //document.getElementById("showCartButton").disabled = true;


        }
        )

    }
    function cartRemove() {
        let id = parseInt(prompt("Enter Product ID"))

        Axios.post('http://localhost:3001/api/cartRemove', { nid: parseInt(nid), id: id }).then((response) => {


            let res = response.data.affectedRows; //if len == 0 duplicate data
            if (res === 0) {
                alert("An Error Occur")
            } else {
                alert("Remove Successful")
            }
            window.location = "http://localhost:3000/user/" + nid


        }
        )

    }
    function payment() {
        let peyment_method = parseInt(prompt("Press 1 for Bkash Payment || Press 2 for Card payment"))
        let success = false
        let is_invalid = false
        if (peyment_method === 1) {
            let phone = prompt("enter Bkash account number");

            if (String(phone).length === 11) {
                let pin = prompt("enter pin number");
                success = true;
            }
        }
        else if (peyment_method === 2) {
            let card = prompt("enter 16 digit card number");
            if (String(card).length === 16) {
                let pin = prompt("enter pin number");
                success = true;
            }
        }
        else {
            is_invalid = true
            alert("Invalid Input Payment Failed");
        }
        if (is_invalid === false) {
            if (success) {

                Axios.post('http://localhost:3001/api/cartRemoveAll', { nid: parseInt(nid) }).then((response) => {


                    let res = response.data.affectedRows; //if len == 0 duplicate data
                    if (res === 0) {
                        alert("An Error Occur")
                    } else {
                        alert("Payment Successful")
                    }
                    window.location = "http://localhost:3000/user/" + nid


                }
                )
            }
            else {
                alert("Unsuccessful Payment");
            }

        }


    }


    return (

        <div className='UserPageBody'>
            {fetchUser()}


            <div className="signout_button">
                <Button onClick={logout} variant="outline-primary" size="sm">Sign out</Button>

            </div>

            <h3>Welcome {userName} !</h3>
            <br /><br /><br />
            <Row>
                <Col><div className='SearchProducts'>
                    <h3> Search Products </h3>
                    <div className='form'>


                        <div className="searchProductContainer"><input class="form-control" type="url" name="searchProduct" placeholder=" Product Name" className="searchProduct" onChange={(e) => setSearchProduct(e.target.value)} />
                        </div>


                        <div className="buttonContainer">
                            <Button variant="outline-success" size="sm" onClick={search} >Search</Button>
                            <Button variant="outline-danger" onClick={minimize} size="sm">Minimize</Button>
                        </div>
                    </div>

                </div></Col>
                <Col><h3>Search Item</h3>
                    <div className="showProduct">
                        {searchProductList.map(showcards)}

                    </div></Col>
                <Col><div className="showCart">
                    <h3>Cart</h3>
                    <div class="btn-group" role="group" aria-label="First group">

                        <Button id="showCartButton" onClick={showCart} variant="outline-success" size="sm">Show Cart</Button>
                        <Button variant="outline-danger" onClick={minimize} size="sm">Minimize</Button>
                    </div>

                    <br></br><br></br>
                    <div id='showCartOutput'>
                        <Row>
                            <Col>
                                <h3>ID</h3>
                            </Col>
                            <Col>

                                <h3>Name</h3>
                            </Col>
                            <Col>
                                <h3>Price</h3>
                            </Col>
                            <Col></Col>
                            <Col></Col>


                        </Row>

                        {cartProduct.map((val, key) => {
                            return (
                                <div key={key}>
                                    <Row>
                                        <Col>

                                            <h5>{val.id}</h5>
                                        </Col>
                                        <Col>

                                            <h5>{val.productname}</h5>
                                        </Col>
                                        <Col>
                                            <h5>{val.productcost
                                            }</h5>
                                        </Col>

                                        <Col>
                                            <h5><Button variant="outline-danger" onClick={cartRemove} size="sm">Remove</Button></h5>
                                        </Col>
                                        <Col></Col>



                                    </Row>


                                </div>
                            )
                        })}
                        <br />
                        <Row>
                            <Col>
                                <h3></h3>
                            </Col>
                            <Col>

                                <h3>Total</h3>
                            </Col>
                            <Col>
                                <h3 id='total_amount'> </h3>
                            </Col>
                            <Col>
                                <h5><Button variant="outline-info" onClick={payment} size="sm"> Payment</Button></h5>
                            </Col>
                            <Col></Col>



                        </Row>
                    </div>

                </div></Col>

            </Row>

            <br /><br />
            <div>
                <Row>
                    <Col>
                        <div className="askQueries">
                            <h3>Ask Queries</h3>
                            <div className='form'>


                                <div className="queryIdContainer">


                                    <input class="form-control" type="url" name="queryQuestion" placeholder=" Your Question" className="queryQuestion" onChange={(e) => setQueryQuestion(e.target.value)} />


                                </div>


                                <div className="buttonContainer">
                                    <Button variant="outline-primary" size="sm" onClick={submitQuestion} >Ask</Button>
                                </div>
                            </div>


                        </div>
                    </Col>
                    <Col>
                        <div className="showQueries">
                            <h3>Queries And Reply</h3>
                            <div class="btn-group" role="group" aria-label="First group">

                                <Button id="showQueryButton" onClick={showQueries} variant="outline-success" size="sm">Show Queries</Button>
                                <Button variant="outline-danger" onClick={minimize} size="sm">Minimize</Button>
                            </div>

                            <br></br><br></br>
                            <div id='queriesOutput'></div>

                        </div>
                    </Col>
                    <Col><div>
                        <Weather />
                    </div></Col>
                </Row>
            </div>


            <br /><br /><br />
            <h3>All Products</h3>
            <div className="showProduct">
                {showAll()}
                <br></br>

                {productList.map(showcards)}



            </div>










        </div >
    )
}

export default UserPage