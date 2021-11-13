import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import loadingSlice from './slices/loadingSlice'
import authSlice from './slices/authSlice'

export default configureStore({
  reducer: {
    cart: cartSlice,
    loading: loadingSlice,
    auth: authSlice
  }
})