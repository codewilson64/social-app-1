import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from "../../context/AuthContext";
import { PostsContext } from "../../context/PostContext";

const Posts = ({ post }) => {
  const [text, setText] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(PostsContext)

  const navigate = useNavigate()

  const isMyPost = user.user._id === post?.user?._id

  // HandlePostComment
  const handlePostComment = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    const comment = { text }

    const response = await fetch(`http://localhost:3050/api/post/comment/${post._id}`, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const data = await response.json()

    if(response.ok) {
      dispatch({type: 'COMMENT_POST', payload: data})
      setIsLoading(false)
      navigate(0)
    }
  }
  
  // HandleDelete
  const handleDelete = async () => { 
    const response = await fetch(`http://localhost:3050/api/post/delete/${post._id}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${user.token}`}
    })
    const data = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_POST', payload: data})
      navigate(0)
    }
  }

  // HandleLikePost
  const handleLikePost = async () => {
    const response = await fetch(`http://localhost:3050/api/post/like/${post._id}`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
    }

    if(response.ok) {
      setIsLiked(true)
      navigate(0)
    }
  }

  return (
    <div>

        <div className='border border-t-0 border-gray-700'>
          
            <div className='p-3'>
              <div className='relative mb-3'>
                <Link to={`/profile/${post?.user?.username}`} >
                  <div className='flex items-center gap-2'>
                    <h3 className='font-bold'>{post?.user?.fullName}</h3>
                    <p className='text-gray-600'>@{post?.user?.username}</p>
                    <span className='text-gray-600'>
                      1h
                    </span>                                  
                  </div>
                </Link>         
                  {isMyPost && (
                    <FaTrash 
                      className='absolute right-0 top-1 w-4 h-4 cursor-pointer hover:text-red-400'
                      onClick={handleDelete}
                    />   
                  )}
                <p>{post?.text}</p>
              </div>
      
              <div className='flex items-center gap-12 text-gray-400 cursor-pointer'>
                <div className='flex items-center gap-1 hover:text-white'>
                  <FaRegComment 
                    className='w-4 h-4'
                    onClick={() => document.getElementById("comment_modal" + post._id).showModal()}
                  />
                  {post?.comments?.length}
                       {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <dialog id={`comment_modal${post?._id}`} className="modal">
                    <div className="modal-box">
                      <div className='p-3'>
                        <h3 className="text-white font-bold text-lg">Comments</h3>
                      </div>
                    {post?.comments?.map((comment) => (
                      <div key={comment._id} className='p-3'>
                        <div className='flex gap-2'>
                          <h3 className='font-bold text-white'>{comment?.user?.fullName}</h3>
                          <p className='text-gray-400'>@{comment?.user?.username}</p>
                          <span className='text-gray-600'>
                            1h
                          </span>  
                        </div>
                        <p className='text-white'>{comment?.text}</p>
                      </div>
                    ))}
                    <form onSubmit={handlePostComment}>
                        <textarea 
                          className='w-full outline-none resize-none p-3 rounded-lg mb-2'
                          placeholder="Add a comment"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                        />
                        <button className='w-[70px] font-bold text-white bg-blue-500 rounded-full py-2'>Post</button>
                    </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>

                <div onClick={handleLikePost} className='flex items-center gap-1 hover:text-white'>
                  {!isLiked && <FaRegHeart className='w-4 h-4'/>}
                  {isLiked && <FaRegHeart className='w-4 h-4 fill-red-600'/>}
                  {post?.likes?.length}
                </div>

                <div>
                  <FaRegBookmark className='w-4 h-4 hover:text-white'/>
                </div>
              </div>
            </div>
    
        </div>

    </div>
  )
}

export default Posts