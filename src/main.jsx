import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { MainContextProvider } from './context/main-context'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MainContextProvider>
            <NextUIProvider>
                <App />
            </NextUIProvider>
        </MainContextProvider>
    </StrictMode>
)
