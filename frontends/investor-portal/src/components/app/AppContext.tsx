import { createContext, useContext } from 'react'
import { GraphQLParams } from '@websummit/graphql';

type AppContextType = GraphQLParams

const AppContext = createContext<AppContextType>({})

export const useAppContext = () => {
  return useContext(AppContext)
}

export default AppContext
