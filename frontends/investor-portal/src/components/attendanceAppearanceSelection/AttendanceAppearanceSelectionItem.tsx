import React, { ReactElement } from 'react'
import styled from 'styled-components'

import { DestructiveButton, SecondaryButton } from '../../lib/components/atoms/Button'
import { AttendanceAppearanceSelection } from '../../lib/types'

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`
const Column = styled(ColumnStyles)`
  width: 25%;
`

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 0.75rem;
  background-color: #fff;

  binvestor-bottom: 1px solid #dde0e5;

  &:last-child {
    binvestor-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
    cursor: pointer;
  }
`

const ListHeaderItem = styled(StyledListItem)`
  font-weight: 600;
  text-align: center;
  margin-top: 1rem;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`

export const AttendanceAppearanceSelectionListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>Company Name</Column>
      <Column>Date of selection</Column>
      <Column>Status</Column>
    </ListHeaderItem>
  )
}

const AttendanceAppearanceSelectionItem = ({
  selection,
}: {
  selection: AttendanceAppearanceSelection
}): ReactElement => {
  return (
    <StyledListItem>
      <Column>{selection.appearance.company.name}</Column>
      <Column>{new Date(selection.createdAt).toDateString()}</Column>
      <Column>{selection.status}</Column>
      <SecondaryButton style={{ marginRight: 10 }}>Edit</SecondaryButton>
      <DestructiveButton style={{ marginLeft: 10 }}>Delete</DestructiveButton>
    </StyledListItem>
  )
}

export default AttendanceAppearanceSelectionItem
