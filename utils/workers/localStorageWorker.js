const localStorageWorker = {
    setItem(key, item) {
        if(typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(item))
        }
    },
    getItem(key) {
        if(typeof window !== 'undefined') {
            return JSON.parse(window.localStorage.getItem(key))
        }
        return null
    }
} 

export default localStorageWorker