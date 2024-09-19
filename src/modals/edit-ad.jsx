/* eslint-disable react/prop-types */
import {
    Button,
    Input,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from '@nextui-org/react'
import { useState } from 'react'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'

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

export default function EditAD({ onAction, data }) {
    const [location, setLocation] = useState(data.location || null)
    const [mobile, setMobile] = useState(data.mobile || '')
    const [address, setAddress] = useState(data.address || '')
    const [description, setDescription] = useState(data.description || '')

    const handleLocationSelect = (latlng) => {
        setLocation(latlng)
    }

    const handleSubmit = async () => {
        if (location && mobile && address && description) {
            const newAdData = {
                location,
                mobile,
                address,
                description,
            }
            await onAction(newAdData)
        }
    }

    return (
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className='flex flex-col gap-1'>
                        ویرایش آگهی
                    </ModalHeader>
                    <ModalBody>
                        <div className='flex flex-col gap-4'>
                            <MapContainer
                                center={[35.6892, 51.389]} // Default center (Tehran, Iran)
                                zoom={13}
                                style={{ height: '200px', width: '100%' }}>
                                <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                                {location && (
                                    <Marker position={location} icon={icon} />
                                )}
                                <LocationPicker
                                    onLocationSelect={handleLocationSelect}
                                />
                            </MapContainer>
                            <div className=' flex flex-col gap-4'>
                                <div>
                                    <Input
                                        type='text'
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                        label='شماره همراه'
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        type='text'
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        label='آدرس'
                                        required
                                    />
                                </div>
                                <div>
                                    <Textarea
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        label='توضیحات'
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onPress={onClose}>
                            بستن
                        </Button>
                        <Button
                            className='text-white'
                            variant='solid'
                            color='success'
                            type='submit'
                            onPress={() => {
                                handleSubmit()
                                onClose()
                            }}>
                            ویرایش آگهی
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    )
}
