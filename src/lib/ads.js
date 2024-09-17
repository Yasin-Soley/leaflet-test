import axios from 'axios'
import { BASE_URL } from './auth'

export const getAds = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/ads`)
        // console.log({ res })
        return res.data
    } catch (error) {
        console.log({ error })
    }
}

export const createAd = async ({ data, onSuccess }) => {
    console.log(data)
    try {
        await axios.post(`${BASE_URL}/ads`, { ...data })
        onSuccess()
    } catch (error) {
        console.log({ error })
    }
}

export const getAdById = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/ads/${id}`)

        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteAd = async ({ id, onSuccess }) => {
    try {
        await axios.delete(`${BASE_URL}/ads/${id}`)
        onSuccess()
    } catch (error) {
        console.log(error)
    }
}
export const editAd = async ({ id, data, onSuccess }) => {
    try {
        await axios.put(`${BASE_URL}/ads/${id}`, { ...data })
        onSuccess()
    } catch (error) {
        console.log(error)
    }
}
