import { useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import ATTENDANCE_APPEARANCE_SELECTION_UPDATE from '../../operations/mutations/AttendanceAppearanceSelectionsUpdate'
import { UserError } from '../types'
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage';

type SelectionUpdateData = {
  attendanceAppearanceSelectionUpdate: {
    successMessage: string
    userErrors: UserError[]
  }
}

const useAttendanceAppearanceSelectionUpdateMutation = ({
  attendanceIds,
}: {
  attendanceIds: string[]
}) => {
  const { conferenceSlug, token } = useAppContext()
  const success = useSuccessSnackbar();
  const errorMessage = useErrorSnackbar();

  const context = {
    slug: conferenceSlug,
    token,
  }

  const variables = {
    attendanceIds,
  }

  const [attendanceAppearanceSelectionUpdateMutation] = useMutation<SelectionUpdateData>(
    ATTENDANCE_APPEARANCE_SELECTION_UPDATE,
    {
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
      refetchQueries: ['Attendances'],
      variables,
    }
  )

  const updateAttendanceAppearanceSelections = async () => {
    await attendanceAppearanceSelectionUpdateMutation()
  }

  return {
    updateAttendanceAppearanceSelections,
  }
}

export default useAttendanceAppearanceSelectionUpdateMutation
