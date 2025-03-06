import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { PostsContextProvider } from './context/PostContext.jsx'
import { SuggestedUsersContextProvider } from './context/SuggestedUsers.jsx'
import { NotifsContextProvider } from './context/NotifContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SuggestedUsersContextProvider>
      <AuthContextProvider>
        <PostsContextProvider>
          <NotifsContextProvider>
              <BrowserRouter>
                <App />   
              </BrowserRouter>
          </NotifsContextProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </SuggestedUsersContextProvider>
  </StrictMode>,
)
