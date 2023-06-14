import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap';
import PaymentButton from '../PaymentButton';
import '../../App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { orderSlice,  } from '../../redux/reducers/orderSlice';
import { useNavigate } from 'react-router-dom';
// --------------------------------------------------------------------

const schema = yup.object().shape({
  paymentOption: yup.string().required('Please select a payment method'),
});
// --------------------------------------------------------------------

const PaymentForm = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const paymentStatus = useSelector(selectPaymentMethods);
  const { setPaymentMethods } = orderSlice.actions;


  const { register, handleSubmit, errors, watch, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentOption: ''
    }
  });
  const selectedPaymentOption = watch('paymentOption');


// order details:







  const onSubmit = async (data) => {
    console.log(data);

    await dispatch(setPaymentMethods(data.paymentOption))

    if (data.paymentOption === 'cash') {
      navigate('/orders')
    } else {
      navigate('/checkout')

    }


  };




  useEffect(() => {

    console.log("xxxxx", selectedPaymentOption,);

  }, []);

  return (
    <Container className='d-flex justify-content-center align-items-center ' style={{ height: ' 100vh' }}>
      <Card className="w-75 text-start align-items-center text-light bg-dark card-box-border " >
        <Card.Header className='h2 text-bold'>Payment</Card.Header>
        <Card.Body>
          {/* <Card.Title className='h1  text-light text-bold'>  Payment </Card.Title> */}
          <Card.Text>
            All transactions are secure and encrypted.
          </Card.Text>


          <Form onSubmit={handleSubmit(onSubmit)} className='mb-5 text-light'>
            <Row>

              <Col sm={10}>
                <Form.Group>
                  <Form.Check
                    inline
                    type="radio"
                    id="cash"
                    name="cash"
                    value="cash"
                    {...register('paymentOption')}

                  /> <Form.Label>Pay Cash</Form.Label>

                </Form.Group>
                <Form.Group>
                  <Form.Check
                    inline
                    type="radio"
                    id="card"
                    name="card"
                    value="card"
                    {...register('paymentOption')}

                  /> <Form.Label>Using Card</Form.Label>

                </Form.Group>
                <Form.Group>
                  <Form.Check
                    inline
                    type="radio"
                    id="paypal"
                    name="paypal"
                    value="paypal"
                    {...register('paymentOption')}

                  /> <Form.Label>Using PayPal</Form.Label>

                </Form.Group>
                {errors && (
                  <div className="text-danger">{errors.message}</div>
                )}
              </Col>

            </Row>
            <Button type="submit" className='btn buttons mt-5 '>  {selectedPaymentOption === 'cash' ? 'Complete Order' : ' Pay Now'}</Button>

          </Form>
        </Card.Body>



        {/* <Card.Footer style={{ display: (selectedPaymentOption === 'card' || selectedPaymentOption === 'paypal') ? 'block' : 'none' }}>
        </Card.Footer> */}
      </Card>
    </Container>

  );

};

export default PaymentForm;
