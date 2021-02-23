import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { ListItem } from '../../lib/components'
import { Attendance } from '../../lib/types'
import { Column, NarrowColumn } from './AttendanceListHeader.styled'

const AttendanceItem = ({
  attendance,
  isChecked,
  onCheckboxChange,
}: {
  attendance: Attendance
  isChecked: boolean
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}): ReactElement => {
  const history = useHistory()

  return (
    <ListItem>
      <NarrowColumn>
        <input
          checked={isChecked}
          disabled={attendance.pendingSelectionCount === 0}
          name="select"
          type="checkbox"
          value={attendance.id}
          onChange={onCheckboxChange}
        />
      </NarrowColumn>
      <Column>{attendance.id}</Column>
      <Column onClick={() => history.push(`/dashboard/${attendance.id}`)}>{attendance.name}</Column>
      <Column>{attendance.pendingSelectionCount}</Column>
    </ListItem>
  )
}

export default AttendanceItem
