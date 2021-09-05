import { createSlice } from "@reduxjs/toolkit"
import localStorageWorker from "../../utils/workers/localStorageWorker"

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: localStorageWorker.getItem('products') || [],
        orderId: localStorageWorker.getItem('orderId')
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
            localStorageWorker.setItem('products', state.products)
        },
        removeProduct(state, action) {
            state.products = state.products.filter(product => product.slug !== action.payload)
            localStorageWorker.setItem('products', state.products)
        },
        increment(state, action) {
            state.products.find(product => product.slug === action.payload).amount++
            localStorageWorker.setItem('products', state.products)
        },
        decrement(state, action) {
            const product = state.products.find(product => product.slug === action.payload)
            if(product.amount > 1) {
                product.amount--
                localStorageWorker.setItem('products', state.products)
            }
        }
    }
})

export const { addProduct, removeProduct, increment, decrement } = cartSlice.actions

export default cartSlice.reducer

