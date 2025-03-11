import React, { useContext, useEffect, useState } from "react";
import Posts from "../../components/common/Posts";
import EditProfileModal from "./EditProfileModal";
import useFollow from '../../hooks/useFollow'

import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  const [feedType, setFeedType] = useState("posts");
  const [userProfile, setUserProfile] = useState([])

  const { follow, isLoading } = useFollow()
  const { user } = useContext(AuthContext)

  const { username } = useParams()

  const isMyProfile = user.user._id === userProfile._id
  const amIFollowing = userProfile?.follower?.includes(user.user._id)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`http://localhost:3050/api/user/profile/${username}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const data = await response.json()

      if(response.ok) {
        setUserProfile(data)
      }
    }

    fetchUserProfile()
  }, [username])

  return (
    <div className="w-[800px] mx-auto flex flex-col">
      <div className="flex border border-gray-700 p-3">
        <h3 className="font-bold text-2xl text-white">Profile</h3>
      </div>
      <div className="p-3 border border-gray-700">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl text-white font-bold">{userProfile.fullName}</h3>
            <p className="text-sm text-gray-400">@{userProfile.username}</p>
          </div>
          {isMyProfile && <EditProfileModal />}
          {!isMyProfile && (
            <button 
            disabled={isLoading}
            className='w-[80px] font-bold text-white bg-blue-500 rounded-full py-2 mb-3'
            onClick={(e) => {
              e.preventDefault()
              follow(userProfile._id)
            }}  
          >
              {!isLoading && amIFollowing && "Unfollow"}
              {!isLoading && !amIFollowing && "Follow"}
          </button>
          )               
          }
        </div>

        <div className="mt-4">
          <p className="text-white">{userProfile.bio}</p>
          <div className="flex gap-3 mt-4">
            <p className="text-white font-bold">{userProfile?.following?.length} Following</p>
            <p className="text-white font-bold">{userProfile?.follower?.length} Followers</p>
          </div>
        </div>
      </div>
      <div className="flex border border-t-0 border-gray-700">
        <div 
          className="relative w-full text-center p-3 hover:bg-slate-800 border-r border-gray-700 cursor-pointer" 
          onClick={() => setFeedType("posts")}>
            Posts
          {feedType === "posts" && <div className="absolute w-[100px] h-1 left-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] rounded-full bg-sky-400"></div>}
        </div>

        <div 
          className="relative w-full text-center p-3 hover:bg-slate-800 cursor-pointer" 
          onClick={() => setFeedType("likes")}>
            Likes
          {feedType === "likes" && <div className="absolute w-[100px] h-1 left-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] rounded-full bg-sky-400"></div>}
        </div>
      </div>
      <Posts username={username} feedType={feedType} />
    </div>
  );
};

export default ProfilePage;
