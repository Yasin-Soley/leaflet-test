import { Cookies } from 'react-cookie'

export const cookies = new Cookies()

export const loadPersistedData = (key) => {
    try {
        const serializedData = cookies.get(key)
        if (serializedData === null) {
            return null
        }
        return key === 'theme' ? serializedData : JSON.parse(serializedData)
    } catch (err) {
        console.log(err)
        return null
    }
}

export const persistData = (key, state) => {
    try {
        const serializedDate = key === 'theme' ? state : JSON.stringify(state)
        cookies.set(key, serializedDate, { path: '/' })
    } catch (err) {
        console.log(err)
    }
}
