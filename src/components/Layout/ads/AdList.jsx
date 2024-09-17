import AdItem from './AdItem'

/* eslint-disable react/prop-types */
export default function AdList({ data }) {
    return (
        <div className='flex gap-x-4'>
            {data.map((item) => {
                return <AdItem key={item.id} data={item} />
            })}
        </div>
    )
}
