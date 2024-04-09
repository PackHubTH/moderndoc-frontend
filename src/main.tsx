import 'preline'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import AppRoute from './AppRoute'
import { useUserStore } from './stores/userStore'

const queryClient = new QueryClient()

const { isLogin } = useUserStore.getState()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={process.env.VITE_GOOGLE_CLIENT_ID || ''}>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <AppRoute />
          <ToastContainer position="bottom-center" />
        </DndProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
)
