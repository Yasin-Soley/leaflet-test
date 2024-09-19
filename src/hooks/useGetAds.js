import { useCallback, useEffect, useState } from 'react'
import { getAds } from '../lib/ads'

export const useGetAds = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        try {
            const data = await getAds()
            if (data.length >= 0) setData(data)
        } catch (error) {
            console.error('Error fetching ad data:', error)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { isLoading, data, refetch: fetchData }
}
