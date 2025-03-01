import React, { useContext, useEffect, useState } from 'react'

import CreatePost from './CreatePost'
import Posts from '../../components/common/Posts'

import { PostsContext } from '../../context/PostContext';
import { AuthContext } from '../../context/AuthContext';

const HomePage = () => {
  const [feedType, setFeedType] = useState('forYou')
  const { posts, dispatch } = useContext(PostsContext)
  const { user } = useContext(AuthContext)

  const getPostEndpoint = () => {
    switch(feedType){
      case 'forYou': 
        return 'http://localhost:3050/api/post/all-post'
      case 'following':
        return 'http://localhost:3050/api/post/followingposts'
      default:
        return 'http://localhost:3050/api/post/all-post'
    }
  }

  const POST_ENDPOINT = getPostEndpoint()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(POST_ENDPOINT, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const data = await response.json()

      if(response.ok) {
        dispatch({type: 'GET_ALL_POST', payload: data})
        console.log(data)
      }
    }
    if(user) {
      fetchPosts()
    }
  }, [feedType])

  return (
    <div className='w-[800px] mx-auto flex flex-col'>
      <div className='flex border border-gray-700'>
        <div 
          className='relative w-full text-center p-3 hover:bg-slate-800 border-r border-gray-700 cursor-pointer'
          onClick={() => setFeedType('forYou')}
        >
          For You
          {feedType === 'forYou' && (
            <div className='absolute w-[100px] h-1 left-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] rounded-full bg-sky-400'></div>
          )}
        </div>

        <div 
          className='relative w-full text-center p-3 hover:bg-slate-800 cursor-pointer'
          onClick={() => setFeedType('following')}
        >
          Following
          {feedType === 'following' && (
            <div className='absolute w-[100px] h-1 left-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] rounded-full bg-sky-400'></div>
          )}
        </div>
      </div>

      <CreatePost />
      
      {posts && posts.map((post) => (
        <Posts key={post._id} post={post}/>
      ))}
    </div>
    )
}

export default HomePage