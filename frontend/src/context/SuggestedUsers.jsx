import { createContext, useEffect, useReducer } from "react";

export const SuggestedUsersContext = createContext()

export const SuggestedUsersReducer = (state, action) => {
  switch(action.type) {
    case 'GET_SUGGESTED_USERS': 
      return {
        suggestedUsers: action.payload
      }
    default: 
      return state
  }
}

export const SuggestedUsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SuggestedUsersReducer, {
    suggestedUsers: []
  })
 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('suggested_users'))
    if(user) {
      dispatch({type: 'GET_SUGGESTED_USERS', payload: user})
    }
  }, [])

  console.log('SuggestedUsersContext state: ', state)

  return (
    <SuggestedUsersContext.Provider value={{...state, dispatch}}>
      {children}
    </SuggestedUsersContext.Provider>
  )
}