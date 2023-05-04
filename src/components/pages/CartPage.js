import '../../App.scss';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addItem, removeItem, clearCart } from '../../redux/reducers/cartSlice';
import { PageNameContext } from '../../App';
// -------------------------------------------------------------------------------------
const StyledCard = styled.div`
background-color: white;
border:none;
border-radius: 10px;
box-shadow:  -.6rem .6rem .6rem rgba(0, 0, 0, 0.4);

`
// -------------------------------------------------------------------------------------
const CartPage = () => {

  const { pageName, setPageName } = useContext(PageNameContext)


  const dispatch = useDispatch();
  const items = useSelector(state => state?.cart?.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = (countInStock) => {
    if (quantity < countInStock) {
      setQuantity(quantity + 1);
    }
    console.log('increment');
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
    console.log('decrement');

  };


  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    console.log('add');

  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeItem(id));
    console.log('remove');

  };

  const handleClearCart = () => {
    dispatch(clearCart());
    console.log('clear');

  };

  useEffect(() => {
    // This effect runs every time the quantity changes

    setPageName('Cart')


  }, [dispatch, quantity]);

  return (
    <Container align='center' >
      {items.length ?
        items.map((item, index) => (
          <Card className='w-75 d-flex flex-row m-2 box-border cart-card' style={{ height: '25vh' }}>

              <Link to={`/product/${item._id}`} >
                <Card.Img variant="top" src={item.image} className='h-100 rounded' />
              </Link>

            <Card.Body>
              <Card.Title align='start'>{item.name}</Card.Title>

          {item.oldPrice ?  <>
            <Card.Text align='start' className='text-light fs-3 text-nowrap' > <span className='text-decoration-line-through fs-6 text-dark'> {`${item.oldPrice} $`}</span>  {`${item.price} $`} </Card.Text> 
            
          </>
          :
          <Card.Text align='start' className='text-light fs-3' >{`${item.price} $`}</Card.Text>
          }
           

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
                  onClick={() => {
                     incrementQuantity(item.countInStock)
                     handleAddToCart(item)
                    }}
                  disabled={quantity >= item.countInStock}
                >
                  +
                </button>


             {item.name} - {item.quantity} x {item.price} = {item.totalPrice}
                <button onClick={() => handleAddToCart(item)}>+aa</button>
    
    
              <button 
              className={
                item.countInStock >= 0 ?
                 'btn btn-primary ms-auto' :
                  'btn btn-muted ms-auto'
                  } 
                  disabled={item.countInStock <= 0}
                  onClick={() => handleAddToCart(item)}
                  >Add to Cart</button> 

              </div>
            </Card.Body>
          </Card>)

        )
        :
        (
          <p>Not Found</p>
        )}
    </Container>
  );
};

export default CartPage;
