import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'
import loadingSlice from './slices/loadingSlice'

export default configureStore({
  reducer: {
    cart: cartSlice,
    order: orderSlice,
    loading: loadingSlice
  }
})