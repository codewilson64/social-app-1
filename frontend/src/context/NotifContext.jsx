import { createContext, useReducer } from "react";

export const NotifsContext = createContext()

export const notifsReducer = (state, action) => {
  switch(action.type) {
    case 'GET_ALL_NOTIFS': 
      return { 
         notifs: action.payload 
       }
    case 'DELETE_NOTIFS':
      return {
        notifs: null
      }
    default:
      return state
  }
}

export const NotifsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notifsReducer, {
    notifs: null
  })

  console.log('NotifsContext state', state)

  return (
    <NotifsContext.Provider value={{...state, dispatch}}>
      {children}
    </NotifsContext.Provider>
  )
}