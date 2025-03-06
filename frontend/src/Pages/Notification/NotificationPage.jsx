import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { NotifsContext } from '../../context/NotifContext';

const NotificationPage = () => {
  const [error, setError] = useState(null)
  
  const { user } = useContext(AuthContext)
  const { notifs, dispatch } = useContext(NotifsContext)

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch('http://localhost:3050/api/notification/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer: ${user.token}`}
      })
      const data = await response.json()

      if(!response.data) {
        setError(data.error)
      }

      if(response.ok) {
        dispatch({type: 'GET_ALL_NOTIFS', payload: data})
      }
    }

    if(user) {
      fetchNotifications()
    }
  }, [])

  const handleDelete = async (e) => {
    e.preventDefault()
    
    const response = await fetch('http://localhost:3050/api/notification/delete', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const data = await response.json()

    if(!response.data) {
      setError(data.error)
    }

    if(response.ok) {
      dispatch({type: 'DELETE_NOTIFS'})
    }
  }

  return (
    <div className='w-[800px] mx-auto flex flex-col'>
      <div className='flex items-center justify-between border border-b-0 border-gray-700 p-3'>
        <h3 className='font-bold text-2xl text-white'>Notifications</h3>
        <button onClick={handleDelete}>Delete all</button>
      </div>
      <div className='border border-b-0 border-gray-700'>
        {notifs?.map((notification) => (
          <div key={notification._id} className='flex justify-between items-center px-4 py-4 border-b border-gray-700'>
            <div className='flex gap-2'>
              <Link to={`/profile/${notification.from.username}`}>
                <h3 className='font-bold text-white'>@{notification.from.username}</h3>           
              </Link>
              {notification.type === 'follow' ? 'Followed you' : 'Liked your post'}
            </div>           
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationPage