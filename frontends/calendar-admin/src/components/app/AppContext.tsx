import { createContext, useContext } from 'react';

import { Attendance } from '../../lib/types/index';

type AppContextType = {
  attendances?: Attendance[];
  conferenceSlug?: string;
  setAttendances: () => Attendance[];
  token?: string;
};

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
