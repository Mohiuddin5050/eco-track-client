import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from './provider/AuthProvider.jsx'
import { RouterProvider } from 'react-router'
import router from './Routes/Router.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
