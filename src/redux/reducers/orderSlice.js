import { createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../../axiosInstance';
// --------------------------------------------------------------------



const initialState = {
    shihppingAddress: {},
    paymentMethods: '',
    paymentResult: {},
    order: {},
    loading: false,
    error: null,
}


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setShihppingAddress(state, action) {
            state.shihppingAddress = action.payload;
            state.loading = false;
            state.error = null;

        },
        setPaymentResult(state, action) {
            console.log(action);
            state.paymentResult = action.payload;
            state.loading = false;
            state.error = null;

        },
        setPaymentMethods(state, action) {
            console.log(action);
            state.paymentMethods = action.payload;
            state.loading = false;
            state.error = null;

        },
        setOrder(state, action) {
            state.order = action.payload;
            state.loading = false;
            state.error = null;

        },
        setLoading(state) {
            state.loading = true;
            state.error = null;

        },
        setError(state, action) {
            state.loading = false;
            state.error = action.payload;

        }
    }

})

const { setShihppingAddress, setPaymentResult, setPaymentMethods ,setOrder, setLoading, setError } = orderSlice.actions;

export const addShippingAddress = (data) => async (dispatch) => {

    try {
        dispatch(setLoading());
        // const response = await AxiosInstance.post('api/order/', data)
        dispatch(setShihppingAddress(data));

    } catch (error) {
        dispatch(setError('Invalid data'));

    }
};

export const addPaymentResult = (data) => async (dispatch) => {

    try {
        dispatch(setLoading());
        // const response = await AxiosInstance.post('api/order/', data)
        dispatch(setPaymentResult(data));

    } catch (error) {
        dispatch(setError('Invalid data'));

    }
};

export const addOrder = (data) => async (dispatch) => {

    try {
        dispatch(setLoading());
        const response = await AxiosInstance.post('api/order/', data)
        dispatch(setOrder(response.data));



    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Server returned an error response with data
            dispatch(setError('Invalid data'));
        } else if (error.request) {
            // Request made but no response received
            dispatch(setError('Request failed. Please try again.'));

        }
        else {
            // Something else happened
            dispatch(setError('An unexpected error occurred.'));
        }
    }
};

export const selectShihppingAddress = state => state?.order?.shihppingAddress;
export const selectPaymentResult = state => state?.order?.paymentResult;
export const selectPaymentMethods = state => state?.order?.paymentMethods;

export const selectOrder = state => state?.order?.order;
export const selectLoading = state => state?.order?.loading;
export const selectError = state => state?.order?.error;
