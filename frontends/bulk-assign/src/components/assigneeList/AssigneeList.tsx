import React from 'react'
import styled from 'styled-components'

import { AssigneesList } from '../app/App'
import AssigneeItemProvider from '../assigneeItem/AssigneeItemProvider'
import AssigneeItem from '../assigneeItem/AssigneeItem'
import AssigneeListHeader from './AssigneeListHeader'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const AssigneeList: React.FC<{list: AssigneesList}> = ({list}) => {
  if (!list || list?.length < 0) return null
  return (
    <StyledList>
      <AssigneeListHeader />
      {list.map(({firstName, lastName, email, bookingRef, autoClaim}) => {
        if (!bookingRef && !email) return (
          <AssigneeItem
            bookingRef={bookingRef}
            firstName={firstName}
            lastName={lastName}
            email={email}
            status={{message: 'Not enough information provided', type: 'ERROR'}}
            claimStatus={{message: 'Not enough information provided', type: 'ERROR'}}
          />
        )
        return <AssigneeItemProvider bookingRef={bookingRef.toUpperCase()} firstName={firstName} lastName={lastName} email={email} autoClaim={autoClaim} />
      })}
    </StyledList>
  )
}

export default AssigneeList
