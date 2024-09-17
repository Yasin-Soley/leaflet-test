import { useEffect, useState } from 'react'
import { getAds } from '../lib/ads'

export const useGetAds = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getAds()
            if (data.length >= 0) setData(data)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    return { isLoading, data }
}
