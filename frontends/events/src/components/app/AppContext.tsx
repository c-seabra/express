import { createContext, useContext } from 'react';

type AppContextType = { slug?: string; token?: string };

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useRequestContext = () => {
  const { slug, token } = useAppContext();
  return {
    slug,
    token,
  };
};

export default AppContext;
