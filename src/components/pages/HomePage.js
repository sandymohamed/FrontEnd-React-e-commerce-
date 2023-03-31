import {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import { Products } from '../../Products';


const HomePage = () => {

  const [products, setProducts] = useState(null);

  useEffect(() => {

   setProducts(Products);

  }, [products]);


  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to our E-commerce Website</h1>
          <p>Here are some of our latest products:</p>
        </Col>
      </Row>
      <Row>
        {products &&(
          products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3} className='mt-2'>
            <ProductCard product={product} />
          </Col>
        )))}
      </Row>
    </Container>
  );
};

export default HomePage;
