import { useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import ASSIGNMENT_LOGIN_LINK from '../../operations/mutations/AssignmentLoginLinkRequest'
import { Account } from '../types'

const useSendLoginLinkMutation = ({ assignee }: { assignee: Account }) => {
  const { conferenceSlug, token } = useAppContext()

  const [sendLink] = useMutation(ASSIGNMENT_LOGIN_LINK, {
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
