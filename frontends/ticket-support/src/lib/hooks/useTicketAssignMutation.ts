import { useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'
import { Ticket, UserError } from '../types'
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage'

type TicketAssignData = {
  ticketAssign: {
    ticket: Ticket
    userErrors: UserError[]
  }
}

type AssignTicketsArgs = {
  email: string
  firstName: string
  lastName?: string
  notify?: boolean
  reason: string
  ticketId: string
}

const useAssignTicketMutation = () => {
  const { conferenceSlug, token } = useAppContext()
  const success = useSuccessSnackbar()
  const error = useErrorSnackbar()

  const [assignTicketMutation] = useMutation<TicketAssignData>(TICKET_ASSIGN_MUTATION, {
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.userErrors[0]) {
        error(ticketAssign?.userErrors[0].message)
      } else {
        success('Ticket reassigned successfully')
      }
    },
    onError: e => error(e.message),
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  const assignTicket = async ({ reason, ...variables }: AssignTicketsArgs) => {
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

  return {
    assignTicket,
    error,
  }
}

export default useAssignTicketMutation
