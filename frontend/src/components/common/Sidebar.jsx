import React, { useContext } from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Xsvg from '../svgs/X'
import { Link } from 'react-router-dom'
import useLogout from '../../hooks/useLogout';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useLogout()
  const { user } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <div className='flex flex-col justify-between h-screen sticky top-0'>
      <div className='flex flex-col gap-7 text-lg cursor-pointer'>
        <Link to='/'>
            <Xsvg className='w-12 h-12 fill-white'/>
        </Link>
        <Link to='/' className='flex items-center gap-6'>
          <MdHomeFilled className='w-8 h-8'/>
          Home
        </Link>
        <Link to='/notifications' className='flex items-center gap-6'>
          <IoNotifications className='w-8 h-8'/>
          Notifications
        </Link>
        <Link to={`/profile/${user.user.username}`} className='flex items-center gap-6'>
          <FaUser className='w-8 h-8'/>
          Profile
        </Link>
      </div>

      {user && (
        <Link to={`/profile/${user.user.username}`} className='flex mb-10'>
          <div>
            <h3 className='font-bold'>{user.user.fullName}</h3>
            <p className='text-gray-400'>@{user.user.username}</p>
          </div>
          <div>
            <BiLogOut className='w-5 h-5 cursor-pointer' onClick={handleLogout}/>
          </div>
        </Link>
      )}
    </div>
  )
}

export default Sidebar