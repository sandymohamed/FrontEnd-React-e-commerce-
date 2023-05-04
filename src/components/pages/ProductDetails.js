import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../../axiosInstance';
import { PageNameContext } from '../../App';

// -------------------------------------------------------------------------------------

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < product.countInStock) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const { pageName, setPageName } = useContext(PageNameContext)

  useEffect(() => {
    AxiosInstance.get(`/api/products/${id}`)
      .then(response => {
        setProduct(response.data);

      })
      .catch(error => {
        console.log(error);
      });

      setPageName(product?.name)
  }, [id, quantity]);

  if (!product) {
    return (
      <div class="spinner-border text-primary " role="status">
        <span class="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <Container className='boxShadow rounded mt-3 p-2'>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} className='rounded' fluid />
        </Col>
        <Col md={6}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>

          <div className="d-flex align-items-center">
          <button
            className="btn btn-primary me-2"
            onClick={decrementQuantity}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="me-2">Qty: {quantity}</span>
          <button
            className="btn btn-primary"
            onClick={incrementQuantity}
            disabled={quantity >= product.countInStock}
          >
            +
          </button>

          <button className={product.countInStock >= 0 ? 'btn btn-primary ms-auto' : 'btn btn-muted ms-auto'} disabled={product.countInStock <= 0}>Add to Cart</button>
        </div>


        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;