import React, { ReactElement } from 'react'

import {
  DestructiveButton,
  ListItem,
  Modal,
  SecondaryButton,
  useModalState,
} from '../../lib/components'
import { useAttendanceAppearanceSelectionDestroyMutation } from '../../lib/hooks'
import { AttendanceAppearanceSelection } from '../../lib/types'
import Column from './AttendanceAppearanceSelectionColumn.styled'

const AttendanceAppearanceSelectionItem = ({
  selection,
}: {
  selection: AttendanceAppearanceSelection
}): ReactElement => {
  const { isOpen, openModal, closeModal } = useModalState()

  const {
    attendanceAppearanceSelectionDestroyMutation,
  } = useAttendanceAppearanceSelectionDestroyMutation({ selectionId: selection.id })

  return (
    <ListItem>
      <Column>{selection.appearance.company.name}</Column>
      <Column>{new Date(selection.updatedAt).toDateString()}</Column>
      <Column>{selection.status}</Column>
      <SecondaryButton style={{ marginRight: 10 }}>Edit</SecondaryButton>
      <DestructiveButton style={{ marginRight: 10 }} onClick={openModal}>
        Delete
      </DestructiveButton>
      <Modal
        defaultFooterIsDestructive
        withDefaultFooter
        defaultFooterPositiveButtonAction={async () => {
          await attendanceAppearanceSelectionDestroyMutation()
          closeModal()
        }}
        defaultFooterPositiveButtonText="Delete"
        description={`You are going to delete "${selection.appearance.company.name}" selection.\n\nThis action can not be un-done!`}
        isOpen={isOpen}
        title="Are you sure?"
        onRequestClose={closeModal}
      />
    </ListItem>
  )
}

export default AttendanceAppearanceSelectionItem
