import { useEffect, useState } from 'react'

import './App.css'
import api from './services/api'

function App() {
  const [data, setData] = useState('')
  const [user, setUser] = useState('')


  useEffect(() => {

    async function getData() {
      const res = await api.get('/')
      setData(res.data.someData)
    }


    async function getMe() {
      const res = await api.get('/me')
      setUser(res.data.user)
    }

    getData()
    getMe()

  }, [])
  return (
    <>
      <h1 className='text-red-500'>Hello World</h1>
      {user.role === 'admin' && <h1 className='text-red-500'>{data}</h1>}
      {/* <h1 className='text-blue-500'>{data}</h1> */}
    </>
  )
}

export default App
