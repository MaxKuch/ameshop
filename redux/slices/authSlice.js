import { createSlice } from "@reduxjs/toolkit"
import localStorageWorker from "../../utils/workers/localStorageWorker"

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorageWorker.getItem('token') || '',
        isAuth: localStorageWorker.getItem('auth') || false,
        isLoading: false,
        error: ''
    },
    reducers: {
        login: (state, action) => {
            console.log(action)
            state.token = action.payload
            state.isAuth = true

            localStorageWorker.setItem('token', action.payload)
            localStorageWorker.setItem('auth', true)
        },
        logout: (state) => {
            state.token = ''
            state.isAuth = false
            localStorageWorker.setItem('token', '')
            localStorageWorker.setItem('auth', false)
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { login, logout, setIsLoading, setError } = authSlice.actions

export default authSlice.reducer

