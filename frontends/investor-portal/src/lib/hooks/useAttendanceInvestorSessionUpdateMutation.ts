import { useMutation } from '@apollo/client';
import moment from 'moment';

import { useAppContext } from '../../components/app/AppContext';
import ATTENDANCE_INVESTOR_SESSION_UPDATE_MUTATION from '../../operations/mutations/AttendanceInvestorSessionUpdate';
import { UserError } from '../types';
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type AttendanceInvestorSessionUpdateData = {
  attendanceInvestorSessionUpdate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

type AttendanceInvestorSessionUpdateArgs = {
  attendanceId: string | undefined;
  eventTimezone: string;
  startsAt: string | undefined;
  unlock: boolean | undefined;
};

const useAttendanceInvestorSessionUpdateMutation = ({
  attendanceId,
  eventTimezone,
  startsAt,
  unlock,
}: AttendanceInvestorSessionUpdateArgs) => {
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
    updateAttendanceInvestorSession,
    { data, error, loading },
  ] = useMutation<AttendanceInvestorSessionUpdateData>(
    ATTENDANCE_INVESTOR_SESSION_UPDATE_MUTATION,
    {
      onCompleted: ({ attendanceInvestorSessionUpdate }) => {
        if (attendanceInvestorSessionUpdate?.userErrors[0]) {
          errorMessage(attendanceInvestorSessionUpdate?.userErrors[0].message);
        } else {
          success(attendanceInvestorSessionUpdate.successMessage);
        }
      },
      onError: (e) => errorMessage(e.message),
    },
  );

  const attendanceInvestorSessionUpdateMutation = async () => {
    await updateAttendanceInvestorSession({
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
    attendanceInvestorSessionUpdateMutation,
    data,
    error,
    loading,
  };
};

export default useAttendanceInvestorSessionUpdateMutation;
