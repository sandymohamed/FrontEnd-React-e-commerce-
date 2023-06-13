import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {  useNavigate, } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import '../../App.scss';
import Message from '../Message';
import { addShippingAddress, selectError, selectLoading, selectShihppingAddress } from '../../redux/reducers/orderSlice';

// --------------------------------------------------------------------
const schema = yup.object().shape({
    address: yup.string().required(" Address is required"),
    city: yup.string().required(" City is required"),
    postalCode: yup
        .string()
        .matches(/^\d{5}(-\d{4})?$/, "Invalid postal code")
        .required("Postal code is required"),
    country: yup.string().required("Country is required"),
    phone: yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number, add phone number like +201024586785').required('Phone number is required'),
})


// --------------------------------------------------------------------

const Shipping = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [alertVariant, setAlertVariant] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const showMessage = (message, variant) => {
        setAlertVariant(variant);
        setAlertMessage(message);
    };


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            address: '',
            city: '',
            postalCode: '',
            country: '',
            phone: '',
        }

    })


    const onSubmit = async (data) => {
        console.log(data);
        await dispatch(addShippingAddress(data)).then((res) => {
            navigate('/payment')
        }).catch((error) => {
            showMessage(`Failed ${error}❌`, 'danger');
        })

    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className='m-2 text-light'>
            {alertVariant && (
                <Message messageText={alertMessage} variant={alertVariant} />
            )}
            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicaddress">
                <Form.Label className='w-50 text-start ms-2'>Address</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="address"
                    {...register('address')}
                    isInvalid={!!errors.address}
                />
            </Form.Group>
            {errors.address && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.address.message}</Form.Text>}

            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicaddress">
                <Form.Label className='w-50 text-start ms-2'>city</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="city"
                    {...register('city')}
                    isInvalid={!!errors.city}
                />
            </Form.Group>
            {errors.city && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.city.message}</Form.Text>}

            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicaddress">
                <Form.Label className='w-50 text-start ms-2'>Postal Code</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="postalCode"
                    {...register('postalCode')}
                    isInvalid={!!errors.postalCode}
                />
            </Form.Group>
            {errors.postalCode && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.postalCode.message}</Form.Text>}

            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicaddress">
                <Form.Label className='w-50 text-start ms-2'>Country</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="country"
                    {...register('country')}
                    isInvalid={!!errors.country}
                />
            </Form.Group>
            {errors.country && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.country.message}</Form.Text>}

            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicaddress">
                <Form.Label className='w-50 text-start ms-2'>Phone number</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="phone"
                    {...register('phone')}
                    isInvalid={!!errors.phone}
                />
            </Form.Group>
            {errors.phone && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.phone.message}</Form.Text>}


            {
                loading ? (
                    <div class="spinner-border text-primary mt-2" role="status">
                        {/* <span class="sr-only">Loading...</span> */}
                    </div>
                ) : (
                    <Button className="btn buttons mt-5" type="submit">
                        Continue to payment
                    </Button>
                )}
            {error && <Form.Text className="text-danger m-1 position-absolute start-50 "  > <TiWarningOutline />  {error}</Form.Text>}

        </Form>
    )
}

export default Shipping