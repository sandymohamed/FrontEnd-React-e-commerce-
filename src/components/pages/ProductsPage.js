import { useContext, useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectProducts, selectLoading, selectError, getCategoriesNames, fetchProductsByCategory } from '../../redux/reducers/productsSlice';
import { PageNameContext } from '../../App';

// -------------------------------------------------------------------------------------

const ProductsPage = () => {

    const products = useSelector(selectProducts);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState("");
    const [options, setOptions] = useState(null);


    const { setPageName } = useContext(PageNameContext)


    useEffect(() => {
        setPageName('Products')
        dispatch(fetchProducts());
        dispatch(getCategoriesNames()).then((res) => setOptions(res));


    }, [dispatch]);


    return (
        <>
            <Helmet>
                <title>Products</title>
            </Helmet>

            <Container>
                <Row>
                    <Col xs={12} sm={6}>
                        <Typeahead
                            variant="warning"
                            id="category"
                            labelKey="name"
                            label="Category"
                            options={options ? options : null}
                            selected={selectedOption}
                            onChange={(selected) => {
                                dispatch(fetchProductsByCategory( selected[0] ))

                            }}
                        />
                    </Col>
                </Row>
                <Row className='parent mt-4'>


                    {
                        loading ? (
                            <div class="spinner-border text-primary" role="status">
                                <span class="sr-only"></span>
                            </div>
                        ) :

                            error ? (<Col className='text-danger '>Error: {error}</Col>) :

                                products && (
                                    products.map((product) => (
                                        <Col key={product._id} xs={6} md={4} lg={3} className='mt-2 h-50' >
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

export default ProductsPage;