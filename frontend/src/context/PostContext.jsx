import { createContext, useReducer } from "react";

export const PostsContext = createContext()

export const postsReducer = (state, action) => {
  switch(action.type) {
    case 'GET_ALL_POST': 
      return {
        posts: action.payload
      }
    case 'CREATE_POST': 
      return {
        posts: [action.payload, ...state.posts]
      }
    case 'DELETE_POST':
      return {
        posts: state.posts.filter(post => post._id !== action.payload._id)
      }
    case 'COMMENT_POST': 
      return {
        posts: action.payload
      }
    case 'LIKE_POST':
      return {
        posts: action.payload
      }
    case 'GET_ALL_NOTIFS': 
      return {
        posts: action.payload
      }
    default: 
      return state
  }
}

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {
    posts: [],
  })

  console.log('PostContext state: ', state)

  return (
    <PostsContext.Provider value={{...state, dispatch}}>
      {children}
    </PostsContext.Provider>
  )
}