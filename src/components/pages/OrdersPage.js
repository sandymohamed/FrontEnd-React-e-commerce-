import React from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'
import StepsHeader from '../StepsHeader'
import { Link } from 'react-router-dom'

const OrdersPage = () => {
  return (
    <Container>
      <StepsHeader>
        <Breadcrumb.Item > <Link n to='/shipping'> Shipping </Link></Breadcrumb.Item>
        <Breadcrumb.Item > <Link to='/payment'> Payment </Link> </Breadcrumb.Item>
        <Breadcrumb.Item >  <Link to='/order'> Order </Link></Breadcrumb.Item>
      </StepsHeader>
    <div>OrdersPage</div>
    </Container>
  )
}

export default OrdersPage