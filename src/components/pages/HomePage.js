import { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError } from '../../redux/reducers/productsSlice';
import { PageNameContext } from '../../App';
import ImgSlider from '../ImgSlider';
import '../../App.scss';
// -------------------------------------------------------------------------------------


const HomePage = () => {

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const { pageName, setPageName } = useContext(PageNameContext)


  useEffect(() => {
    dispatch(fetchProducts());

    setPageName('Home')
  }, [dispatch]);


  return (
    <Container>
      <Row>
        <ImgSlider />


      </Row>



      {
        loading ? (
          <div class="spinner-border text-primary " role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) :

          error ? (<Col className='text-danger '>Error: {error}</Col>) :

            products && (
              <>
                <Row className='parent'>
                  <Row>
                    <Col sm={10}> <p className='h2 headTitle'>NEW PRODUCT</p> </Col>
                    <Col>
                      <button className='btn buttons' style={{}}>See All</button>
                    </Col>
                  </Row>

                  {products.slice(0, 4).map((product) => (
                    <Col key={product._id} xs={6} md={4} lg={3} className='mt-2'>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>

                <Row className='parent'>
                  <Row>
                    <Col sm={10}> <p className='h2 headTitle '>POPULAR PRODUCT</p> </Col>
                    <Col>
                      <button className='btn buttons' >See All</button>

                    </Col>
                  </Row>

                  {products.slice(-6).map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} className='mt-2'>
                      <ProductCard product={product} />
                    </Col>
                  ))}
                </Row>
              </>
            )
      }

    </Container>
  );
};

export default HomePage;
