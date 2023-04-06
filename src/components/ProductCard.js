import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const { name, image, price, description, rating, id } = product;
console.log(product);
  return (
    <Card 
    // style={{ width: '18rem' }}
    >
      <Link to={`/product/${id}`}>
        <Card.Img variant="top" src={image} />
      </Link>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
            <Rating  value={rating} text={`rate: ${rating}`} />
        </Card.Text>
        
        <Card.Text>{`Price: ${price}`}</Card.Text>
        <button className='btn btn-primary' variant="primary">Add to Cart</button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
