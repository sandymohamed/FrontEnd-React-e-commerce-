import { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError } from '../../redux/reducers/productsSlice';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
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
    <>
      <Helmet>
        <title>ShopIn</title>
      </Helmet>
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
                  <Row className='parent mt-4'>
                    <Row>
                      <Col sm={10}> <p className='h2 headTitle '>NEW PRODUCT</p> </Col>
                      <Col>
                        <Link to={'/products/'} className="btn buttons">
                          See All
                        </Link>
                      </Col>
                    </Row>

                    {products.slice(0, 4).map((product) => (
                      <Col key={product._id} xs={6} md={4} lg={3} className='mt-2'>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>

                  <Row className='parent mt-4'>
                    <Row>
                      <Col sm={10}> <p className='h2 headTitle '>POPULAR PRODUCT</p> </Col>
                      <Col>
                        <Link to={'/products/'} className="btn buttons">
                          See All
                        </Link>

                      </Col>
                    </Row>

                    {products.slice(-6).map((product) => (
                      <Col key={product._id}  xs={6} md={4} lg={3} className='mt-2'>
                        <ProductCard product={product} />
                      </Col>
                    ))}
                  </Row>
                </>
              )
        }

      </Container>
    </>
  );
};

export default HomePage;
