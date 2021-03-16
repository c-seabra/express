import 'moment-timezone';

import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';

import { useAppContext } from '../../components/app/AppContext';
import SESSION_TIMESLOT_PARTICIPATION_CREATE from '../../operations/mutations/SessionTimeslotParticipationCreate';
import { Attendance, UserError } from '../types';

type SessionTimeslotParticipationCreateData = {
  sessionTimeslotParticipationCreate: {
    participations: [Attendance];
    successMessage: string;
    userErrors: UserError[];
  };
};

type SessionTimeslotParticipationCreatesArgs = {
  attendanceId: string | undefined;
  sessionTimeslotId: string | undefined;
};

const useSessionTimeslotParticipationCreateMutation = ({
  attendanceId,
  sessionTimeslotId,
}: SessionTimeslotParticipationCreatesArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [
    createSessionTimeslotParticipation,
    { data, error, loading },
  ] = useMutation<SessionTimeslotParticipationCreateData>(
    SESSION_TIMESLOT_PARTICIPATION_CREATE,
    {
      onCompleted: ({ sessionTimeslotParticipationCreate }) => {
        if (sessionTimeslotParticipationCreate?.userErrors[0]) {
          errorMessage(
            sessionTimeslotParticipationCreate?.userErrors[0].message,
          );
        } else {
          success(sessionTimeslotParticipationCreate.successMessage);
        }
      },
      onError: (e) => errorMessage(e.message),
    },
  );

  const createSessionTimeslotParticipationMutation = async () => {
    await createSessionTimeslotParticipation({
      context: {
        slug: conferenceSlug,
        token,
      },
      refetchQueries: ['AttendanceAppearanceSelectionQuery'],
      variables: {
        attendanceId,
        sessionTimeslotId,
      },
    });
  };

  return {
    createSessionTimeslotParticipationMutation,
    data,
    error,
    loading,
  };
};

export default useSessionTimeslotParticipationCreateMutation;
