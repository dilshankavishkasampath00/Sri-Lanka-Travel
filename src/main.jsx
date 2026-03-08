import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GoogleMapsProvider } from './context/GoogleMapsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GoogleMapsProvider>
        <App />
      </GoogleMapsProvider>
    </AuthProvider>
  </StrictMode>,
)
