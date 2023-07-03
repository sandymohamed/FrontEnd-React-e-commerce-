import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../axiosInstance';
import { PageNameContext } from '../../App';
import "../../App.scss";

// -------------------------------------------------------------------------------------

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

 

  const { pageName, setPageName } = useContext(PageNameContext)

  useEffect(() => {

    AxiosInstance.get(`/api/products/${id}`)
      .then(response => {
        setProduct(response.data);

      })
      .catch(error => {
        console.log(error);
      });

      setPageName(product?.name)
  }, [id, product]);

  
  if (!product) {
    return (
      <div class="spinner-border text-primary " role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <Container className='boxShadow  bg-dark text-light rounded mt-3 p-2'>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} className='rounded' fluid />
        </Col>
        <Col md={6}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>

 
          <button className={product.countInStock >= 0 ? 'btn buttons ms-auto' : 'btn btn-muted ms-auto'} disabled={product.countInStock <= 0}>Add to Cart</button>


        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;