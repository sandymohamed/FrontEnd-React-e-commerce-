import { createSlice } from '@reduxjs/toolkit';
import AxiosInstance from '../../axiosInstance';

// --------------------------------------------------------------------


const initialState={
    reviews:[],
    loading: true,
    error: null,

}