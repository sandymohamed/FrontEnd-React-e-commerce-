import { createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../../axiosInstance';
// --------------------------------------------------------------------

const initialState = {
    user: null,
    items: [],
    totalQuantity: 0,
    total: 0,
    error: null,

}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            
            // console.log(newItem);
            state.error = null;
            
            const existingItem = state.items.find(item => item._id === newItem._id);
            // console.log(existingItem);
            
            state.user = newItem?.user;
            state.totalQuantity++;

            if (newItem.countInStock >= 1) {

                if (!existingItem) {
                    state.items.push({
                        _id: newItem._id,
                        price: newItem.price,
                        quantity: 1,
                        totalPrice: newItem.price,
                        name: newItem.name,
                        image: newItem.image,
                        brand: newItem.brand,
                        countInStock: newItem.countInStock,


                    })

                    state.total = state.total + newItem.price;

                } else {
                    existingItem.quantity = existingItem.quantity + 1;
                    existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                    state.total = state.total + newItem.price;

                }
            }
        },

        removeItem(state, action) {
            state.error = null;
            const item = action.payload;
            const existingItem = state.items.find(piece => piece._id === item._id);
            state.totalQuantity--;
            state.total = state.total - item.price;


            if (existingItem?.quantity >= 0) {

                if (existingItem?.quantity === 1) {
                    existingItem.quantity = existingItem.quantity - 1;
                    state.items = state.items.filter(item => item.quantity > 0);


                } else {
                    existingItem.quantity = existingItem.quantity - 1;
                    existingItem.totalPrice = existingItem.totalPrice - existingItem.price;


                }
            }
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.total = 0;
            state.error = null;
        },
        setError(state, action) {
            state.loading = false;
            state.error = action.payload;

        }
    }
})

export const { addItem, removeItem, clearCart, setError } = cartSlice.actions;

export const addCart = (data) => async (dispatch, getState) => {
    console.log(data);
    try {
        dispatch(addItem(data));
        
        const cartState = getState().cart;
        const response = await AxiosInstance.post('/api/carts/', cartState);
        console.log(cartState);
        console.log('res: ', response);

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


export const removeItemFromCart = (data) => async (dispatch, getState) => {
    try {
        dispatch(removeItem(data));

        const cartState = getState().cart;
        const response = await AxiosInstance.post('api/cart/', cartState);

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


export const removeCart = (id) => async (dispatch) => {
    try {
        const response = await AxiosInstance.delete('api/cart/:id',);
        dispatch(removeItem());

    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Server returned an error response with data
            dispatch(setError('ID not found!'));
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

export const selectCartItems = state => state.cart.items;
export const selectTotal = state => state.cart.total;
export const selectTotalQuantity = state => state.cart.totalQuantity;