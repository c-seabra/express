import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import ATTENDANCE_APPEARANCE_SELECTION_UPDATE from '../../operations/mutations/AttendanceAppearanceSelectionsUpdate';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type SelectionUpdateData = {
  attendanceAppearanceSelectionUpdateUnlock: {
    successMessage: string;
    userErrors: UserError[];
  };
};

const useAttendanceAppearanceSelectionUpdateMutationUnlock = ({
  attendanceIds,
  status,
}: {
  attendanceIds: string[];
  status: string;
}) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const context = {
    slug: conferenceSlug,
    token,
  };

  const variables = {
    attendanceIds,
    status,
  };

  const [
    attendanceAppearanceSelectionUpdateMutationUnlock,
  ] = useMutation<SelectionUpdateData>(ATTENDANCE_APPEARANCE_SELECTION_UPDATE, {
    context,
    onCompleted: ({ attendanceAppearanceSelectionUpdateUnlock }) => {
      if (attendanceAppearanceSelectionUpdateUnlock?.userErrors[0]) {
        errorMessage(
          attendanceAppearanceSelectionUpdateUnlock?.userErrors[0].message,
        );
      } else {
        success(attendanceAppearanceSelectionUpdateUnlock?.successMessage);
      }
    },
    onError: (e) => errorMessage(e.message),
    refetchQueries: ['AttendanceDetailsQuery'],
    variables,
  });

  const unlockUpdateAttendanceAppearanceSelections = async () => {
    await attendanceAppearanceSelectionUpdateMutationUnlock();
  };

  return {
    unlockUpdateAttendanceAppearanceSelections,
  };
};

export default useAttendanceAppearanceSelectionUpdateMutationUnlock;
