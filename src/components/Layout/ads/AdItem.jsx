import { Link } from 'react-router-dom'

/* eslint-disable react/prop-types */
export default function AdItem({ data }) {
    const { id, address } = data

    return (
        <Link
            to={`/ads/${id}`}
            className='p-5 border-2 rounded-md shadow-md flex-1 text-center'>
            {address}
        </Link>
    )
}
