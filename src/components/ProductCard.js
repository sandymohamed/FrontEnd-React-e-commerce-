import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart, addCart, selectCartitems, selectTotalQuantity, removeItemFromCart } from '../redux/reducers/cartSlice';
import { selectUser } from '../redux/reducers/userSlice';
// --------------------------------------------------------------------

const StyledCard = styled.div`

background-color: white;
border:none;
border-radius: 10px;
box-shadow:  -.6rem .6rem .6rem rgba(0, 0, 0, 0.4);

`;

const StyledImg = styled.img`
height:100%;
width:100%;
border: none;
border-radius: 10px;

`;
const StyledBody = styled.div`
height: 10%; width:100%;

`;

// --------------------------------------------------------------------

const ProductCard = ({ product }) => {
  const { name, image, price, oldPrice, rating, _id, countInStock } = product;

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < countInStock) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const dispatch = useDispatch();
  const items = useSelector(selectCartitems);
  const user = useSelector(selectUser);
  const totalQuantity = useSelector(selectTotalQuantity);



  const handleAddToCart = (item) => {
    const data = {user: user._id, ...item}
    dispatch(addCart(data));
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    // This effect runs every time the quantity changes


  }, [dispatch, quantity]);

  return (
    <Card className='box-border h-100'>
      <Link to={`/product/${_id}`} style={{height: '40vh'}}>
        <StyledImg variant="top" src={image}  />
      </Link>
      <StyledBody>

        <Row>
        <Col md={6}> 
        <Card.Title align="start" className='ps-1 brand text-nowrap'>{name}</Card.Title>
         </Col>
          
          <Col  md={6}> 
            <Card.Text><Rating value={rating} /></Card.Text>
          </Col>
        </Row>

          {oldPrice ?  <>
            <Card.Text className='yellow-text fs-3 text-nowrap' > <span className='text-decoration-line-through fs-6 text-dark'> {`${oldPrice} $`}</span>  {`${price} $`} </Card.Text> 
            
          </>
          :
          <Card.Text className='yellow-text fs-3' >{`${price} $`}</Card.Text>
          }
           
        <button
          className={
            countInStock >= 0 ?
              'btn buttons ms-auto' :
              'btn btn-muted ms-auto'
          }
          disabled={product.countInStock <= 0}
          onClick={() => handleAddToCart(product)}
        >{countInStock > 0 ? 'Add to Cart' : 'Sold Out'}</button>

      
      </StyledBody>
    </Card>
  );
};

export default ProductCard;
