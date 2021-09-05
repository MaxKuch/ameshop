import { STRAPI_URL } from "../urls"

export const fromFileToUrl = src => {
    if (!src) return null
    if(src.indexOf('/') === 0) return `${STRAPI_URL}${src}`
    return src
}

export const timeFormatter = seconds => {
    const minutes = Math.floor(seconds/60)
    const sec =  Math.floor(seconds%60)
    return `${minutes > 9 ? minutes: `0${minutes}`}:${sec > 9 ? sec: `0${sec}`}`
}