import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Chat from '../views/Chat'
import '../style/AIDialogStyle.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Chat />
  </StrictMode>,
)
