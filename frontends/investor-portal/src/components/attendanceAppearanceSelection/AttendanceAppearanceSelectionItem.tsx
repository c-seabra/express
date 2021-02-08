import React, { ReactElement } from 'react'

import { DestructiveButton, SecondaryButton } from '../../lib/components/atoms/Button'
import ListItem from '../../lib/components/atoms/ListItem.styled'
import { AttendanceAppearanceSelection } from '../../lib/types'
import Column from './AttendanceAppearanceSelectionColumn.styled'

const AttendanceAppearanceSelectionItem = ({
  selection,
}: {
  selection: AttendanceAppearanceSelection
}): ReactElement => {
  return (
    <ListItem>
      <Column>{selection.appearance.company.name}</Column>
      <Column>{new Date(selection.updatedAt).toDateString()}</Column>
      <Column>{selection.status}</Column>
      <SecondaryButton style={{ marginRight: 10 }}>Edit</SecondaryButton>
      <DestructiveButton style={{ marginLeft: 10 }}>Delete</DestructiveButton>
    </ListItem>
  )
}

export default AttendanceAppearanceSelectionItem
