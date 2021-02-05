import React, { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import ListItem from '../../lib/components/atoms/ListItem.styled'
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

const AttendanceItem = ({ attendance }: { attendance: Attendance }): ReactElement => {
  const history = useHistory()

  return (
    <ListItem onClick={() => history.push(`/attendance/${attendance.id}`)}>
      <Column>{attendance.id}</Column>
      <Column>{attendance.name}</Column>
      <Column>{attendance.pendingSelectionCount}</Column>
    </ListItem>
  )
}

export default AttendanceItem
