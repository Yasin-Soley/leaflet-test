/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'
import {
    loadPersistedData,
    cookies,
    persistData,
} from '../common/utils/cookie-services'
import { useNavigate } from 'react-router-dom'

const MainContext = createContext({
    main: {
        theme: 'dark',
        setTheme: () => {},
    },
    profile: {
        token: null,
        setToken: () => {},
        logout: () => {},
    },
})

export const useMainContext = () => useContext(MainContext)

export const MainContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        loadPersistedData('theme') ? loadPersistedData('theme') : 'dark'
    )
    const [token, _setToken] = useState(cookies.get('token', { path: '/' }))

    useEffect(() => {
        persistData('theme', theme)
        if (theme === 'dark') document.documentElement.classList.add('dark')
        else document.documentElement.classList.remove('dark')
    }, [theme])

    const setToken = (token, internalNavigation = true) => {
        cookies.set('token', token, { path: '/' })
        if (internalNavigation) _setToken(token)
    }

    const logout = () => {
        cookies.remove('token')
        _setToken('')
    }

    return (
        <MainContext.Provider
            value={{
                main: {
                    theme,
                    setTheme,
                },
                profile: {
                    token,
                    setToken,
                    logout,
                },
            }}>
            {children}
        </MainContext.Provider>
    )
}
