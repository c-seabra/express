import React, { useContext } from 'react'
import styled from 'styled-components'

import { AppContext } from '../../context/AppContext'
import AssigneeItem from '../assigneeItem/AssigneeItem'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const AssigneeList = () => {
  const { assigneesList, conferenceSlug } = useContext(AppContext)
  if (!assigneesList || assigneesList?.length < 0) return null
  return (
    <StyledList>
      <AssigneeItem conferenceSlug={conferenceSlug} bookingRef="Booking Ref" firstName="First & " lastName="last name" email="Email" />
      {assigneesList.map(({firstName, lastName, email, bookingRef, ticketId}) => {
        return <AssigneeItem conferenceSlug={conferenceSlug} bookingRef={bookingRef} firstName={firstName} lastName={lastName} email={email} ticketId={ticketId} />
      })}
    </StyledList>
  )
}

export default AssigneeList
