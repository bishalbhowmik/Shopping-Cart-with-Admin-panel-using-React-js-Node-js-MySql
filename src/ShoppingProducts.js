import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './style.css';



const ShoppingProducts = ({ product }) => {
    const { id, name, price, size, image } = product;

    const data = { name, price, size, image}

    return (
        <div>
            <CardGroup >
                <Card>
                    <Card.Img variant="top" style={{width:'100%',height:'16rem'}} src={`http://localhost:8081/images/` + image} />
                    <Card.Body>
                        <Card.Title>Product Name: {name}</Card.Title>
                        <Card.Title>Price: {price}</Card.Title>
                        <Card.Text>
                            Product Size: {size}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <button>Buy</button>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>
    );
};

export default ShoppingProducts;