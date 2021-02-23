import { useQuery } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import ATTENDANCE_APPEARANCE_SELECTION from '../../operations/queries/AttendanceAppearanceSelection';
import { AttendanceAppearanceSelection, UserError } from '../types';

type AttendanceAppearanceSelectionData = {
  attendanceAppearanceSelection: AttendanceAppearanceSelection;
  userErrors: UserError[];
};

const useAttendanceAppearanceSelectionQuery = ({ selectionId }: { selectionId: string }) => {
  const { conferenceSlug, token } = useAppContext();

  const { data, error, loading } = useQuery<AttendanceAppearanceSelectionData>(ATTENDANCE_APPEARANCE_SELECTION, {
    context: { slug: conferenceSlug, token },
    variables: { id: selectionId }
  });

  return {
    data,
    error,
    loading,
  };
};

export default useAttendanceAppearanceSelectionQuery;
