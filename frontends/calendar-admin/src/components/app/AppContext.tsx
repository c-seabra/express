import { GraphQLParams } from '@websummit/graphql';
import { createContext, useContext } from 'react';

import { Attendance, Color } from '../../lib/types/index';

type AppContextType = GraphQLParams & {
  attendances?: Attendance[];
  colors?: Color[];
  setAttendances?: (attendance: Attendance[]) => void;
  setColors?: (color: Color[]) => void;
};

const AppContext = createContext<AppContextType>({});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppContext;
