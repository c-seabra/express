import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';

import { ATTENDANCE_INVESTOR_SESSION_UPDATE_MUTATION } from '../../operations/mutations/AttendanceInvestorSessionUpdate';
import { UserError } from '../types';

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
  unlockInvestor: boolean | false;
};

const useAttendanceInvestorSessionUpdateMutation = ({
  attendanceId,
  startsAt,
  unlockInvestor,
}: AttendanceInvestorSessionUpdateArgs) => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [updateAttendanceInvestorSession, { data, error, loading }] =
    useMutation<AttendanceInvestorSessionUpdateData>(
      ATTENDANCE_INVESTOR_SESSION_UPDATE_MUTATION,
      {
        onCompleted: ({ attendanceInvestorSessionUpdate }) => {
          if (attendanceInvestorSessionUpdate?.userErrors[0]) {
            errorMessage(
              attendanceInvestorSessionUpdate?.userErrors[0].message,
            );
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
        slug,
        token,
      },
      refetchQueries: ['EventQuery', 'AttendanceDetailsQuery'],
      variables: {
        attendanceId,
        startsAt,
        unlockInvestor,
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
