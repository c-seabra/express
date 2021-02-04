import React from 'react'

import { Column, ListHeaderItem, NarrowColumn } from './AttendanceListHeader.styled'

const AttendanceListHeader = ({
  isChecked,
  onCheckboxChange,
}: {
  isChecked: boolean
  onCheckboxChange: (e: React.FormEvent<HTMLInputElement>) => void
}) => {
  return (
    <ListHeaderItem>
      <NarrowColumn>
        <input checked={isChecked} name="select" type="checkbox" onChange={onCheckboxChange} />
      </NarrowColumn>
      <Column>ID</Column>
      <Column>Name</Column>
      <Column>Pending selections</Column>
    </ListHeaderItem>
  )
}

export default AttendanceListHeader
