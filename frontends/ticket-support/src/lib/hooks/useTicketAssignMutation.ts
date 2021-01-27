import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'
import { Ticket, UserError } from '../types'

type TicketAssignData = {
  ticketAssign: {
    ticket: Ticket
    userErrors: UserError[]
  }
}

type AssignTicketsArgs = {
  email: string
  firstName: string
  lastName: string
  notify: boolean
  reason?: string
  ticketId: string
}

const useAssignTicketMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')

  const [assignTicketMutation] = useMutation<TicketAssignData>(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        setError('')
      }
      if (ticketAssign?.userErrors.length) {
        setError(ticketAssign.userErrors[0]?.message)
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  const assignTicket = async ({ reason, ...variables }: AssignTicketsArgs) => {
    if (reason) {
      await assignTicketMutation({
        context: {
          headers: {
            'x-admin-reason': reason,
          },
          slug: conferenceSlug,
          token,
        },
        variables,
      })
    }
  }

  return {
    assignTicket,
    error,
  }
}

export default useAssignTicketMutation
