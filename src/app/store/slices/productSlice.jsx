import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { END_POINT } from '@/config/end_point';

export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
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
        },
    }
})
export const {setProducts, appendProducts, handleDeletedProduct} = productSlice.actions



export const getProducts = () => async(dispatch) =>{
    try {
        const res = await axios.get(`${END_POINT}/api/product/getAllProducts`)
        dispatch(setProducts({products:res.data}))
        // console.log('res' + res);
    } catch (error) {
        alert("Ошибка при запросе post")
    }
}

export const createProduct = (data) => async(dispatch) => {
    axios.post(`${END_POINT}/api/product/addProduct`, data).then((res) => {
        dispatch(appendProducts({products: res.data}))
        console.log('Server response:', res.data);
    }).catch((error) => {
        console.error('Error submitting form:', error);
    });
}
export const editPost = (data) => async(dispatch) =>{
    try {
        const res = await axios.put(`${END_POINT}/api/product/editProduct`, data)
        dispatch(getProducts())
        // console.log('res' + res);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

export const deleteProduct = (id) => async(dispatch) =>{
    try {
        const res = await axios.delete(`${END_POINT}/api/post/deletePostByID/${id}`)
        dispatch(handleDeletedProduct(id))
        dispatch(getProducts())
        // console.log('res' + res);
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

export default productSlice.reducer