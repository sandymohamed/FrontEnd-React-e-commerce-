import PaymentButton from '../PaymentButton'
import { Breadcrumb, Container } from 'react-bootstrap'
import StepsHeader from '../StepsHeader';
import { Link } from 'react-router-dom';

const Checkout = () => {

  return (
    <Container>
      <StepsHeader>
        <Breadcrumb.Item > <Link to='/shipping' className="text-reset text-decoration-none"> Shipping </Link></Breadcrumb.Item>
        <Breadcrumb.Item > <Link to='/payment'> Payment </Link> </Breadcrumb.Item>
        <Breadcrumb.Item > <Link to='/checkout'> Checkout </Link> </Breadcrumb.Item>
        <Breadcrumb.Item active > Order </Breadcrumb.Item>
      </StepsHeader>
      <PaymentButton />
    </Container>
  )
}


export default Checkout;