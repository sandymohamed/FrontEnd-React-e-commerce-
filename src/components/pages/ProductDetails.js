import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Products } from '../../Products';
// -------------------------------------------------------------------------------------

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log(error);
      });

}, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='boxShadow rounded mt-3 p-2'>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} className='rounded' fluid />
        </Col>
        <Col md={6}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <button  className={product.countInStock >=0 ? 'btn btn-primary' : 'btn btn-muted' } disabled={product.countInStock <= 0}>Add to Cart</button>

        
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;