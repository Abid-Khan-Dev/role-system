import React, { useState } from 'react'
import api from '../services/api';

import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({

        email: '',
        password: ''
    })
    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        const res = await api.post('http://localhost:3000/login', form)
        if (res.status === 200) {
            navigate('/')
        }
    }
    return (
        <div className='h-screen flex justify-center items-center bg-gradient-to-b from-blue-200 to-blue-100 via-blue-400'>
            <div className='p-6 w-md bg-gray-200 bg-gradient-to-r from-blue-200 to-blue-50 rounded-lg'>
                <h1 className='text-2xl font-bold text-blue-500 text-center mb-10'>Login</h1>
                <form className='space-y-3' onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email" className='block font-medium text-sm text-gray-700 mb-1'>Email</label>
                        <input type="text" id='email' className='w-full px-4 py-2  bg-gray-200 outline-0 focus:ring focus:ring-blue-600 border border-gray-300 shadow rounded-xl' name='email' value={form.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password" className='block font-medium text-sm text-gray-700 mb-1'>Password</label>
                        <input type="password" id='password' className='w-full px-4 py-2  bg-gray-200 outline-0 focus:ring focus:ring-blue-600 border border-gray-300 shadow rounded-xl' name='password' value={form.password} onChange={handleChange} />
                    </div>
                    <button className='px-4 py-2 w-full bg-gradient-to-r from-blue-400 to-blue-600 hover:via-blue-800 text-white font-semibold rounded-xl '>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login