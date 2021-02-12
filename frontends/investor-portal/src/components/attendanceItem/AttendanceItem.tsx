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
      <Column onClick={() => history.push(`/attendance/${attendance.id}`)}>
        {attendance.name}
      </Column>
      <Column>{attendance.pendingSelectionCount}</Column>
    </ListItem>
  )
}

export default AttendanceItem
