import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'

import './index.css'

import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-icons.css'
import './assets/css/swiper-bundle.min.css'
import './assets/css/aos.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)