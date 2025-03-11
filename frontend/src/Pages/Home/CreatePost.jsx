import React, { useContext, useState } from 'react'

import { AuthContext } from '../../context/AuthContext'
import { PostsContext } from '../../context/PostContext'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(PostsContext)

  const navigate = useNavigate()

  // HandleSubmit 
  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    const post = { text }
    
    const response = await fetch('http://localhost:3050/api/post/create', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setIsLoading(false)
    }

    if(response.ok) {
      setText('')
      setIsLoading(false)
      dispatch({type: 'CREATE_POST', payload: data})
      navigate(0)
    }
  }

  return (
    <div className='border border-t-0 border-gray-700 px-7 py-4'>
      <form onSubmit={handleSubmit} >
        <div className='border-b border-gray-700 mb-3'>
          <textarea
            className='w-full outline-none resize-none p-4 pl-0 bg-transparent'
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <button disabled={isLoading} className='w-[70px] font-bold text-white bg-blue-500 rounded-full py-2 mb-3'>
          {isLoading ? 'Posting...' : 'Post'}
        </button>
        {error && <p className='text-red-400'>{error}</p>}
      </form>
    </div>
  )
}

export default CreatePost