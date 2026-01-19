import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import PublicRoutes from './components/PublicRoutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />

        </Route>


        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
