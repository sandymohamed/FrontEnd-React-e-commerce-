import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardSketlon({ details = false, h=null, w=null }) {
    return (
        <Card className='m-2 boxShadow bg-dark rounded' style={{ height: `${ !h ? '60vh' : `${h}vh`}`, width: `${ !w ? '' : `${w}%`}` }}>
            <Card.Body className={`  ${details ? 'd-flex' : ''} `}>
                <div className={`bg-secondary  ${details ? 'h-100 w-50 d-flex' : 'h-50 w-100'} `} />

                <div className={`  ${details ? 'ms-2 w-50' : 'w-100'} `}>

                    <Card.Title className='bg-secondary   w-50 m-3 text-center' > --</Card.Title>
                    <Card.Text className='bg-secondary  w-100'>  -- </Card.Text>
                    <Button className='btn buttons w-50 '> -</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CardSketlon;