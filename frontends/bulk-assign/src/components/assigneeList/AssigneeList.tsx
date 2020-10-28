import React from 'react'
import styled from 'styled-components'

import { AppTypes } from '../app/App'
import AssigneeItem from '../assigneeItem/AssigneeItem'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const AssigneeList = ({list, conferenceSlug}: {list: AppTypes['assigneesList']; conferenceSlug: AppTypes['conferenceSlug']}) => {
  if (!list || list?.length < 0) return null
  return (
    <StyledList>
      <AssigneeItem conferenceSlug={conferenceSlug} bookingRef="Booking Ref" firstName="First & " lastName="last name" email="Email" />
      {list.map(({firstName, lastName, email, bookingRef, ticketId}) => {
        return <AssigneeItem conferenceSlug={conferenceSlug} bookingRef={bookingRef} firstName={firstName} lastName={lastName} email={email} ticketId={ticketId} />
      })}
    </StyledList>
  )
}

export default AssigneeList
