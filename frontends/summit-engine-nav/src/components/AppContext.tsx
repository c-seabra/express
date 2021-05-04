import type { GraphQLParams } from '@websummit/graphql';
import { createContext, useContext } from 'react';

type AppContextType = GraphQLParams;

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
