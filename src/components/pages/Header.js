import React, { useState } from 'react'
import '../../App.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

import { TiShoppingCart } from 'react-icons/ti';
import { BiLogIn } from 'react-icons/bi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';// -------------------------------------------------------------------------------------

const navLinks = [
  { title: 'Home', link: '/' },
  { title: 'Products', link: 'products' },
  { title: 'error', link: 'ffff' },
  { title: '', link: '' },
]
// -------------------------------------------------------------------------------------



const Header = () => {
  const renderTooltip = (title, ...props) => (
    <Tooltip id="button-tooltip" {...props}>
      {title}
    </Tooltip>
  );
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand className='brand'>Shop<strong className='text-primary'>In</strong></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              navLinks.map((item, index) => (
                <Nav.Link key={index}>
                  <Link to={item.link} className='text-reset text-decoration-none'>{item.title}</Link>
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
          <Nav>

            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip('login')}
              >

                <Link to={'/login'} >
                  <BiLogIn className='h4' />
                </Link>

              </OverlayTrigger>
            </Nav.Link>

            <Nav.Link>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip('cart')}
              >
                <Link to={'/cart'} >
                  <TiShoppingCart className='h4' title="Like" />
                </Link>
              </OverlayTrigger>
            </Nav.Link>




          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;
