import React, { useState, useContext, useEffect } from 'react'

import { useQuery, useMutation, ApolloError } from '@apollo/client'
import TICKET_ID_BY_REFERENCE from '../../operations/queries/TicketIdByReference'
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'
import TICKET_ACCEPT_MUTATION from '../../operations/mutations/TicketAccept'

import AssigneeItem from '../assigneeItem/AssigneeItem'

import { AppContext, Assignee } from '../app/App'

export type StatusType = {
  message: string
  type: 'PENDING' | 'SUCCESS' | 'ERROR'
}

type AssigneeItemProvider = {
  bookingRef: string
  firstName: string
  lastName: string
  email: string
  autoClaim?: string
}


const AssigneeItemProvider: React.FC<AssigneeItemProvider> = ({bookingRef, firstName, lastName, email, autoClaim}) => {
  const { token, conferenceSlug } = useContext(AppContext)
  const [status, setStatus] = useState<StatusType>({
    message:'Assignment is still processing.',
    type: 'PENDING'
  })

  const [ticketAssign] = useMutation(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({ ticketAssign }: {
      ticketAssign: {
        userErrors: [{message: string}],
        ticket: {
          assignment: {
            state: 'PENDING' | 'ACCEPTED' | 'REJECTED';
            assignee: Assignee
        }}}
    }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        setStatus({
          message: 'Assignment has been successful',
          type: 'SUCCESS'
        })
      }
      if (ticketAssign?.userErrors.length) {
        setStatus({
          message: ticketAssign.userErrors[0].message,
          type: 'ERROR'
        })
      }
    }
  })

  const [ticketAccept] = useMutation(TICKET_ACCEPT_MUTATION, {
    onCompleted: ({ ticketAccept }: {
      ticketAccept: {
        userErrors: [{message: string}]
      }
    }) => {
      if (ticketAccept?.userErrors.length) {
        setStatus({
          message: ticketAccept.userErrors[0].message,
          type: 'ERROR'
        })
      }
    }
  })

  const {loading, error, data}: {
    loading?: boolean;
    error?: ApolloError;
    data?: {
      ticket?: {
        userErrors?: [{message: string}];
        id: string;
        assignment: {
          state: 'PENDING' | 'ACCEPTED' | 'REJECTED';
          assignee: Assignee
        }
      }
    }
  } = useQuery(TICKET_ID_BY_REFERENCE, {
    context: {
      token,
      slug: conferenceSlug
    },
    variables: {
      reference: bookingRef,
    },
    onCompleted: (data) => {
      if (!data?.ticket?.id) {
        setStatus({ type: 'ERROR', message: `Cannot find Ticket ID for - ${bookingRef}. Your role might not be sufficient for this action.` })
      }
      if (data?.ticket?.userErrors?.length) {
        setStatus({ message: data?.ticket?.userErrors?.[0]?.message, type: 'ERROR' })
      }
    }
  })

  useEffect(() => {
    const claimTicket = (ticketId: string) => {
      ticketAccept({
        context: {
          token,
          slug: conferenceSlug
        },
        variables: {
          ticketId
        }
      }).catch(() => {
        setStatus({
          message: `Unable to assign this ticket - ${bookingRef}`,
          type: 'ERROR'
        })
      })
    }
    if(!error && data?.ticket) {
      if (email === data.ticket.assignment?.assignee?.email) {
        setStatus({
          message: `Current ticket asignee email is same as reassignment email - ${bookingRef}`,
          type: 'ERROR'
        })

        if(autoClaim?.toLowerCase() === 'true' && (data.ticket.assignment?.state === 'PENDING' || data.ticket.assignment?.state === 'REJECTED')) claimTicket(data.ticket.id)

      } else {
        if (data.ticket.assignment === null || data.ticket.assignment?.state === 'PENDING' || data.ticket.assignment?.state === 'REJECTED' && firstName && lastName && data.ticket.id) {
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
          }).catch(() => {
            setStatus({
              message: `Unable to assign this ticket - ${bookingRef}`,
              type: 'ERROR'
            })
          })
          if(status.type !== 'ERROR' && autoClaim?.toLowerCase() === 'true') claimTicket(data.ticket.id)
        } else {
          setStatus({
            message: `This ticket has already been claimed - ${bookingRef}`,
            type: 'ERROR'
          })
        }
      }
    } else {
      setStatus({
        message: `There was an error fetching ticket information, make sure your csv contains all required information - ${bookingRef}`,
        type: 'ERROR'
      })
    }

  }, [data?.ticket?.id as string, error])
  if(loading) return null

  return (
    <AssigneeItem bookingRef={bookingRef} firstName={firstName} lastName={lastName} email={email} status={status} />
  )

}

export default AssigneeItemProvider
