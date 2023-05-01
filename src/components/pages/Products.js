import { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError } from '../../redux/reducers/productsSlice';
import { PageNameContext } from '../../App';

// -------------------------------------------------------------------------------------

const ProductsPage = () => {

    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const { setPageName} = useContext(PageNameContext)


    useEffect(() => {
        dispatch(fetchProducts());
    
        setPageName('Products')

    }, [dispatch]);


    return (
        <>
            <Helmet>
                <title>My App Title</title>
            </Helmet>

            <Container>
                <Row>
                    <Col align='start' className='m-1'>
                        <h1> Our products:</h1>
                    </Col>
                </Row>
                <Row className='parent'>

                    {
                        loading ? (
                            <div class="spinner-border text-primary" role="status">
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
        </>
    )
}

export default ProductsPage
