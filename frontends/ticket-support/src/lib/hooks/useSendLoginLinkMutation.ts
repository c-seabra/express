import { useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import ASSIGNMENT_LOGIN_LINK from '../../operations/mutations/AssignmentLoginLinkRequest'
import { Account, UserError } from '../types'
import { useErrorSnackbar, useSuccessSnackbar } from './useSnackbarMessage'

type SendLoginLinkMutationResult = {
  assignmentMagicLinkLoginRequest: {
    userErrors: UserError[]
  }
}

const useSendLoginLinkMutation = ({ assignee }: { assignee: Account }) => {
  const { conferenceSlug, token } = useAppContext()
  const success = useSuccessSnackbar()
  const error = useErrorSnackbar()

  const [sendLink] = useMutation<SendLoginLinkMutationResult>(ASSIGNMENT_LOGIN_LINK, {
    onCompleted: ({ assignmentMagicLinkLoginRequest }) => {
      if (assignmentMagicLinkLoginRequest?.userErrors[0]) {
        error(assignmentMagicLinkLoginRequest?.userErrors[0].message)
      } else {
        success('Login link sent')
      }
    },
    onError: e => error(e.message),
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  const sendLoginLink = async (reason: string) => {
    if (reason) {
      await sendLink({
        context: {
          headers: {
            'x-admin-reason': reason,
          },
          slug: conferenceSlug,
          token,
        },
        variables: {
          email: assignee.email,
        },
      })
    }
  }

  return {
    sendLoginLink,
  }
}

export default useSendLoginLinkMutation
