import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {dispatch} = useContext(AuthContext)

  const signup = async (username, fullName, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:3050/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({username, fullName, email, password}),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()

    if(!response.ok) {
      setIsLoading(false)
      setError(data.error)
    }
    if(response.ok) {
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({type: 'LOGIN', payload: data})
      setIsLoading(false)
    }
  }

  return { signup, error, isLoading }
}

export default useSignup