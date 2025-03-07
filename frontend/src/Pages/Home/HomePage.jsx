import React, { useState } from 'react'

import CreatePost from './CreatePost'
import Posts from '../../components/common/Posts'

const HomePage = () => {
  const [feedType, setFeedType] = useState('forYou')

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
      
      <Posts feedType={feedType}/>

    </div>
    )
}

export default HomePage