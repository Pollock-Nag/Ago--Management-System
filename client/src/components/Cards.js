import React from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import Axios from 'axios';
const Cards = (props) => {

    function addToCart() {
        var name = props.title;
        var price = props.price;
        var userNid = props.nid;

        //Cart system
        Axios.post('http://localhost:3001/api/addToCart', { name: name, price: price, userNid: userNid }).then((response) => {

            let res = response.data.affectedRows; //if len == 0 duplicate data
            if (res === 0) {
                alert("An Error Occur")
            } else {
                alert("Added to cart")
            }
            window.location = "http://localhost:3000/user/" + userNid

        })
    }


    return (
        <Col>
            <Card border="white" bg="light" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.imgsrc} />
                <Card.Body>
                    <Card.Title><h2>{props.title}</h2></Card.Title>
                    <Card.Text>{"Details: " + props.description}</Card.Text>
                    <Card.Text>{"Price: " + props.price + " tk"}</Card.Text>
                    <Card.Text>{"Available Quantity: " + props.count}</Card.Text>
                    <Button onClick={addToCart} variant="primary">{"Add to cart"}</Button>
                </Card.Body>
            </Card>



        </Col>
    )
}

export default Cards
