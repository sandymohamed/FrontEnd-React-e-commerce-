import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import axios from 'axios';
// -------------------------------------------------------------------------------------

const ProductsPage = () => {
    const [productList, setProductList] = useState(null);

    useEffect(() => {

        const fetchProducts = async () => {

            const { data } = await axios.get('/products');
      
            setProductList(data);
      
          }
      
          fetchProducts();
    }, [productList]);



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
                <Row>
                    {productList && (
                        productList.map((product) => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3} className='mt-2'>
                                <ProductCard product={product} />
                            </Col>
                        )))}
                </Row>
            </Container>
        </>
    )
}

export default ProductsPage
