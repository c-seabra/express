import { useMutation } from '@apollo/client';

import { useAppContext } from '../../components/app/AppContext';
import { ATTENDANCE_APPEARANCES_UPDATE_MUTATION } from '../../operations/mutations';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type AttendanceAppearancesUpdateData = {
  attendanceAppearancesUpdate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type AttendanceAppearancesUpdateArgs = {
  appearanceIds: string[] | undefined;
  unlockStartup: boolean | false;
};

const useAttendanceAppearancesUpdateMutation = ({
  appearanceIds,
  unlockStartup,
}: AttendanceAppearancesUpdateArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [
    updateAttendanceAppearances,
    { data },
  ] = useMutation<AttendanceAppearancesUpdateData>(
    ATTENDANCE_APPEARANCES_UPDATE_MUTATION,
    {
      onCompleted: ({ attendanceAppearancesUpdate }) => {
        if (attendanceAppearancesUpdate?.userErrors[0]) {
          errorMessage(
            attendanceAppearancesUpdate?.userErrors[0].message,
          );
        } else {
          success(attendanceAppearancesUpdate?.successMessage);
        }
      },
      onError: (e) => errorMessage(e.message),
    },
  );

  const attendanceAppearancesUpdateMutation = async () => {
    await updateAttendanceAppearances({
      context: {
        slug: conferenceSlug,
        token,
      },
      refetchQueries: ['AttendanceDetailsQuery'],
      variables: {
        appearanceIds,
        unlockStartup,
      },
    });
  };

  return {
    attendanceAppearancesUpdateMutation,
    data,
  };
};

export default useAttendanceAppearancesUpdateMutation;
