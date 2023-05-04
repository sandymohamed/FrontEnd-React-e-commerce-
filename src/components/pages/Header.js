import React, { useState, useContext } from 'react'
import '../../App.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TiShoppingCart } from 'react-icons/ti';
import { BiLogIn } from 'react-icons/bi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { PageNameContext } from '../../App';

// -------------------------------------------------------------------------------------

const navLinks = [
  { title: 'Home', link: '/' },
  { title: 'Products', link: 'products' },
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

  const { pageName, setPageName } = useContext(PageNameContext)

  const [activeLink, setActiveLink] = useState('Home');

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
                overlay={renderTooltip('login')}
              >

                <Link
                  to={'/login'}
                  className='text-reset text-decoration-none'
                  onClick={() => setActiveLink('Login')}
                >
                  <StyledLink className={activeLink === 'Login' ? 'active-text' : ''} >
                    <BiLogIn className='h3' />
                  </StyledLink>
                </Link>

              </OverlayTrigger>
            </Nav.Link>

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
                  <StyledLink className={activeLink === 'Cart' ? 'active-text' : ''} >
                    <TiShoppingCart className='h3' title="Like" />
                  </StyledLink>
                </Link>
              </OverlayTrigger>
            </Nav.Link>

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


              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item >
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item>Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Container>
        </Navbar>
      </Row>
    </div>
  )
}

export default Header;
