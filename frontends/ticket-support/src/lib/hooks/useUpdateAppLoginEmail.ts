import { useMutation } from '@apollo/client'
import { useState } from 'react'

import { useAppContext } from '../../components/app/AppContext'
import TICKET_LOGIN_UPDATE from '../../operations/mutations/UpdateLoginEmail'
import { Ticket, UserError } from '../types'
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage'

type UpdateLoginResponse = {
  response: {
    ticket: Ticket
    userErrors: UserError[]
  }
}

type UpdateLoginTicketsArgs = {
  bookingRef: string
  reason: string
}

const useUpdateLoginMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const [error, setError] = useState('')
  const snackbar = useSuccessSnackbar()
  const errSnackbar = useErrorSnackbar()

  const [updateLoginMutation] = useMutation<UpdateLoginResponse>(TICKET_LOGIN_UPDATE, {
    onCompleted: ({ response }) => {
      snackbar('Login email updated')

      if (response?.userErrors.length) {
        setError(response.userErrors[0]?.message)
        errSnackbar('Updating Login email  failed')
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  const updateLogin = async ({ reason, bookingRef }: UpdateLoginTicketsArgs) => {
    await updateLoginMutation({
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
    updateLogin,
  }
}

export default useUpdateLoginMutation
