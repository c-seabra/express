import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'
import { Ticket, UserError } from '../../lib/types'

export const TICKET_VOID_MUTATION = gql`
  mutation VoidTicket($input: TicketVoidInput!) {
    ticketVoid(input: $input) {
      ticket {
        id
        state
        bookingRef
      }
      userErrors {
        message
        path
      }
    }
  }
`

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

export const useTicketVoidMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')
  const snackbar = useSuccessSnackbar()
  const errSnackbar = useErrorSnackbar()

  const [voidTicketMutation] = useMutation<TicketVoidResponse>(TICKET_VOID_MUTATION, {
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
    await voidTicketMutation({
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

