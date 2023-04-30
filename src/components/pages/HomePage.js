import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
// import { Products } from '../../Products';
// import AxiosInstance from '../../axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError } from '../../redux/reducers/productsSlice';

// -------------------------------------------------------------------------------------


const HomePage = () => {

  // const [products, setProducts] = useState(null);


  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <Container>
      <Row>
        <Col>
          <h1>Welcome to our E-commerce Website</h1>
          <p>Here are some of our latest products:</p>
        </Col>
      </Row>

      <Row className='parent'>

        {
          loading ? (
            <div class="spinner-border text-primary " role="status">
              <span class="sr-only">Loading...</span>
            </div>
          ) :

            error ? (<Col className='text-danger '>Error: {error}</Col>) :

              products && (
                products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='mt-2'>
                    <ProductCard product={product} />
                  </Col>
                ))
              )
        }
      </Row>
    </Container>
  );
};

export default HomePage;
