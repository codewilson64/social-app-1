import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { SuggestedUsersContext } from '../../context/SuggestedUsers'
import useFollow from '../../hooks/useFollow'

const SuggestedUsers = () => {
  const { suggestedUsers, dispatch } = useContext(SuggestedUsersContext)

  const { user } = useContext(AuthContext)

  const { follow, isLoading } = useFollow()

  useEffect(() => {
    const getSuggestedUsers = async () => {
      const response = await fetch('http://localhost:3050/api/user/suggested-users', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await response.json()

      if(response.ok) {
        localStorage.setItem('suggested_users', JSON.stringify(data))
        dispatch({type: 'GET_SUGGESTED_USERS', payload: data})
      }
    }
    if(user) {
      getSuggestedUsers()
    }
  }, [])

  return (
    <div className='w-[200px] h-screen sticky top-0 my-3'>
      <h3 className='text-lg font-bold mb-3'>Suggested users</h3>
      {suggestedUsers?.map(user => (
        <div key={user._id} className='flex items-center justify-between'>
          <Link to={`/profile/${user?.username}`} className='flex flex-col mb-3'>
            <p className='font-bold'>{user?.fullName}</p>
            <span className='text-gray-600'>@{user?.username}</span>
          </Link>        
          <div>
            <button 
              disabled={isLoading}
              className='w-[80px] font-bold text-white bg-blue-500 rounded-full py-2 mb-3'
              onClick={(e) => {
                e.preventDefault()
                follow(user._id)
              }}  
            >
                {isLoading ? "Loading..." : "Follow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SuggestedUsers