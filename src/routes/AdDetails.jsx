import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Modal, useDisclosure, Button } from '@nextui-org/react'
import ClipLoader from 'react-spinners/ClipLoader'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

import { useGetSingleAd } from '../hooks/useGetSingleAd'
import { deleteAd, editAd } from '../lib/ads'
import DeleteAD from '../modals/delete-ad'
import EditAD from '../modals/edit-ad'
import { useGetAds } from '../hooks/useGetAds'

const icon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

export default function AdDetails() {
    const navigate = useNavigate()

    const [modalType, setModalType] = useState('delete')

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const params = useParams()
    const adId = params.id
    const { data, isLoading, refetch } = useGetSingleAd(adId)

    const handleOpenModal = (type) => {
        setModalType(type)
        onOpen(type === 'delete' ? '' : 'xl')
    }

    const handleDelete = async () => {
        await deleteAd({ id: adId, onSuccess: () => navigate('/') })
    }

    const { refetch: refetchAdsList } = useGetAds()

    const handleEdit = async (data) => {
        await editAd({
            id: adId,
            data,
            onSuccess: () => {
                refetch()
                refetchAdsList()
                navigate(`/ads/${adId}`)
            },
        })
    }

    if (isLoading)
        return (
            <div className='flex items-center justify-center'>
                <ClipLoader color='#4fasva' />
            </div>
        )

    return (
        <>
            <div className='my-10 w-1/2 mx-auto'>
                <div className='flex items-center gap-x-4'>
                    <h4 className='font-bold text-lg'>آدرس: </h4>
                    <p>{data?.address || 'آدرسی یافت نشد'}</p>
                </div>
                <div className='flex items-center gap-x-4'>
                    <h4 className='font-bold text-lg'>شماره همراه: </h4>
                    <p>{data?.mobile || 'شماره همراه یافت نشد'}</p>
                </div>
                <div className='flex items-center gap-x-4'>
                    <h4 className='font-bold text-lg'>توضیحات:</h4>
                    <p>{data?.description || 'توضیحات یافت نشد'}</p>
                </div>
                <div>
                    <MapContainer
                        center={[35.6892, 51.389]} // Default center (Tehran, Iran)
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}>
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        {data?.location && (
                            <Marker position={data.location} icon={icon} />
                        )}
                    </MapContainer>
                </div>
                <div className='mt-4 flex items-center justify-center gap-x-4'>
                    <Button
                        variant='bordered'
                        color='danger'
                        onPress={() => handleOpenModal('delete')}>
                        حذف آگهی
                    </Button>
                    <Button
                        variant='solid'
                        color='primary'
                        onPress={() => handleOpenModal('edit')}>
                        ویرایش آگهی
                    </Button>
                </div>
            </div>
            <Modal
                classNames={{
                    backdrop: 'z-[999999999999]',
                    base: 'z-[999999999999]',
                    wrapper: 'z-[999999999999] pt-10',
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size={modalType === 'edit' ? '3xl' : 'lg'}>
                {modalType === 'delete' ? (
                    <DeleteAD onAction={handleDelete} />
                ) : (
                    <EditAD onAction={handleEdit} data={data} />
                )}
            </Modal>
        </>
    )
}
