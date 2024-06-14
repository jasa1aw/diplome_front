import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { END_POINT } from '@/config/end_point';
import { jwtDecode } from 'jwt-decode';

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
let initialState = {
    isAuth: false,
    currentUser: null,
    tokenExt: 0, 
    error: null
}


if (token) {
    let decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 >= Date.now()) {
        initialState = {
            isAuth: true,
            currentUser: {
                id: decodedToken.id,
                email: decodedToken.email,
                full_name: decodedToken.full_name,
                isAdmin: decodedToken.isAdmin,
            },
            tokenExt: decodedToken.exp
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        localStorage.removeItem("token")
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authorize: (state, action) => {
            localStorage.setItem('token', action.payload.token)
            const decoded = jwtDecode(action.payload.token)
            state.currentUser = {
                id: decodedToken.id,
                email: decodedToken.email,
                full_name: decodedToken.full_name,
                isAdmin: decodedToken.isAdmin,
            }
            state.isAuth = true;
            state.tokenExt = decoded.exp
        },
        logOut: (state) => {
            state.isAuth = false;
            state.currentUser = {};
            state.tokenExt = 0
            localStorage.removeItem("token")
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { authorize, logOut, setError } = authSlice.actions

export const LogIn = (email, password) => (dispatch) => {
    axios.post(`${END_POINT}/api/auth/login`, {
        email,
        password
    }).then(res => {
        dispatch(authorize(res.data))
    }).catch(e => {
        console.error(e.response)
        if (e.response && e.response.data && e.response.data.message) {
            dispatch(setError(e.response.data.message));
        }
    })
}

export default authSlice.reducer