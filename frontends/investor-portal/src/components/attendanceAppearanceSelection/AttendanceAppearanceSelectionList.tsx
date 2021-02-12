import { ApolloError, useMutation } from '@apollo/client'
import React, { ReactElement, useState } from 'react'

import Loader from '../../lib/Loading'
import { AttendanceAppearanceSelection } from '../../lib/types'
import { ATTENDANCE_APPEARANCE_SELECTION_DESTROY_MUTATION } from '../../operations/mutations'
import { useAppContext } from '../app/AppContext'
import Success from '../settingsActions/Success'
import Warning from '../settingsActions/Warning'
import AttendanceAppearanceSelectionItem from './AttendanceAppearanceSelectionItem'
import AttendanceAppearanceSelectionListHeader from './AttendanceAppearanceSelectionListHeader'

type AtendanceAppearanceSelectionListProps = {
  error?: ApolloError
  list: AttendanceAppearanceSelection[]
  loading: boolean
}

const AttendanceAppearanceSelectionList = ({
  list = [],
  loading,
  error,
}: AtendanceAppearanceSelectionListProps): ReactElement => {
  const { conferenceSlug, token } = useAppContext()
  const [mutationSuccessMessage, setMutationSuccessMessage] = useState<string | undefined>()
  const [mutationError, setMutationError] = useState<string | undefined>()

  const [attendanceAppearanceSelectionDestroyMutation] = useMutation(
    ATTENDANCE_APPEARANCE_SELECTION_DESTROY_MUTATION,
    {
      context: {
        slug: conferenceSlug,
        token,
      },
      onCompleted: (result: {
        attendanceAppearanceSelectionDestroy: {
          successMessage?: string
          userErrors: [
            {
              message: string
              type: string
            }
          ]
        }
      }) => {
        const success: string = result.attendanceAppearanceSelectionDestroy?.successMessage || ''
        const err: string =
          result.attendanceAppearanceSelectionDestroy.userErrors?.[0]?.message || ''
        setMutationError(err)
        setMutationSuccessMessage(success)
      },
      refetchQueries: ['AttendanceDetailsQuery'],
    }
  )

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <>{error.message}</>
  }

  const onDeletionConfirmed = async (selection: AttendanceAppearanceSelection) => {
    await attendanceAppearanceSelectionDestroyMutation({
      variables: {
        selectionId: selection.id,
      },
    })
  }

  return (
    <>
      {mutationError && (
        <Warning>
          <span>{mutationError}</span>
        </Warning>
      )}
      {mutationSuccessMessage && (
        <Success>
          <span>{mutationSuccessMessage}</span>
        </Success>
      )}
      <AttendanceAppearanceSelectionListHeader />
      {list.map(selection => (
        <AttendanceAppearanceSelectionItem
          key={selection.id}
          selection={selection}
          onDeletionConfirmed={onDeletionConfirmed}
        />
      ))}
    </>
  )
}

export default AttendanceAppearanceSelectionList
