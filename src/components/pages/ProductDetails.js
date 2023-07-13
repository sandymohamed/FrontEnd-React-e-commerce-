import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import AxiosInstance from '../../axiosInstance';
import Rating from '../Rating';
import { PageNameContext } from '../../App';
import UserAvatar from '../UserAvatar';
import "../../App.scss";
import Message from '../Message';
import { selectUser } from '../../redux/reducers/userSlice';
import { useSelector } from 'react-redux';

// --------------------------------------------------------------------
const schema = yup.object().shape({
  rating: yup.number().min(1).max(5).required(),
  comment: yup.string().required("Comment is required"),
});

// -------------------------------------------------------------------------------------

const ProductDetails = () => {
  const { id } = useParams();

  const user = useSelector(selectUser);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  const { pageName, setPageName } = useContext(PageNameContext);


  const [alertVariant, setAlertVariant] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const showMessage = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
  };


  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: '',
      comment: '',
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = methods;

  const onSubmit = (data) => {


    AxiosInstance.post('/api/reviews/new', { ...data, product: id })
      .then((res) => {
        console.log(res);
        // Update the reviews state with the new review
        setReviews((prevReviews) => [...prevReviews, res.data]);
        reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteReview = (id) => {
    console.log(id);

    AxiosInstance.delete(`/api/reviews/${id}`)
      .then((res) => {
        console.log(res);
        // Update the reviews state with the new review
        getProductReviews();
        showMessage(`Success✔ ${res?.data?.message}`, 'success');
      })
      .catch((error) => {
        showMessage(`Failed ${error}❌`, 'danger');
      });
  }

  const getProductReviews = () => {

    AxiosInstance.post('api/reviews/', { product: id })
    .then((res) => {
      setLoading(false);
      setReviews(res.data);
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {

    setPageName(product?.name);

    AxiosInstance.get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      getProductReviews();
      console.log(user)

  }, []);


  if (!product) {
    return (
      <div className="spinner-border text-primary" role="status" />
    );
  }

  return (
    <>
     
      <Container className='text-light p-2'>
        <Row className="text-start boxShadow bg-dark rounded mt-3 p-4">
          <Col xs={11} sm={6} className="m-0  p-0 card-image">
            <img src={product.image} alt={product.name} className="rounded card-image" />
          </Col>
          <Col sm={5} className='card-text-start'>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price}</p>
            <button
              className={product.countInStock >= 0 ? 'btn buttons ms-auto' : 'btn btn-muted ms-auto'}
              disabled={product.countInStock <= 0}
            >
              Add to Cart
            </button>
          </Col>
        </Row>

        <hr />


        <p className="fs-4">Reviews:</p>

        {alertVariant && (
        <Message messageText={alertMessage} variant={alertVariant} />
      )}
        {loading && <div className="spinner-border text-primary" role="status" />}
        {reviews?.map((review) => (
          <Row
            className="boxShadow text-start bg-dark text-light rounded mt-3 p-2 d-flex flex-row justify-content-start align-items-center"
            key={review.id}
          >
            <div className="w-100 d-flex flex-row flex-wrap-nowrap align-items-center position-relative">
              <UserAvatar
                imageUrl={review?.userId?.avatar}
                altText={review?.userId?.firstName}
                firstName={review?.userId?.firstName}
                lastName={review?.userId?.lastName}
              />
              <p className="fs-5 m-2">{review?.userId?.firstName} {review?.userId?.lastName}</p>



          {  
          (user._id === review.userId._id ) &&
            <button onClick={() => {
                handleDeleteReview(review._id)
              }}>

                <RiDeleteBin5Fill className='fs-5 position-absolute end-0 me-2 text-danger cursor-pointer' />
              </button>}

            </div>
            <p><Rating value={review?.rating} /></p>
            <p>{review?.comment}</p>
          </Row>
        ))
        }

        <hr />
        <Row className='mt-6'>
          <p className="fs-4">Add New Review:</p>
          <FormProvider {...methods} >
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId="formBasicRating">
                <Form.Control
                  type="number"
                  name="rating"
                  placeholder="Rate"
                  {...register('rating')}
                />
                {errors.rating && <span>This field is required and should be between 1 and 5</span>}
              </Form.Group>

              <Form.Group controlId="formBasicComment">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                  {...register('comment')}
                />
                {errors.comment && <span>This field is required</span>}
              </Form.Group>

              <Button type="submit" className='btn buttons mt-3'>Submit</Button>
            </Form>
          </FormProvider>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
