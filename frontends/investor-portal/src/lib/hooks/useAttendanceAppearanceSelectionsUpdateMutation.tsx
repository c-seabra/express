import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import { ATTENDANCE_APPEARANCE_SELECTIONS_UPDATE_MUTATION } from '../../operations/mutations';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type AttendanceAppearanceSelectionsUpdateData = {
  attendanceAppearanceSelectionsUpdate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type AttendanceAppearanceSelectionsUpdateArgs = {
  attendanceIds: string[] | undefined;
  unlockStartup: boolean | false;
};

const useAttendanceAppearanceSelectionsUpdateMutation = ({
  attendanceIds,
  unlockStartup,
}: AttendanceAppearanceSelectionsUpdateArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [
    updateAttendanceAppearanceSelections,
    { data },
  ] = useMutation<AttendanceAppearanceSelectionsUpdateData>(
    ATTENDANCE_APPEARANCE_SELECTIONS_UPDATE_MUTATION,
    {
      onCompleted: ({ attendanceAppearanceSelectionsUpdate }) => {
        console.log(attendanceAppearanceSelectionsUpdate)
        if (attendanceAppearanceSelectionsUpdate?.userErrors[0]) {
          errorMessage(
            attendanceAppearanceSelectionsUpdate?.userErrors[0].message,
          );
        } else {
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
        unlockStartup,
      },
    });
  };

  return {
    attendanceAppearanceSelectionsUpdateMutation,
    data,
  };
};

export default useAttendanceAppearanceSelectionsUpdateMutation;
