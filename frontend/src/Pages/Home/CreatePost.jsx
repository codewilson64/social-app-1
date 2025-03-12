import React, { useContext, useRef, useState } from 'react'

import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

import { AuthContext } from '../../context/AuthContext'
import { PostsContext } from '../../context/PostContext'

import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)

  const imageRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(PostsContext)

  const navigate = useNavigate()

  const handleImgChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

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
          {image && (
            <div className='relative w-72 mx-auto'>
              <IoCloseSharp 
                className='absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                onClick={() => {
                  setImage(null);
                  imageRef.current.value = null;
                }}
              />
              <img src={image} className='w-full mx-auto h-72 object-contain rounded' />
            </div>
          )}
        </div>
        <div className='flex items-center gap-3'>
          <CiImageOn onClick={() => imageRef.current.click()} className='w-7 h-7 cursor-pointer'/>
          <input type='file' accept='image/*' hidden ref={imageRef} onChange={handleImgChange} />
          <button disabled={isLoading} className='w-[70px] font-bold text-white bg-blue-500 rounded-full py-2'>
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
        {error && <p className='text-red-400'>{error}</p>}
      </form>
    </div>
  )
}

export default CreatePost