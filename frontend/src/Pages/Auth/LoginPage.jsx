import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useLogin from '../../hooks/useLogin'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin(AuthContext)
  
  const handleLogin = async (e) => {
    e.preventDefault()
    await login(username, password)
  }
  
    return (
      <div className='max-w-screen-xl mx-auto flex items-center h-screen'>
        <form onSubmit={handleLogin}>
          <h1 className='text-4xl font-extrabold text-white mb-3'>Let's go.</h1>
          <div className='w-[300px] flex flex-col gap-4'>
          <div className='flex flex-col'>
            <label className='mb-2'>Username:</label>
            <input 
              className='border border-gray-500 px-3 py-2 outline-none'
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label className='mb-2'>Password:</label>
            <input
              className='border border-gray-500 px-3 py-2 outline-none' 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          </div>
          <div className='flex flex-col mt-4 gap-3'>
            <button disabled={isLoading} className='w-full bg-blue-500 text-white rounded-full py-3'>
              {isLoading ? 'Loading...' : 'Login'}  
            </button>      
            {error && <p className='text-red-400'>{error}</p>}
            <p>Don't have an account?</p>
            <Link to={'/signup'}>
              <button className='w-full text-blue-500 border-2 border-blue-500 rounded-full py-3'>Sign up</button>
            </Link>
        </div>
        </form>
      </div>
  )
}

export default LoginPage