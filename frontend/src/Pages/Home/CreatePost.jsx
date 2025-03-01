import React, { useState } from 'react'

const CreatePost = () => {
  const [text, setText] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(text)
  }

  return (
    <div className='border border-t-0 border-gray-700 px-7 pb-7'>
      <form onSubmit={handleSubmit} >
        <div className='border-b border-gray-700 mb-3'>
          <textarea
            className='w-full outline-none resize-none p-4 pl-0 bg-transparent'
            placeholder="What's happening?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        
        <button className='w-[70px] font-bold text-white bg-blue-500 rounded-full py-2'>
          {isPending ? 'Posting...' : 'Post'}
        </button>
        {error && <p className='text-red-400'>Something went wrong</p>}
      </form>
    </div>
  )
}

export default CreatePost