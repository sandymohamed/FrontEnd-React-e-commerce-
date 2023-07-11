import React, { useState, useEffect, useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../axiosInstance';
import { PageNameContext } from '../../App';
import "../../App.scss";
import UserAvatar from '../UserAvatar';
import Rating from '../Rating';
import { FormProvider, useForm } from 'react-hook-form';

// --------------------------------------------------------------------
const schema = yup.object().shape({
  rating: yup.number().min(1).max(5).required(),
  comment: yup.string().required("Comment is required"),
});

// -------------------------------------------------------------------------------------

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { pageName, setPageName } = useContext(PageNameContext);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: '',
      comment: '',
    },
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data) => {
    console.log('data', data);
   
    AxiosInstance.post('/api/reviews/new', { ...data, product: id, })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    setPageName(product?.name);

    AxiosInstance.get(`/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .then(() => {
        AxiosInstance.post('api/reviews/', { product: product._id }).then((res) => {
          setReviews(res.data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!product) {
    return (
      <div className="spinner-border text-primary" role="status" />
    );
  }

  return (
    <>
      <Container>
        <Row className="text-start boxShadow bg-dark text-light rounded mt-3 p-2">
          <Col xs={12} sm={5} className="m-0 p-0">
            <img src={product.image} alt={product.name} className="rounded" />
          </Col>
          <Col sm={5}>
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

        <p className="fs-4">Reviews:</p>
        {reviews &&
          reviews.map((review) => (
            <Row
              className="boxShadow text-start bg-dark text-light rounded mt-3 p-2 d-flex flex-row justify-content-start align-items-center"
              key={review.id}
            >
              <div className="d-flex flex-row flex-wrap-nowrap align-items-center">
                <UserAvatar
                  imageUrl={review?.userId?.imageUrl}
                  altText={review?.userId?.firstName}
                  firstName={review?.userId?.firstName}
                  lastName={review?.userId?.lastName}
                />
                <p className="fs-5 m-2">{review?.userId?.firstName} {review?.userId?.lastName}</p>
              </div>
              <p><Rating value={review?.rating} /></p>
              <p>{review?.comment}</p>
            </Row>
          ))
        }

        <Row>
          <p className="fs-4">Add New Review:</p>
          <FormProvider {...methods}>
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

              <Button type="submit">Submit</Button>
            </Form>
          </FormProvider>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetails;
