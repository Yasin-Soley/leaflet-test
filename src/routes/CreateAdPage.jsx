/* eslint-disable react/prop-types */
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Button, Input, Textarea } from '@nextui-org/react'
import { createAd } from '../lib/ads'
import { useNavigate } from 'react-router-dom'
import { useGetAds } from '../hooks/useGetAds'

const icon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

const LocationPicker = ({ onLocationSelect }) => {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng)
        },
    })
    return null
}

export default function CreateAdPage() {
    const navigate = useNavigate()

    const [location, setLocation] = useState(null)
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')

    const handleLocationSelect = (latlng) => {
        setLocation(latlng)
    }

    const { refetch: refetchAdsList } = useGetAds()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (location && mobile && address && description) {
            const adData = {
                location,
                mobile,
                address,
                description,
            }

            console.log({ adData })

            await createAd({
                data: adData,
                onSuccess: () => {
                    refetchAdsList()
                    navigate('/')
                },
            })
        }
    }

    return (
        <div>
            <h2 className='text-center font-bold my-5 text-blue-500'>
                ثبت آگهی
            </h2>
            <form
                onSubmit={handleSubmit}
                className='w-2/3 mx-auto grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                    <MapContainer
                        center={[35.6892, 51.389]} // Default center (Tehran, Iran)
                        zoom={13}
                        style={{ height: '400px', width: '100%' }}>
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        {location && <Marker position={location} icon={icon} />}
                        <LocationPicker
                            onLocationSelect={handleLocationSelect}
                        />
                    </MapContainer>
                </div>{' '}
                <div className='col-span-1 flex flex-col gap-4'>
                    <div>
                        <Input
                            type='text'
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            label='شماره همراه'
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type='text'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            label='آدرس'
                            required
                        />
                    </div>
                    <div>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            label='توضیحات'
                            required
                        />
                    </div>
                </div>
                <div className='col-span-full'>
                    <Button
                        className='w-1/5 mx-auto block text-white'
                        variant='solid'
                        color='success'
                        type='submit'>
                        ثبت آگهی
                    </Button>
                </div>
            </form>
        </div>
    )
}
