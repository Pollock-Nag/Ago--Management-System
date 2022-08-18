import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import Cards from "../components/Cards";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../css/AdminPage.css"

import { useParams } from "react-router-dom";
const AdminPage = () => {
    let { nid } = useParams();
    let navigate = useNavigate();
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [count, setCount] = useState('');
    const [image, setImage] = useState('');

    const [productList, setProductList] = useState([]);

    const [queryId, setQueryId] = useState('');
    const [queryReply, setQueryReply] = useState('');





    //Detecting unauthorized login
    function fetchUser() {

        Axios.post('http://localhost:3001/api/getUserAdmin', { nid: nid }).then((response) => {


            if (response.data.length == 0) {
                window.location = "http://localhost:3000/"
                alert("Unauthorized Login")

            }
            else {
                let input_email = response.data[0].email
                if (!input_email.includes("adminpanel")) {
                    window.location = "http://localhost:3000/"

                    alert("Unauthorized Login")
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


            />
        );

    }

    function addproduct() {
        Axios.post('http://localhost:3001/api/productInsert', { name: name, details: details, price: price, count: count, image: image }).then((response) => {
            console.log(response.data.length)
            let res = response.data.length; //if len == 0 duplicate data
            if (res === 0) {
                alert("This Product Already Exist")
            } else {
                alert("Insertion Successful")
            }

        }).then(window.location = "http://localhost:3000/admin/" + nid)

    }

    function updateProduct() {

        Axios.post('http://localhost:3001/api/productUpdate', { name: name, details: details, price: price, count: count, image: image }).then((response) => {

            let res = response.data.affectedRows; //if len == 0 duplicate data
            if (res === 0) {
                alert("An Error Occur")
            } else {
                alert("Product Update Successful")
            }

        }).then(window.location = "http://localhost:3000/admin/" + nid)
    }

    function minimize() {
        window.location = "http://localhost:3000/admin/" + nid
    }
    function showAll() {

        Axios.post('http://localhost:3001/api/productShowall').then((response) => {
            setProductList(response.data);
        })



    }

    function removeProduct() {

        console.log("removeProduct");
        alert("Are you sure to remove ?")
        Axios.post('http://localhost:3001/api/productRemove', { name: name }).then(window.location = "http://localhost:3000/admin/" + nid)
        alert("Product Removed")


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
    function submitReply() {
        Axios.post('http://localhost:3001/api/queryReply', { queryId: queryId, queryReply: queryReply }).then((response) => {

            let res = response.data.affectedRows; //if len == 0 duplicate data
            //console.log(res)
            if (res === 0) {
                alert("An Error Occur")
            } else {
                alert("Reply Successful")
            }

        }).then(window.location = "http://localhost:3000/admin/" + nid)

    }

    return (
        <div className='AdminPageBody'>

            {fetchUser()}


            <div className="signout_button">
                <Button onClick={logout} variant="outline-primary" size="sm">Sign out</Button>

            </div>

            <h3>Welcome To Admin Panel</h3>

            <div>
                <Container>

                    <Row>
                        <Col>
                            <div>
                                <br /><br />
                                <h3>Add Product</h3>


                                <div className="form">
                                    <div className="productNameContainer"><input type="text" name="productName" placeholder="Product Name" className="productName" onChange={(e) => { setName(e.target.value) }} />
                                    </div>

                                    <div className="productDetailsContainer"><input type="text" name="productDetails" placeholder="Product Details" className="productDetails" onChange={(e) => setDetails(e.target.value)} />
                                    </div>

                                    <div className="productPriceContainer"><input type="number" name="productPrice" placeholder="Product Price" className="productPrice" onChange={(e) => setPrice(e.target.value)} />
                                    </div>

                                    <div className="productCountContainer"><input type="number" name="productCount" placeholder="Product Count" className="productCount" onChange={(e) => setCount(e.target.value)} />
                                    </div>

                                    <div className="productImageContainer"><input type="url" name="productImage" placeholder="Product Image URL" className="productImage" onChange={(e) => setImage(e.target.value)} />
                                    </div>

                                    <div className="buttonContainer">
                                        <Button variant="outline-primary" size="sm" onClick={addproduct} >Add</Button>
                                    </div>

                                </div>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <br /><br />
                                <h3>Update Product</h3>


                                <div className="form">
                                    <div className="productNameContainer"><input type="text" name="productName" placeholder="Product Name" className="productName" onChange={(e) => { setName(e.target.value) }} />
                                    </div>

                                    <div className="productDetailsContainer"><input type="text" name="productDetails" placeholder="Product Details" className="productDetails" onChange={(e) => setDetails(e.target.value)} />
                                    </div>

                                    <div className="productPriceContainer"><input type="number" name="productPrice" placeholder="Product Price" className="productPrice" onChange={(e) => setPrice(e.target.value)} />
                                    </div>

                                    <div className="productCountContainer"><input type="number" name="productCount" placeholder="Product Count" className="productCount" onChange={(e) => setCount(e.target.value)} />
                                    </div>


                                    <div className="productImageContainer"><input type="url" name="productImage" placeholder="Product Image URL" className="productImage" onChange={(e) => setImage(e.target.value)} />
                                    </div>

                                    <div className="buttonContainer">
                                        <Button variant="outline-primary" size="sm" onClick={updateProduct}>Update</Button>
                                    </div>

                                </div>
                            </div>

                        </Col>
                        <Col>
                            <div>
                                <br /><br />
                                <h3>Remove Product</h3>
                                <div className="form">
                                    <div className="productNameContainer"><input type="text" name="productName" placeholder="Product Name" className="productName" onChange={(e) => { setName(e.target.value) }} />
                                    </div>


                                    <div className="buttonContainer">
                                        <Button variant="outline-danger" size="sm" onClick={removeProduct}>Remove</Button>
                                    </div>

                                </div>
                            </div>

                        </Col>
                        <Col>
                            <div>
                                <br /><br />
                                <h3>Show All Products</h3>

                                <div className="showAll_button">
                                    <br />

                                    <div class="btn-group" role="group" aria-label="First group">

                                        <Button onClick={showAll} variant="outline-primary" size="sm">show</Button>
                                        <Button variant="outline-primary" onClick={minimize} size="sm">minimize</Button>
                                    </div>






                                </div>

                            </div>

                        </Col>

                    </Row>
                </Container>
            </div>
            <br /><br /><br />

            <h2>All Products</h2>
            <div className="showProduct">

                <br></br>
                {productList.map(showcards)}

            </div>
            <br /><br /><br />
            <Row>
                <Col><div className="showQueries">
                    <h3>Queries</h3>
                    <div class="btn-group" role="group" aria-label="First group">

                        <Button id="showQueryButton" onClick={showQueries} variant="outline-success" size="sm">Show Queries</Button>
                        <Button variant="outline-danger" onClick={minimize} size="sm">Relode</Button>
                    </div>

                    <br></br><br></br>
                    <div id='queriesOutput'></div>

                </div></Col>
                <Col><div className="replyQueries">
                    <h3>Reply Queries</h3>
                    <div className='form'>
                        <div className="queryIdContainer"><input type="url" name="queryId" placeholder="Query ID" className="queryId" onChange={(e) => setQueryId(e.target.value)} />
                        </div>

                        <div className="queryIdContainer"><input type="url" name="queryReply" placeholder=" Reply" className="queryReply" onChange={(e) => setQueryReply(e.target.value)} />
                        </div>


                        <div className="buttonContainer">
                            <Button variant="outline-primary" size="sm" onClick={submitReply} >Submit</Button>
                        </div>
                    </div>


                </div></Col>
            </Row>


















        </div >

    )
}

export default AdminPage