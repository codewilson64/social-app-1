import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const useFollow = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const follow = async (_id) => {
    setIsLoading(true)

    const response = await fetch(`http://localhost:3050/api/user/follow/${_id}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setIsLoading(false)
    }

    if(response.ok) {
      localStorage.removeItem(_id)
      navigate(0)
      setIsLoading(false)
    }
  }

  return { follow, error, isLoading }
}

export default useFollow