import { useMutation } from '@apollo/client'

import { useAppContext } from '../../components/app/AppContext'
import MAGIC_LINK_GENERATE from '../../operations/mutations/LoginLinkGenerate'
import { Account } from '../types'

type MagicLinkData = {
  assignmentMagicLinkGenerate: {
    email: string
    loginLink: string
  }
}

const useMagicLinkMutation = ({ assignee }: { assignee: Account }) => {
  const { conferenceSlug, token } = useAppContext()

  const [generateLink, { data, loading, error }] = useMutation<MagicLinkData>(MAGIC_LINK_GENERATE)

  const generateLoginLink = async (reason: string) => {
    if (reason) {
      await generateLink({
        context: {
          headers: {
            'x-admin-reason': reason,
          },
          slug: conferenceSlug,
          token,
        },
        variables: {
          input: {
            email: assignee.email,
            eventSlug: conferenceSlug,
          },
        },
      })
    }
  }

  return {
    data,
    error,
    generateLoginLink,
    loading,
  }
}

export default useMagicLinkMutation
