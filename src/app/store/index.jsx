import { configureStore } from '@reduxjs/toolkit'
// import authReducer from './slices/authSlice'
// import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'

export default configureStore({
    reducer: {
        // auth: authReducer,
        // product: productReducer,
        cart: cartReducer,
    },
})