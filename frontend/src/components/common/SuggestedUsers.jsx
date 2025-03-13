import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { SuggestedUsersContext } from '../../context/SuggestedUsers'
import useFollow from '../../hooks/useFollow'
import avatar from '../../public/public/avatar-placeholder.png'

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
        dispatch({type: 'GET_SUGGESTED_USERS', payload: data})
      }
    }
    if(user) {
      getSuggestedUsers()
    }
  }, [])

  return (
    <div className='w-[300px] h-screensticky top-0 my-3'>
      <h3 className='text-lg font-bold mb-3'>Suggested users</h3>
      {suggestedUsers?.map(user => (
        <div key={user._id} className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <Link to={`/profile/${user?.username}`} className="w-12 rounded-full">
              <img className="rounded-full" src={avatar} />
            </Link>
            <Link to={`/profile/${user?.username}`} className='flex flex-col mb-3'>
              <p className='font-bold'>{user?.fullName}</p>
              <span className='text-gray-600'>@{user?.username}</span>
            </Link>       
            </div>

            <button 
              disabled={isLoading}
              className='w-[60px] font-bold text-sm text-white bg-blue-500 rounded-full px-2 py-2 mb-3'
              onClick={(e) => {
                e.preventDefault()
                follow(user._id)
              }}  
            >
                {isLoading ? "Loading..." : "Follow"}
            </button>
          </div>

      ))}
    </div>
  )
}

export default SuggestedUsers