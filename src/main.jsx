import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routers/Router.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Authprovider from './Providers/Authprovider'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
<RouterProvider router={router}></RouterProvider>
<ToastContainer
          position="top-right" 
          autoClose={2200} 
        />
      </Authprovider>         
    </QueryClientProvider>
  </StrictMode>,
)
