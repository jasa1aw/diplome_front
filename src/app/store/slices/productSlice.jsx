import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from '@/config/end_point';

export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        loading: false,
        productToEdit : null
    },
    reducers:{
        setProducts:(state,action) => {
            state.products = action.payload.products
        },
        appendProducts:(state,action) => {
            state.products = [...state.products, action.payload.products]
        },
        handleDeletedProduct:(state, action) => {
            let products = [...state.products]
            products = products.filter(item => item.id !== action.payload)
            state.products = products;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProductToEdit: (state, action) => {
            state.productToEdit = action.payload;
        },
    }
})
export const {setProducts, appendProducts, handleDeletedProduct, setLoading, setProductToEdit} = productSlice.actions;

export const getProducts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get(`${END_POINT}/api/product/getAllProducts`);
        dispatch(setProducts({ products: res.data }));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false));
        alert("Ошибка при запросе post");
    }
}

export const createProduct = (data) => async(dispatch) => {
    axios.post(`${END_POINT}/api/product/addProduct`, data).then((res) => {
        dispatch(appendProducts({products: res.data}));
    }).catch((error) => {
        console.error('Error submitting form:', error);
    });
}
export const editProduct = (data) => async(dispatch) =>{
    try {
        const res = await axios.put(`${END_POINT}/api/product/editProduct`, data);
        dispatch(getProducts());
        setProductToEdit(null);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

export const deleteProduct = (id) => async(dispatch) =>{
    try {
        const res = await axios.delete(`${END_POINT}/api/product/deleteProduct/${id}`);
        dispatch(handleDeletedProduct(id));
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

export default productSlice.reducer