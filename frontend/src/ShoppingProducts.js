import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';



const ShoppingProducts = ({ product }) => {
    const { id,name, price,size, image } = product;

    const data ={name,price,size,image}

   
	


    // const order =(id) =>{
    //     axios.post('http://localhost:8081/order'+data)
    //     .then(res => {
    //         if(res.data.Status === 'Success') {
    //             const id = res.data.id;
    //             // navigate('/employeedetail/'+id);

    //             navigate('/shopping')
    //         } else {
    //             console.log(res.data);
    //             setError(res.data.Error);
    //     }
    // })

    console.log(product);
    return (
        <div>
            {/* <img className='' src={`http://localhost:8081/images/`+image}/>
            <h1>Name: {name}</h1>
            <h3>Price: {price}</h3>
            <button>Add to Cart</button> */}
            {/* 

            <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:8081/images/`+image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Title>{price}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card> */}

      

            <Container>
                <Row>
                    
                      <Col>  <CardGroup style={{ width: '18rem' }}>
                            <Card>
                                <Card.Img variant="top" src={`http://localhost:8081/images/` + image} />
                                <Card.Body>
                                    <Card.Title>{name}</Card.Title>
                                    <Card.Title>{price}</Card.Title>
                                    <Card.Text>
                                        {size}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <button>Add to Cart</button>
                                </Card.Footer>
                            </Card>
                        </CardGroup></Col>

                    
                    {/* <Col xs>Second, but unordered</Col>
                    <Col xs={{ order: 'first' }}>Third, but first</Col> */}
                </Row>
            </Container>
        </div>
    );
};

export default ShoppingProducts;