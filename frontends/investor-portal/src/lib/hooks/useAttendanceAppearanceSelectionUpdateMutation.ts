import { useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import ATTENDANCE_APPEARANCE_SELECTION_UPDATE from '../../operations/mutations/AttendanceAppearanceSelectionsUpdate'
import { UserError } from '../types'

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
        if (attendanceAppearanceSelectionUpdate?.successMessage) {
          console.log('success', attendanceAppearanceSelectionUpdate?.successMessage)
          // will be replaced with a Snackbar
        } else {
          console.log('error', attendanceAppearanceSelectionUpdate?.userErrors[0].message)
          // will be replaced with a Snackbar
        }
      },
      onError: e => {
        console.log('serious error', e?.message)
        // will be replaced with a Snackbar
      },
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
