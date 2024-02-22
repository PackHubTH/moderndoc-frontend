import 'preline'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoute from './AppRoute'
import Navbar from './modules/navbar/pages'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT_ID || ''}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AppRoute />
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
