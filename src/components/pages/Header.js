import React, { useState, useContext, useEffect } from 'react'
import '../../App.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { TiShoppingCart } from 'react-icons/ti';
import { BiLogIn } from 'react-icons/bi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { PageNameContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/reducers/userSlice';
import UserAvatar from '../UserAvatar';
import { selectTotalQuantity } from '../../redux/reducers/cartSlice';
import AxiosInstance from '../../axiosInstance';

// -------------------------------------------------------------------------------------

const navLinks = [
  { title: 'Home', link: '/' },
  { title: 'Products', link: 'products' },
  { title: 'profile', link: 'profile' },
  { title: 'payment', link: 'payment' },
  { title: 'error', link: 'ffff' },
  { title: '', link: '' },
]

const StyledLink = styled.p`
  color: white;
  font-size: .9rem;
  text-align: left;
  padding: .3rem;
  border-radius: .5rem;
`;
// -------------------------------------------------------------------------------------



const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { pageName } = useContext(PageNameContext);
  const user = useSelector(selectUser);
  const TotalQuantity = useSelector(selectTotalQuantity);


  const { firstName } = user;

  const [activeLink, setActiveLink] = useState('Home');


  const handleLogin = () => {
    navigate('/login', { state: { from: location } })
  };



  const renderTooltip = (title, ...props) => (
    <Tooltip id="button-tooltip" {...props}>
      {title}
    </Tooltip>
  );


  return (
    <div className='header w-100 '>

      <Row className=' p-3'>

        <Col className='d-flex justify-content-start'  >
          <Row>
            <StyledLink
              className='brand fs-1 '
            >Shop
              <strong
                style={{ color: '#474747' }}
              >In</strong>
            </StyledLink>


          </Row>

        </Col>
        <Col className='d-flex justify-content-end'>
          <Nav>

            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip('cart')}
              >
                <Link
                  to={'/cart'}
                  className='text-reset text-decoration-none'
                  onClick={() => setActiveLink('Cart')}
                >
                  <StyledLink
                  >
                    {TotalQuantity > 0 ? (<span class="badge bg-secondary mt-2">{TotalQuantity}</span>) : null}
                    <TiShoppingCart className='h3' title="Like" />
                  </StyledLink>
                </Link>
              </OverlayTrigger>
            </Nav.Link>


            {firstName ?
              (

                <NavDropdown
                  className="custom-nav-dropdown"
                  id="basic-nav-dropdown"
                  title={
                    <UserAvatar
                      imageUrl={user?.imageUrl}
                      altText={user?.firstName}
                      firstName={user?.firstName}
                      lastName={user?.lastName} />}
                >

                  <NavDropdown.Item  >
                    {/* <Nav.Link   className='text-dark'>
                      <Link
                        to='/profile'
                        className='text-reset text-decoration-none text-dark'
                      >
                        Profile
                      </Link>
                    </Nav.Link> */}

                    <Nav.Link >
                    <Link
                        to='/profile'
                        className='text-reset text-decoration-none text-dark'
                      onClick={() => setActiveLink('Profile')}>
                      <p className='text-decoration-none text-dark p-0'>
                      Account details
                      </p>
                    </Link>
                  </Nav.Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Nav.Link   className='text-dark'>
                      <Link
                        to={'/login'}
                        className='text-reset text-decoration-none text-dark'
                        onClick={() => dispatch(logout())}
                      >
                      <p className='text-decoration-none text-dark p-0'>
                        logOut
                        </p>
                      </Link>
                    </Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )
              :
              (
                <Nav.Link>
                  <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip('login')}
                  >

                    <button
                      // to={'/login'}
                      className='text-reset text-decoration-none border-0 bg-transparent p-0'
                      onClick={handleLogin}
                    >
                      <StyledLink
                      // className={activeLink === 'Login' ? 'active-text-icon' : ''} 
                      >
                        <BiLogIn className='h3' />
                      </StyledLink>
                    </button>

                  </OverlayTrigger>
                </Nav.Link>
              )}

          </Nav>

        </Col>
      </Row>

      <Row style={{ width: '90%', padding: 0, marginLeft: '5%', marginRight: '5%' }}>
        <StyledLink >
          <h3>{pageName}</h3>
        </StyledLink>
        <Navbar bg="dark" expand="lg">
          <Container>

            <Nav className="me-auto display-flex flex-row">
              {
                navLinks.map((item, index) => (
                  <Nav.Link key={index} className='pe-2'>
                    <Link
                      to={item.link}
                      className='text-reset text-decoration-none'
                      onClick={() => setActiveLink(item.title)}>
                      <StyledLink className={activeLink === item.title ? 'active-text' : ''}>
                        {item.title}
                      </StyledLink>
                    </Link>
                  </Nav.Link>

                ))
              }

            </Nav>
          </Container>
        </Navbar>
      </Row>
    </div>
  )
}

export default Header;
