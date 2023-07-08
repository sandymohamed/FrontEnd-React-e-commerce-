import { createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../../axiosInstance';
// --------------------------------------------------------------------

const initialState = {
  products: [],

  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
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
    },
  },
});

export const { setProducts, setLoading, setError } = productsSlice.actions;

export const fetchProducts = () => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await AxiosInstance.get('/api/products/');
    dispatch(setProducts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchProductsByCategory = (cat) => async dispatch => {
 console.log(cat);
  try {
    dispatch(setLoading());
    let response;

    cat ?
     response = await AxiosInstance.get(`/api/products/category/${cat}`)
    : 
     response = await AxiosInstance.get('/api/products/')

    dispatch(setProducts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const getCategoriesNames = () => async dispatch => {
  try {
    const response = await AxiosInstance.get('/api/products/all-categories/');
    return response.data;

  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const postProduct = (data) => async dispatch => {
  try {
    dispatch(setLoading());
    const response = await AxiosInstance.post('/api/products/', data);
    dispatch(setProducts(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const selectProducts = state => state.products.products;
export const selectLoading = state => state.products.loading;
export const selectError = state => state.products.error;
