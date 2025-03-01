import React from 'react'
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NotificationPage = () => {
  const Notifications = [
    {
      _id: '1',
      from : {
        _id: '2',
        username: 'wilson64'
      },
      type: 'follow'
    },
    {
      _id: '2',
      from : {
        _id: '3',
        username: 'chealsea23'
      },
      type: 'like'
    }
  ]

  const handleDelete = (e) => {
    e.preventDefault()
    console.log('Notification deleted')
  }

  return (
    <div className='w-[800px] mx-auto flex flex-col'>
      <div className='flex border border-b-0 border-gray-700 p-3'>
        <h3 className='font-bold text-2xl text-white'>Notifications</h3>
      </div>
      <div className='border border-b-0 border-gray-700'>
        {Notifications.map((notification) => (
          <div key={notification._id} className='flex justify-between items-center px-4 py-4 border-b border-gray-700'>
            <div className='flex gap-2'>
              <Link to={`/profile/${notification.from.username}`}>
                <h3 className='font-bold text-white'>@{notification.from.username}</h3>           
              </Link>
              {notification.type === 'follow' ? 'Followed you' : 'Liked your post'}
            </div>           
            <FaTrash className='w-4 h-4 cursor-pointer' onClick={handleDelete}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationPage