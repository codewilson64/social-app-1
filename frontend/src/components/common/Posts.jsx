import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

import { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from "../../context/AuthContext";
import { PostsContext } from "../../context/PostContext";

const Posts = ({ post }) => {
  const [comment, setComment] = useState('')
  const formattedDate = '1h'

  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(PostsContext)

  const navigate = useNavigate()

  const isMyPost = user.user._id === post?.user._id

  // HandlePostComment
  const handlePostComment = (e) => {
    e.preventDefault()
    console.log('comment added')
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

  return (
    <div>

        <div className='border border-t-0 border-gray-700'>
          
            <div className='p-3 border-b border-gray-700'>
              <div className='relative mb-3'>
                <Link to={`/profile/${post?.user.username}`} >
                  <div className='flex items-center gap-2'>
                    <h3 className='font-bold'>{post?.user.fullName}</h3>
                    <p className='text-gray-600'>@{post?.user.username}</p>
                    <span className='text-gray-600'>{formattedDate}</span>                                  
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
                  {post?.comments.length}
                       {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <dialog id={`comment_modal${post?._id}`} className="modal">
                    <div className="modal-box">
                      <div className='p-3'>
                        <h3 className="text-white font-bold text-lg">Comments</h3>
                      </div>
                    {post?.comments.map((comment) => (
                      <div key={comment._id} className='p-3'>
                        <div className='flex gap-2'>
                          <h3 className='font-bold text-white'>{comment.user.fullName}</h3>
                          <p className='text-gray-400'>@{comment.user.username}</p>
                        </div>
                        <p className='text-white'>{comment.text}</p>
                      </div>
                    ))}
                    <form onSubmit={handlePostComment}>
                        <textarea 
                          className='w-full outline-none resize-none p-3 rounded-lg mb-2'
                          placeholder="Add a comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <button className='w-[70px] font-bold text-white bg-blue-500 rounded-full py-2'>Post</button>
                    </form>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>

                <div className='flex items-center gap-1 hover:text-white'>
                  <FaRegHeart className='w-4 h-4'/>
                  {post?.likes.length}
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