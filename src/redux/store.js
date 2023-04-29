import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './reducers/productsSlice';
import thunk from 'redux-thunk';

// --------------------------------------------------------------------

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
  middleware: [thunk],
});
