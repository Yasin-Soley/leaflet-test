/* eslint-disable react/prop-types */
import { useState } from 'react'
import ReactPaginate from 'react-paginate'
import ClipLoader from 'react-spinners/ClipLoader'
import { useGetAds } from '../hooks/useGetAds'
import AdList from '../components/Layout/ads/AdList'

export default function HomePage() {
    const { isLoading, data } = useGetAds()

    !isLoading && console.log(data)

    return (
        <div className='w-[1140px] mx-auto my-10'>
            {isLoading ? (
                <div className='flex items-center justify-center'>
                    <ClipLoader color='#4fasva' />
                </div>
            ) : (
                <PaginatedItems items={data} itemsPerPage={4} />
            )}
        </div>
    )
}

function PaginatedItems({ itemsPerPage, items = [] }) {
    const [itemOffset, setItemOffset] = useState(0)

    const endOffset = itemOffset + itemsPerPage
    console.log(`Loading items from ${itemOffset} to ${endOffset}`)
    const currentItems = items.slice(itemOffset, endOffset)
    console.log({ items, currentItems })
    const pageCount = Math.ceil(items.length / itemsPerPage)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length
        setItemOffset(newOffset)
    }

    return (
        <>
            <AdList data={currentItems} />
            <ReactPaginate
                breakLabel='...'
                nextLabel='صفحه بعد'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='صفحه قبل'
                renderOnZeroPageCount={null}
                className='pagination'
                activeClassName='text-blue-600 font-bold'
                disabledClassName='cursor-not-allowed opacity-50'
                disabledLinkClassName='cursor-not-allowed'
            />
        </>
    )
}
