import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import { signUp, selectLoading, selectError } from '../../redux/reducers/userSlice';
import { Form, Button, Container } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import '../../App.scss';
// -------------------------------------------------------------------------------------

const schema = yup.object().shape({
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    email: yup.string().required('email is required'),
    password: yup.string().required('Password is required'),
})
// -------------------------------------------------------------------------------------


const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);



    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })



    const onSubmit = async(data) => {

        await dispatch(signUp(data)).then(() => {
            navigate(location.state?.from || '/')
        }) 

    };

    return (
        <Container className='mt-4 p-4   '>
            <Form onSubmit={handleSubmit(onSubmit)} className='mt-3 w-100'  >

                <Form.Group className="mt-4 p-2 " controlId="formFirstName">
                    <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        className={errors.firstName ? 'form-control-error' : 'form-control'}
                        {...register('firstName')}
                    />
                    {errors.firstName && <Form.Text className="text-danger">{errors.firstName.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mt-4 p-2 " controlId="formLastName">
                    <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        className={errors.lastName ? 'form-control-error' : 'form-control'}
                        {...register('lastName')}
                    />
                    {errors.lastName && <Form.Text className="text-danger">{errors.lastName.message}</Form.Text>}

                </Form.Group>

                <Form.Group className="mt-4 p-2 " controlId="formEmail">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        className={errors.email ? 'form-control-error' : 'form-control'}
                        {...register('email')}

                    />
                    {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mt-4 p-2 " controlId="formPassword">
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className={errors.password ? 'form-control-error' : 'form-control'}
                        {...register('password')}

                    />
                    {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}

                </Form.Group>

                {
                    loading ? (
                        <div class="spinner-border text-primary mt-2" role="status">
                            {/* <span class="sr-only">Loading...</span> */}
                        </div>
                    ) : (
                        <Button className="btn buttons mt-2" type="submit">
                            Sign Up
                        </Button>
                    )}

                <Link to={'/login'} className="text-light d-block">
                    Have an account?
                </Link>
            </Form>
            {error && <Form.Text className="fs-4 text-danger d-block"> <TiWarningOutline /> {error}</Form.Text>}

        </Container>
    );
};

export default Signup;
