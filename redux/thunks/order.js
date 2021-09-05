import { addOrder } from "../slices/orderSlice"
import axios from '../../core/axios'
import { setLoading } from "../slices/loadingSlice"

export const addOrderThunk = () => async (dispatch, getState) => {
    const { cart, order } = getState()
    dispatch(setLoading(true))
    if(order.id) {
        await axios.put(`/orders/${order.id}`, {
            status: 'InCart',
            Item: cart.products.map(({amount, id}) => ({Count: amount, product: id}))
        })
        dispatch(setLoading(false))
        return
    }

    const {data: orderId} = await axios.post('/orders', {
        status: 'InCart',
        Item: cart.products.map(({amount, id}) => ({Count: amount, product: id}))
    })

    dispatch(setLoading(false))

    dispatch(addOrder(orderId.id))
}