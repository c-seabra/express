import { createContext, useContext } from 'react'

type AppContextType = {
  conferenceSlug?: string
  storeId?: string
  storeToken?: string
  token?: string
}

const AppContext = createContext<AppContextType>({})

export const useAppContext = () => {
  return useContext(AppContext)
}

export default AppContext
