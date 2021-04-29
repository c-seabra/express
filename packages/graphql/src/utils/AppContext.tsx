import type { GraphQLParams } from '@websummit/graphql';
import { createContext, useContext } from 'react';

type AppContextType = GraphQLParams;

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useRequestContext = () => {
  const { conferenceSlug, token } = useAppContext();
  return {
    slug: conferenceSlug,
    token,
  };
};

export default AppContext;
