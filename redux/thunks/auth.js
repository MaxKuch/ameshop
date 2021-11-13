import axios from "../../core/axios"
import { login, setIsLoading, setError } from '../slices/authSlice'

export const loginThunk = (identifier, password) => async dispatch => {
    dispatch(setError(''))
    try {
        dispatch(setIsLoading(true))
        const { data } = await axios.post('/auth/local', {
            identifier,
            password
        })

        dispatch(login(data.jwt))
    } catch (error) {
        dispatch(setError('Ошибка при авторизации'))
        console.error(error)
    }
    finally {
        dispatch(setIsLoading(false))
    }
}