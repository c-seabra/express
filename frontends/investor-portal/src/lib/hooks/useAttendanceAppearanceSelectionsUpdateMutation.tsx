import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import { ATTENDANCE_APPEARANCE_SELECTION_UPDATE_MUTATION } from '../../operations/mutations';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type AttendanceAppearanceSelectionUpdateData = {
  attendanceAppearanceSelectionsUpdate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type AttendanceAppearanceSelectionUpdateArgs = {
  attendanceIds: string[] | undefined;
}

const useAttendanceAppearanceSelectionsUpdateMutation = ({
  attendanceIds,
}: AttendanceAppearanceSelectionUpdateArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [
    updateAttendanceAppearanceSelections,
    { data },
  ] = useMutation<AttendanceAppearanceSelectionUpdateData>(
    ATTENDANCE_APPEARANCE_SELECTION_UPDATE_MUTATION,
    {
      onCompleted: ({ attendanceAppearanceSelectionsUpdate }) => {
        if (attendanceAppearanceSelectionsUpdate?.userErrors[0]) {
          errorMessage(
            attendanceAppearanceSelectionsUpdate?.userErrors[0].message,
          );
        } else if (attendanceAppearanceSelectionsUpdate?.successMessage) {
          success(attendanceAppearanceSelectionsUpdate?.successMessage);
        }
      },
      onError: (e) => errorMessage(e.message),
    },
  );

  const attendanceAppearanceSelectionsUpdateMutation = async () => {
    await updateAttendanceAppearanceSelections({
      context: {
        slug: conferenceSlug,
        token,
      },
      refetchQueries: ['AttendanceDetailsQuery'],
      variables: {
        attendanceIds,
      },
    });
  };

  return {
    attendanceAppearanceSelectionsUpdateMutation,
    data,
  };
};

export default useAttendanceAppearanceSelectionsUpdateMutation;
