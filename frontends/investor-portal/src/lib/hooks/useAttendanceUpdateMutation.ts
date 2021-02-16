import { useMutation } from '@apollo/client';
import moment from 'moment';

import { useAppContext } from '../../components/app/AppContext';
import ATTENDANCE_UPDATE_MUTATION from '../../operations/mutations/AttendanceUpdate';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type AttendanceUpdateData = {
  attendanceUpdate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type AttendanceUpdateArgs = {
  attendanceId: string | undefined;
  eventTimezone: string;
  startsAt: string | undefined;
  unlock: boolean | undefined;
};

const useAttendanceUpdateMutation = ({
  attendanceId,
  eventTimezone,
  startsAt,
  unlock,
}: AttendanceUpdateArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const styledDateForMutation = (dateString?: string) => {
    if (dateString === undefined || dateString === '') {
      return undefined;
    }
    return moment(dateString).tz(eventTimezone, true).format();
  };

  const [
    updateAttendance,
    { data, error, loading },
  ] = useMutation<AttendanceUpdateData>(ATTENDANCE_UPDATE_MUTATION, {
    onCompleted: ({ attendanceUpdate }) => {
      if (attendanceUpdate?.userErrors[0]) {
        errorMessage(attendanceUpdate?.userErrors[0].message);
      } else {
        success(attendanceUpdate.successMessage);
      }
    },
    onError: (e) => errorMessage(e.message),
  });

  const attendanceUpdateMutation = async () => {
    await updateAttendance({
      context: {
        slug: conferenceSlug,
        token,
      },
      refetchQueries: ['EventQuery'],
      variables: {
        attendanceId,
        startsAt: styledDateForMutation(startsAt),
        unlock,
      },
    });
  };

  return {
    attendanceUpdateMutation,
    data,
    error,
    loading,
  };
};

export default useAttendanceUpdateMutation;
