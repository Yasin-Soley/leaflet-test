import { useCallback, useEffect, useState } from 'react'
import { getAdById } from '../lib/ads'

export const useGetSingleAd = (id) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        try {
            const fetchedData = await getAdById(id)
            setData(fetchedData)
        } catch (error) {
            console.error('Error fetching ad data:', error)
        } finally {
            setIsLoading(false)
        }
    }, [id])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { isLoading, data, refetch: fetchData }
}
