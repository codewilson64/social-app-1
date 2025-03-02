import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage'
import SignupPage from './Pages/Auth/SignupPage'
import LoginPage from './Pages/Auth/LoginPage'
import NotificationPage from './Pages/Notification/NotificationPage'
import Sidebar from './components/common/Sidebar'
import ProfilePage from './Pages/Profile/ProfilePage'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Toaster } from 'react-hot-toast'
import SuggestedUsers from './components/common/SuggestedUsers'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <div className='flex max-w-7xl mx-auto'>
      {user && <Sidebar />}
      <Routes>
        <Route path='/' element={user ? <HomePage /> : <Navigate to='/login' />}/>
        <Route path='/signup' element={!user ? <SignupPage /> : <Navigate to='/' />}/>
        <Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />}/>
        <Route path='/notifications' element={user ? <NotificationPage /> : <Navigate to='/login' />}/>
        <Route path='/profile/:username' element={user ? <ProfilePage /> : <Navigate to='/login' />}/>
      </Routes>
      <SuggestedUsers />
      <Toaster />
    </div>
  )
}

export default App
