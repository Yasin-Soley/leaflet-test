/* eslint-disable react/prop-types */
import {
    Button,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@nextui-org/react'

export default function DeleteAD({ onAction }) {
    return (
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className='flex flex-col gap-1'>
                        حذف آگهی
                    </ModalHeader>
                    <ModalBody>
                        <p>آیا مطمئن هستید؟</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onPress={onClose}>
                            بستن
                        </Button>
                        <Button
                            color='danger'
                            variant='light'
                            onPress={onAction}>
                            حذف
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    )
}
