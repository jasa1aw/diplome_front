'use client'

import { createSlice } from '@reduxjs/toolkit';

const items = typeof window !== "undefined" ? localStorage.getItem('selectedProducts') : null;
let initialState;

if(items){
    initialState = {
        selectedProducts: JSON.parse(items),
    };
}else{
    initialState = {
        selectedProducts: [],
    };
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const existingProduct = state.selectedProducts.find(product => product.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                state.selectedProducts.push(action.payload);
            }
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
        },
        removeProduct: (state, action) => {
            state.selectedProducts = state.selectedProducts.filter(
                product => product.id !== action.payload
            );
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
        },
        updateProductQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const product = state.selectedProducts.find(product => product.id === id);
            if (product) {
                product.quantity = quantity;
                if (quantity === 0) {
                    state.selectedProducts = state.selectedProducts.filter(
                        product => product.id !== id
                    );
                }
            }
            localStorage.setItem('selectedProducts', JSON.stringify(state.selectedProducts));
        },
        clearCart: (state) => {
            state.selectedProducts = [];
            localStorage.removeItem('selectedProducts');
        },
    },
});

export const { addProduct, removeProduct, updateProductQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;