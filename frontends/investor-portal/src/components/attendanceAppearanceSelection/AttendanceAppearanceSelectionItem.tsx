import React, { ReactElement } from 'react'

import {
  DestructiveButton,
  ListItem,
  Modal,
  SecondaryButton,
  useModalState,
} from '../../lib/components'
import { AttendanceAppearanceSelection } from '../../lib/types'
import Column from './AttendanceAppearanceSelectionColumn.styled'

const AttendanceAppearanceSelectionItem = ({
  selection,
  onDeleteClick,
}: {
  onDeleteClick: (selection: AttendanceAppearanceSelection) => void
  selection: AttendanceAppearanceSelection
}): ReactElement => {
  const { isOpen, openModal, closeModal } = useModalState()

  const onDeleteConfirmed = () => {
    onDeleteClick(selection)
    closeModal()
  }
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
        defaultFooterPositiveButtonAction={onDeleteConfirmed}
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
