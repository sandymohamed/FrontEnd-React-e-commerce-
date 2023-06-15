import '../../App.scss';
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { addItem, removeItem, clearCart, selectTotalQuantity, selectTotal, removeCart, selectCartitems, removeItemFromCart, getCartDetails } from '../../redux/reducers/cartSlice';
import { PageNameContext } from '../../App';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { fetchUserData, selectUser } from '../../redux/reducers/userSlice';

// -------------------------------------------------------------------------------------
const StyledCard = styled.div`
background-color: white;
padding-bottom: '.5rem';
border:none;
border-radius: 10px;
box-shadow:  -.6rem .6rem .6rem rgba(0, 0, 0, 0.4);

`
// -------------------------------------------------------------------------------------
const CartPage = () => {

  const { pageName, setPageName } = useContext(PageNameContext)

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const items = useSelector(selectCartitems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const total = useSelector(selectTotal);

  const user = useSelector(selectUser);

  const [animate, setAnimate] = useState(false);


  const incrementQuantity = (quantity, countInStock, id) => {
    if (quantity < countInStock) {
      quantity++;

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);

      }, 5000);

    }
  };

  const decrementQuantity = (quantity, id) => {
    if (quantity > 1) {
      quantity--;

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);

      }, 5000);

    }

  };


  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    console.log('add');

  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(removeCart());
    // console.log('clear');

  };

  useEffect(() => {

    if (user) {

      dispatch(getCartDetails(user._id))
    }

    setPageName('Cart')


  }, [dispatch, user]);


  const renderDigits = (number) => {

    const newNum = number?.toString()?.split('');

    return newNum?.map((digit, index) => (
      <span
        key={index}
        className={`digit 
          ${animate ? 'animateup' : ''}
          `}
        onAnimationEnd={() => setAnimate(false)}
      >
        {digit}
      </span>
    ));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem('token')

    if (token) {
      navigate('/shipping')

    } else {
      navigate('/login', { state: { from: '/checkout' } })

    }

  }


  return (
    <Container align='left' >
      <Row xs={12} >
        <Col xs={6}>
          <p className='fs-2 mt-2 text-light'> My Cart:</p>
        </Col>
        <Col xs={6} className='d-flex justify-content-end align-items-center'>
          {/* <Row> */}
          <p className='fs-4 m-1 text-light'>{totalQuantity} {totalQuantity > 1 ? 'items' : 'item'}</p>
          <Button variant="outline-danger" ><RiDeleteBin5Fill className='mb-1' /> Clear Cart</Button>
          {/* </Row> */}

        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={8}>
          {items.length ?
            items.map((item, index) => (
              <Card key={index} className='w-100 d-flex flex-row m-2 box-border cart-card ' style={{ height: '20vh' }}>

                <Link to={`/product/${item._id}`} >
                  <Card.Img variant="top" src={item.image} className='h-100 rounded' />
                </Link>
                  {item.image}

                <Card.Body className='pb-1 d-flex justify-content-between'>

                  <div>

                    <Card.Title align='start'>{item.name}</Card.Title>

                    {item.oldPrice ? <>
                      <Card.Text align='start' className='text-light fs-3 text-nowrap' > <span className='text-decoration-line-through fs-6 text-dark'> {`${item.oldPrice} $`}</span>  {`${item.price} $`} </Card.Text>

                    </>
                      :
                      <Card.Text align='start' className='text-light fs-3' >{`${item.price} $`}</Card.Text>
                    }

                  </div>

                  <div className="d-flex align-items-center mb-1 rounded text-light bg-warning" style={{ width: '15%', height: '5vh', }}>
                    <button
                      className="btn count-btn  "
                      onClick={() => {
                        handleRemoveFromCart(item)
                        decrementQuantity(item.quantity, item._id)
                      }}
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>

                    <span className="fs-4  border border-top-0 border-bottom-0 ps-1 pe-1">{item.quantity}</span>
                    <button
                      className="btn count-btn"
                      onClick={() => {
                        handleAddToCart(item)
                        incrementQuantity(item.quantity, item.countInStock, item._id)
                      }}
                      disabled={item.quantity >= item.countInStock}
                    >
                      +
                    </button>


                  </div>
                  <div className='d-block text-light position-absolute bottom-0 end-0 me-2' >
                    {item.quantity} * {item.price} =

                    <span className={` total-price ${animate ? 'animate' : ''}`} >
                      {renderDigits(Math.ceil(item.totalPrice))}
                    </span>

                  </div>

                </Card.Body>
              </Card>
            )

            )
            :
            (
              <p>Not Found</p>
            )}

          <hr />
        </Col>
        <Col xs={12} sm={4}>
          <Card className='w-100 mt-2 p-2  box-border cart-card'>

            <Card.Title className='fs-3 text-light'> Order Summary : </Card.Title>
            <Card.Text className='fs-5 text-light'> Subtotal :
              <span className={` total-price ms-2 ${animate ? 'animate' : ''}`} >
                {renderDigits(Math.ceil(total))}

              </span> $
            </Card.Text>

            <Card.Text className='fs-5 text-light'> Shipping :
              <span className='ms-2 ' >
                Calculated at checkout

              </span>
            </Card.Text>
            <button
              className="btn buttons"
              onClick={handleCheckout}
              disabled={total <= 0}
            >
              Continue to shipping
            </button>

          </Card>
        </Col>

      </Row>
    </Container>
  );
};

export default CartPage;
