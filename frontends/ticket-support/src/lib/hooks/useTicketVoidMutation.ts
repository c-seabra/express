import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import TICKET_VOID_MUTATION from '../../operations/mutations/TicketVoid'
import { Ticket, UserError } from '../types'
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage'

type TicketVoidResponse = {
  response: {
    ticket: Ticket
    userErrors: UserError[]
  }
}

type TicketsVoidArgs = {
  bookingRef: string
  reason: string
}

const useTicketVoidMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')
  const snackbar = useSuccessSnackbar()
  const errSnackbar = useErrorSnackbar()

  const [unlockTicketMutation] = useMutation<TicketVoidResponse>(TICKET_VOID_MUTATION, {
    onCompleted: ({ response }) => {
      snackbar('Ticket voided')

      if (response?.userErrors.length) {
        setError(response.userErrors[0]?.message)
        errSnackbar('Ticket voiding failed')
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  const voidTicket = async ({ reason, bookingRef }: TicketsVoidArgs) => {
    await unlockTicketMutation({
      context: {
        headers: {
          'x-admin-reason': reason,
        },
        slug: conferenceSlug,
        token,
      },
      variables: {
        input: { reference: bookingRef },
      },
    })
  }

  return {
    error,
    voidTicket,
  }
}

export default useTicketVoidMutation
