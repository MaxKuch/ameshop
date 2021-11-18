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

export const valuesToFormData = async values => {
    const formData = new FormData()
    
    const data = Object.keys(values).reduce((data, key) => {
        if(values[key] === undefined || values[key] === null)
            return data
        if(typeof values[key] !== 'object') 
            return {...data, [key]: values[key]}
        if(values[key].fileList){
            for(const file of values[key].fileList) {
                if(file.originFileObj) 
                    formData.append(`files.${key}`, file.originFileObj, file.name)
            }
        }
        return data
    }, {})

    formData.append('data', JSON.stringify(data))

    return formData
}

export const fileToDataUrl = file => {
    return new Promise(resolve => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => resolve(fileReader.result)
    })   
}