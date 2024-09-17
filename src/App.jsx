import { useMainContext } from './context/main-context'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'
import CreateAdPage from './routes/CreateAdPage'
import HomePage from './routes/HomePage'
import AdDetails from './routes/AdDetails'

export default function App() {
    const {
        profile: { token },
    } = useMainContext()

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: '/login',
                    element: token ? <HomePage /> : <LoginPage />,
                },
                {
                    path: '/register',
                    element: token ? <HomePage /> : <RegisterPage />,
                },
                {
                    path: '/create-ad',
                    element: token ? (
                        <CreateAdPage />
                    ) : (
                        <Navigate to={'/login'} />
                    ),
                },
                {
                    path: 'ads/:id',
                    element: token ? <AdDetails /> : <Navigate to={'/login'} />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}
