import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { ListItem } from '../../lib/components'
import { Attendance } from '../../lib/types'

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`
const Column = styled(ColumnStyles)`
  width: 15%;
`

const NarrowColumn = styled(ColumnStyles)`
  width: 3%;
`

const AttendanceItem = ({
  attendance,
  isChecked,
  onCheckboxChange,
}: {
  attendance: Attendance
  isChecked: boolean
  onCheckboxChange: (e: React.FormEvent<HTMLInputElement>) => void
}): ReactElement => {
  const history = useHistory()

  console.log('checkbox', isChecked)
  return (
    <ListItem>
      <NarrowColumn>
        <input
          checked={isChecked}
          name="select"
          type="checkbox"
          value={attendance.id}
          onChange={onCheckboxChange}
        />
      </NarrowColumn>
      <Column onClick={() => history.push(`/attendance/${attendance.id}`)}>{attendance.id}</Column>
      <Column onClick={() => history.push(`/attendance/${attendance.id}`)}>
        {attendance.name}
      </Column>
      <Column>{attendance.pendingSelectionCount}</Column>
    </ListItem>
  )
}

export default AttendanceItem
