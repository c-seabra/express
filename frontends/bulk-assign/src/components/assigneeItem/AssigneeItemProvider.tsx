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
  const [claimStatus, setClaimStatus] = useState<StatusType>({
    message:'Auto claim is still processing.',
    type: 'PENDING'
  })
  const hasAutoClaim = autoClaim?.toLowerCase() === 'true'

  const [ticketAccept] = useMutation(TICKET_ACCEPT_MUTATION, {
    onCompleted: ({ ticketAccept }: {
      ticketAccept: {
        userErrors: [{message: string}]
      }
    }) => {
      if (ticketAccept?.userErrors.length) {
        setClaimStatus({
          message: ticketAccept.userErrors[0].message,
          type: 'ERROR'
        })
      } else {
        setClaimStatus({
          message: 'Auto claim was successful',
          type: 'SUCCESS'
        })
      }
    }
  })

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
        if(hasAutoClaim && data?.ticket?.id) claimTicket(data?.ticket?.id)
      }
      if (ticketAssign?.userErrors.length) {
        setStatus({
          message: ticketAssign.userErrors[0].message,
          type: 'ERROR'
        })
        setClaimStatus({
          message: `${ticketAssign.userErrors[0].message} - and can not auto claim`,
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
        setClaimStatus({
          message: 'Ticket ID is missing and can not auto claim',
          type: 'ERROR'
        })
      }
      if (data?.ticket?.userErrors?.length) {
        setStatus({ message: data?.ticket?.userErrors?.[0]?.message, type: 'ERROR' })
        setClaimStatus({
          message: `${data?.ticket?.userErrors?.[0]?.message} - and can not auto claim`,
          type: 'ERROR'
        })
      }
    }
  })

  useEffect(() => {
    if(!error && data?.ticket) {
      if (email === data.ticket.assignment?.assignee?.email) {
        setStatus({
          message: `Current ticket asignee email is same as reassignment email - ${bookingRef}`,
          type: 'ERROR'
        })

        if(hasAutoClaim && (data.ticket.assignment?.state === 'PENDING' || data.ticket.assignment?.state === 'REJECTED')) {
          claimTicket(data.ticket.id)
        } else {
          setClaimStatus({
            message: `${bookingRef} ticket cannot be auto claimed as it has already been accepted`,
            type: 'ERROR'
          })
        }

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
            setClaimStatus({
              message: 'Can not auto claim',
              type: 'ERROR'
            })
          })
        } else {
          setStatus({
            message: `This ticket has already been claimed - ${bookingRef}`,
            type: 'ERROR'
          })
          setClaimStatus({
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
    <AssigneeItem bookingRef={bookingRef} firstName={firstName} lastName={lastName} email={email} status={status} claimStatus={hasAutoClaim ? claimStatus : undefined} />
  )

}

export default AssigneeItemProvider
