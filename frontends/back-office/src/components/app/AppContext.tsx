import { createContext, useContext } from 'react';

type AppContextType = { conferenceSlug?: string; token?: string };

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
