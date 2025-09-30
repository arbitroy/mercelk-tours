import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MercelkTours from './App'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MercelkTours />
  </StrictMode>,
)
