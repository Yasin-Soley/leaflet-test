import axios from 'axios'

export const BASE_URL = 'http://localhost:3000'

export const login = async ({ email, password, onSuccess }) => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, { email, password })

        onSuccess(res.data.accessToken)
    } catch (error) {
        console.log(error)
    }
}

export const register = async ({ email, password, onSuccess }) => {
    try {
        const res = await axios.post(`${BASE_URL}/users`, {
            email,
            password,
        })

        onSuccess(res.data.accessToken)
    } catch (error) {
        console.log(error)
    }
}
