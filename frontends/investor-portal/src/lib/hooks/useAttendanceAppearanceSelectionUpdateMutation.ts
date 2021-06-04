import { useMutation } from '@apollo/client';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';

import { useAppContext } from '../../components/app/AppContext';
import ATTENDANCE_APPEARANCE_SELECTION_UPDATE from '../../operations/mutations/AttendanceAppearanceSelectionsUpdate';
import { UserError } from '../types';

type SelectionUpdateData = {
  attendanceAppearanceSelectionUpdate: {
    successMessage: string;
    userErrors: UserError[];
  };
};

const useAttendanceAppearanceSelectionUpdateMutation = ({
  attendanceIds,
  status,
}: {
  attendanceIds: string[];
  status: string;
}) => {
  const { slug, token } = useAppContext();
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const context = {
    slug,
    token,
  };

  const variables = {
    attendanceIds,
    status,
  };

  const [
    attendanceAppearanceSelectionUpdateMutation,
  ] = useMutation<SelectionUpdateData>(ATTENDANCE_APPEARANCE_SELECTION_UPDATE, {
    context,
    onCompleted: ({ attendanceAppearanceSelectionUpdate }) => {
      if (attendanceAppearanceSelectionUpdate?.userErrors[0]) {
        errorMessage(
          attendanceAppearanceSelectionUpdate?.userErrors[0].message,
        );
      } else {
        success(attendanceAppearanceSelectionUpdate.successMessage);
      }
    },
    onError: (e) => errorMessage(e.message),
    refetchQueries: ['Attendances', 'AttendanceDetailsQuery'],
    variables,
  });

  const updateAttendanceAppearanceSelections = async () => {
    await attendanceAppearanceSelectionUpdateMutation();
  };

  return {
    updateAttendanceAppearanceSelections,
  };
};

export default useAttendanceAppearanceSelectionUpdateMutation;
