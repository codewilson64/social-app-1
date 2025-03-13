import { FaRegComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import avatar from '../../public/public/avatar-placeholder.png'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'

import { AuthContext } from "../../context/AuthContext";
import { PostsContext } from "../../context/PostContext";

const Posts = ({ feedType, username }) => {
  const [text, setText] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const { user } = useContext(AuthContext)
  const { posts, dispatch } = useContext(PostsContext)

  const navigate = useNavigate()

  const getPostEndpoint = () => {
    switch(feedType){
      case 'forYou': 
        return 'http://localhost:3050/api/post/all-post'
      case 'following':
        return 'http://localhost:3050/api/post/followingposts'
      case 'posts':
        return `http://localhost:3050/api/post/user/${username}`
      case 'likes':
        return `http://localhost:3050/api/post/likes/${username}`
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
      }
    }
    if(user) {
      fetchPosts()
    }
  }, [feedType, username])

  // HandlePostComment
  const handlePostComment = async (_id) => {
    setIsLoading(true)
    const comment = { text }

    const response = await fetch(`http://localhost:3050/api/post/comment/${_id}`, {
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
    }
  }
  
  // HandleDelete
  const handleDelete = async (id) => { 
    const response = await fetch(`http://localhost:3050/api/post/delete/${id}`, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${user.token}`}
    })
    const data = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_POST', payload: data})
    }
  }

  // HandleLikePost
  const handleLikePost = async (_id) => {
    const response = await fetch(`http://localhost:3050/api/post/like/${_id}`, {
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
    <>
      {posts.map((post) => (
        <div key={post._id} className='border border-t-0 border-gray-700'>          
          <div className='p-3'>
            <div className='relative mb-3'>
              <Link to={`/profile/${post?.user?.username}`} className="flex items-center gap-2 mb-3">
                <img className="w-8 rounded-full" src={avatar} />
                <Link to={`/profile/${post?.user?.username}`} >
                  <div className='flex items-center gap-2'>
                    <h3 className='font-bold'>{post?.user?.fullName}</h3>
                    <p className='text-gray-600'>@{post?.user?.username}</p>
                    <span className='text-gray-600'>
                      1h
                    </span>                                  
                  </div>
                </Link>         
              </Link>
                {user.user._id === post?.user?._id && (
                  <FaTrash 
                    className='absolute right-0 top-1 w-4 h-4 cursor-pointer hover:text-red-400'
                    onClick={() => handleDelete(post._id)}
                  />   
                )}
              <p className="mb-3">{post?.text}</p>             
                {post.image && (
                  <div className="flex justify-center border border-gray-700 rounded-xl">
                    <img src={post.image} className="h-80 object-contain" alt="" />
                  </div>
                )}       
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
                  <form>
                      <textarea 
                        className='w-full outline-none resize-none p-3 rounded-lg mb-2'
                        placeholder="Add a comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <button 
                        className='w-[70px] font-bold text-white bg-blue-500 rounded-full py-2'
                        onClick={() => handlePostComment(post._id)}
                        >Post
                      </button>
                  </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>

              <div onClick={() => handleLikePost(post._id)} className='flex items-center gap-1 hover:text-white'>
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
      ))}
  </>
  )
}

export default Posts