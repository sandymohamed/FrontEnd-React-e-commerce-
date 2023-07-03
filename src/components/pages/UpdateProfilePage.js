import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectLoading, selectUser, updateProfile } from '../../redux/reducers/userSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { TiWarningOutline } from 'react-icons/ti';
import '../../App.scss';
import Message from '../Message';

// --------------------------------------------------------------------

const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email('Invalid email'),
    password: yup.string(),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
    ,
});
// --------------------------------------------------------------------

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const [alertVariant, setAlertVariant] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');

    const showMessage = (message, variant) => {
        setAlertVariant(variant);
        setAlertMessage(message);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data) => {

        try {
            await dispatch(updateProfile(data));
            showMessage('Profile Updated Successfully✔', 'warning');
        } catch (error) {
            showMessage('Profile Update failed❌', 'danger');
        }
    };

    useEffect(() => {

    }, [user])

    return (
        <Form onSubmit={handleSubmit(onSubmit)} className='w-100 text-start'>
            {alertVariant && (
                <Message messageText={alertMessage} variant={alertVariant} />
            )}
            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicfirstName">
                <Form.Label className='w-50'>First Name</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="firstName"
                    {...register('firstName')}
                    isInvalid={!!errors.firstName}
                />
            </Form.Group>
            {errors.firstName && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.firstName.message}</Form.Text>}


            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicLastName">
                <Form.Label className='w-50'>Last Name</Form.Label>
                <Form.Control
                    className='w-50'
                    type="text"
                    name="lastName"
                    {...register('lastName')}
                    isInvalid={!!errors.lastName}
                />
            </Form.Group>
            {errors.lastName && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.lastName.message}</Form.Text>}


            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicEmail">
                <Form.Label className='w-50'>Email address</Form.Label>
                <Form.Control
                    className='w-50'
                    type="email"
                    name="email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                />

            </Form.Group>
            {errors.email && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.email.message}</Form.Text>}


            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicPassword">
                <Form.Label className='w-50'>New Password</Form.Label>
                <Form.Control
                    className='w-50'
                    type="password"
                    name="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                />

            </Form.Group>
            {errors.password && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.password.message}</Form.Text>}


            <Form.Group className='d-flex justify-content-between align-items-center mt-5 fs-5 lh-base' controlId="formBasicConfirmPassword">
                <Form.Label className='w-50'>Confirm Password</Form.Label>
                <Form.Control
                    className='w-50'
                    type="password"
                    name="confirmPassword"
                    {...register('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                />

            </Form.Group>
            {errors.confirmPassword && <Form.Text className="text-danger m-1 position-absolute start-50 "  >{errors.confirmPassword.message}</Form.Text>}
            {
                loading ? (
                    <div class="spinner-border text-primary mt-2" role="status">
                    </div>
                ) : (
                    <div className="w-50 position-relative bottom-0 start-50 mt-5 overflow-hidden">
                    <button className=" w-25 btn buttons " type="submit">
                        Update Profile
                    </button>
                 </div>
                )}
            {error && <Form.Text className="fs-4 text-danger d-block"> <TiWarningOutline /> {error}</Form.Text>}

        </Form>
    );
};

export default UpdateProfile;
