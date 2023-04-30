import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './reducers/productsSlice';
import thunk from 'redux-thunk';
import { cartSlice } from './reducers/cartSlice';

// --------------------------------------------------------------------

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: [thunk],
});
