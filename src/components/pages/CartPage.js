import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, clearCart } from '../redux/reducers/cartSlice';

const CartPage = ({ product }) => {
  const { name, image, price, description, rating, _id, countInStock } = product;

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
  const items = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  
  
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    // This effect runs every time the quantity changes
    

  }, [dispatch, quantity]);

  return (
    <Card>
      <Link to={`/product/${_id}`}>
        <Card.Img variant="top" src={image} />
      </Link>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <Rating value={rating} text={`rate: ${rating}`} />
        </Card.Text>

        <Card.Text>{`Price: ${price}`}</Card.Text>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-primary me-2"
            onClick={decrementQuantity}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="me-2">Qty:{quantity}</span>
          <button
            className="btn btn-primary"
            onClick={incrementQuantity}
            disabled={quantity >= countInStock}
          >
            +
          </button>


          {product.name} - {product.quantity} x {product.price} = {product.totalPrice}
            <button onClick={() => handleAddToCart(product)}>+</button>


          <button 
          className={
            countInStock >= 0 ?
             'btn btn-primary ms-auto' :
              'btn btn-muted ms-auto'
              } 
              disabled={product.countInStock <= 0}
              onClick={() => handleAddToCart(product)}
              >Add to Cart</button>

        </div>
      </Card.Body>
    </Card>
  );
};

export default CartPage;
