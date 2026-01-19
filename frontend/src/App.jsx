import { useEffect, useState } from 'react'

import './App.css'
import api from './services/api'

function App() {
  const [data, setData] = useState('')


  useEffect(() => {

    async function getData() {
      const res = await api.get('/')
      setData(res.data.someData)
    }

    getData()

  }, [])
  return (
    <>
      <h1 className='text-red-500'>Hello World</h1>
      <h1 className='text-blue-500'>{data}</h1>
    </>
  )
}

export default App
