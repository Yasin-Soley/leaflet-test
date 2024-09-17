/* eslint-disable react/prop-types */
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link as uiLink,
    Button,
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useMainContext } from '../../context/main-context'

export default function Layout({ children }) {
    const {
        profile: { token, logout },
        main: { theme, setTheme },
    } = useMainContext()

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <>
            <header className='border-b'>
                <Navbar>
                    <NavbarBrand>
                        <p className='font-bold text-inherit'>آگهی مسکن</p>
                    </NavbarBrand>
                    <NavbarContent
                        className='hidden sm:flex gap-4'
                        justify='center'>
                        <NavbarItem isActive>
                            <Link color='foreground' to='/'>
                                صفحه اصلی
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link color='foreground' to='/create-ad'>
                                ایجاد آگهی
                            </Link>
                        </NavbarItem>
                    </NavbarContent>
                    <NavbarContent justify='end'>
                        {token ? (
                            <>
                                <NavbarItem>
                                    <Button
                                        color='danger'
                                        variant='bordered'
                                        onClick={logout}>
                                        خروج
                                    </Button>
                                </NavbarItem>
                            </>
                        ) : (
                            <>
                                <NavbarItem className='hidden lg:flex'>
                                    <Link to='/login'>ورود</Link>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button
                                        as={Link}
                                        color='primary'
                                        to='/register'
                                        variant='flat'>
                                        ثبت‌نام
                                    </Button>
                                </NavbarItem>
                            </>
                        )}
                        <NavbarItem>
                            <Button variant='faded' onClick={toggleTheme}>
                                {theme === 'dark' ? 'روشن' : 'تاریک'}
                            </Button>
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
            </header>

            <main>{children}</main>
        </>
    )
}
