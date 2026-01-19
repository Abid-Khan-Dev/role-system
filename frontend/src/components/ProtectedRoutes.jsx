import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import api from '../services/api';

function ProtectedRoutes() {
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        async function getMe() {
            try {
                const res = await api.get('/me');
                if (res.status === 200) {
                    setUser(res.data.user)
                    setIsLoggedIn(true)
                }
            } catch (error) {
                setIsLoggedIn(false)
            }
        }
        getMe()
    }, [])

    if (isLoggedIn == null) return <h1>Checking Auth</h1>


    return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoutes