import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';

import { useAppContext } from '../../components/app/AppContext';
import { ATTENDANCE_APPEARANCE_SELECTION_DESTROY_MUTATION } from '../../operations/mutations';
import { UserError } from '../types';

type AttendanceAppearanceSelectionDestroyData = {
  attendanceAppearanceSelectionDestroy: {
    successMessage: string;
    userErrors: [UserError];
  };
};

type AttendanceAppearanceSelectionDestroyArgs = {
  selectionId: string;
};

const useAttendanceAppearanceSelectionDestroyMutation = ({
  selectionId,
}: AttendanceAppearanceSelectionDestroyArgs) => {
  const { conferenceSlug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const [
    selectionDestroy,
    { data, error, loading },
  ] = useMutation<AttendanceAppearanceSelectionDestroyData>(
    ATTENDANCE_APPEARANCE_SELECTION_DESTROY_MUTATION,
    {
      onCompleted: ({ attendanceAppearanceSelectionDestroy }) => {
        if (attendanceAppearanceSelectionDestroy?.userErrors[0]) {
          errorMessage(
            attendanceAppearanceSelectionDestroy?.userErrors[0].message,
          );
        } else {
          success(attendanceAppearanceSelectionDestroy.successMessage);
        }
      },
      onError: (e) => errorMessage(e.message),
    },
  );

  const attendanceAppearanceSelectionDestroyMutation = async () => {
    await selectionDestroy({
      context: {
        slug: conferenceSlug,
        token,
      },
      refetchQueries: ['AttendanceDetailsQuery'],
      variables: {
        selectionId,
      },
    });
  };

  return {
    attendanceAppearanceSelectionDestroyMutation,
    data,
    error,
    loading,
  };
};

export default useAttendanceAppearanceSelectionDestroyMutation;
