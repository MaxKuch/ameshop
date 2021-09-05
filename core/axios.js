import axios from 'axios'
import { STRAPI_URL } from '../utils/urls'

export default axios.create({
    baseURL: STRAPI_URL
})