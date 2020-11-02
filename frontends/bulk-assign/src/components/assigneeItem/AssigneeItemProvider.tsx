import React, { useState, useContext, useEffect } from 'react'

import { useQuery, useMutation } from '@apollo/client';
import TICKET_ID_BY_REFERENCE from '../../operations/queries/TicketIdByReference'
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'

import AssigneeItem from '../assigneeItem/AssigneeItem'

import { AppContext } from '../app/App'

export type StatusType = {
  message: string
  type: 'pending' | 'success' | 'error'
}


const AssigneeItemProvider = ({bookingRef, firstName, lastName, email} : {
  bookingRef: string
  firstName: string
  lastName: string
  email: string
}) => {
  const { token, conferenceSlug } = useContext(AppContext)
  const [status, setStatus] = useState<StatusType>({
    message:'Assignment is still processing.',
    type: 'pending'
  })

  const [ticketAssign] = useMutation(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        setStatus({
          message: 'Assignment has been successful',
          type: 'success'
        })
      }
      if (ticketAssign?.userErrors.length) {
        setStatus({
          message: ticketAssign.userErrors[0].message,
          type: 'error'
        })
      }
    }
  });
  const {loading, error, data} = useQuery(TICKET_ID_BY_REFERENCE, {
    context: {
      token,
      slug: conferenceSlug
    },
    variables: {
      reference: bookingRef,
    },
    onCompleted: (data) => {
      if (!data?.ticket?.id) {
        setStatus({ type: 'error', message: 'Cannot find Ticket ID for given booking ref. Your role might not be sufficient for this action.' })
      }
      if (data?.ticket?.userErrors?.length) {
        setStatus({ message: data?.ticket?.userErrors?.[0]?.message, type: 'error' })
      }
    }
  });

  useEffect(() => {
    if(firstName && lastName && email && data?.ticket?.id && !error){
      ticketAssign({
        context: {
          token,
          slug: conferenceSlug
        },
        variables: {
          firstName,
          lastName,
          email,
          ticketId: data?.ticket?.id
        }
      })
    } else {
      setStatus({
        message: 'Insufficient information provided, please make sure your csv contains all required information.',
        type: 'error'
      })
    }
  }, [data?.ticket?.id, error])
  if(loading) return null

  return (
    <AssigneeItem bookingRef={bookingRef} firstName={firstName} lastName={lastName} email={email} status={status} />
  )

}

export default AssigneeItemProvider
