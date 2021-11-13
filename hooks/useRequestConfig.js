import { useSelector } from 'react-redux'

export default function useRequestConfig() {
    const { token } = useSelector(state => state.auth)
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}