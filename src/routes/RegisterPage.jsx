import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import { register } from '../lib/auth'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from '../context/main-context'

export default function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {
        profile: { setToken },
    } = useMainContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email && password) {
            await register({
                email,
                password,
                onSuccess: (token) => {
                    setToken(token)
                    navigate('/')
                },
            })
        }
    }

    return (
        <div className='mt-16'>
            <form
                onSubmit={handleSubmit}
                className='w-1/4 mx-auto flex flex-col gap-y-5'>
                <Input
                    type='email'
                    label='ایمیل'
                    placeholder='ایمیل خود را وارد کنید'
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required
                />
                <Input
                    type='password'
                    label='رمز عبور'
                    placeholder='رمز عبور خود را وارد کنید'
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required
                />
                <Button type='submit' variant='ghost' color='secondary'>
                    ثبت‌نام
                </Button>
            </form>
        </div>
    )
}
