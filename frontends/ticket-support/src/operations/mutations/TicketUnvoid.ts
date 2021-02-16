import { gql, useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import { useErrorSnackbar, useSuccessSnackbar } from '../../lib/hooks/useSnackbarMessage'
import { Ticket, UserError } from '../../lib/types'

export const TICKET_UNVOID_MUTATION = gql`
  mutation UnvoidTicket($input: TicketUnvoidInput!) {
    ticketUnvoid(input: $input) {
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

type TicketUnvoidResponse = {
  response: {
    ticket: Ticket
    userErrors: UserError[]
  }
}

export type TicketsUnvoidArgs = {
  bookingRef: string
  reason: string
}

export const useTicketUnvoidMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')
  const snackbar = useSuccessSnackbar()
  const errSnackbar = useErrorSnackbar()

  const [voidTicketMutation] = useMutation<TicketUnvoidResponse>(TICKET_UNVOID_MUTATION, {
    onCompleted: ({ response }) => {
      snackbar('Ticket unvoided')

      if (response?.userErrors.length) {
        setError(response.userErrors[0]?.message)
        errSnackbar('Ticket unvoiding failed')
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  const unvoidTicket = async ({ reason, bookingRef }: TicketsUnvoidArgs) => {
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
    unvoidTicket,
  }
}
