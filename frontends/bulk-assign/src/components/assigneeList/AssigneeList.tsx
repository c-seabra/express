import React from 'react'
import styled from 'styled-components'

import { AssigneesList } from '../app/App'
import AssigneeItemProvider from '../assigneeItem/AssigneeItemProvider'
import AssigneeItem from '../assigneeItem/AssigneeItem'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const AssigneeList: React.FC<{list: AssigneesList}> = ({list}) => {
  if (!list || list?.length < 0) return null
  return (
    <StyledList>
      <AssigneeItem bookingRef="Booking Ref" firstName="First & " lastName="last name" email="Email" />
      {list.map(({firstName, lastName, email, bookingRef, autoClaim}) => {
        if (!bookingRef && !email) return null
        return <AssigneeItemProvider bookingRef={bookingRef} firstName={firstName} lastName={lastName} email={email} autoClaim={autoClaim} />
      })}
    </StyledList>
  )
}

export default AssigneeList
