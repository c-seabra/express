import { createContext, useContext } from 'react';

import { Attendance, Color } from '../../lib/types/index';

type AppContextType = {
  attendances?: Attendance[];
  colors?: Color[];
  conferenceSlug?: string;
  setAttendances?: (attendance: Attendance[]) => void;
  setColors?: (color: Color[]) => void;
  token?: string;
};

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
