import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import TICKET_UNLOCK_MUTATION from '../../operations/mutations/TicketUnlock'
import { Ticket, UserError } from '../types'

type TicketUnlockResponse = {
  response: {
    ticket: Ticket
    userErrors: UserError[]
  }
}

type UnlockTicketsArgs = {
  email: string
  firstName: string
  lastName?: string
  notify?: boolean
  reason: string
  ticketId: string
}

const useUnlockTicketMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')

  const [unclockTicketMutation] = useMutation<TicketUnlockResponse>(TICKET_UNLOCK_MUTATION, {
    onCompleted: ({ response }) => {
      if (response?.ticket?.assignment?.assignee) {
        setError('')
      }
      if (response?.userErrors.length) {
        setError(response.userErrors[0]?.message)
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  const unlockTicket = async ({ reason, ...variables }: UnlockTicketsArgs) => {
    await unclockTicketMutation({
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

  return {
    error,
    unlockTicket,
  }
}

export default useUnlockTicketMutation
