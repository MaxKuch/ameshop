import { createSlice } from "@reduxjs/toolkit"
import localStorageWorker from "../../utils/workers/localStorageWorker"

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        id: localStorageWorker.getItem('orderId')
    },
    reducers: {
        addOrder: (state, action) => {
            state.id = action.payload
            localStorageWorker.setItem('orderId', state.id)
        }
    }
})

export const { addOrder } = orderSlice.actions

export default orderSlice.reducer

