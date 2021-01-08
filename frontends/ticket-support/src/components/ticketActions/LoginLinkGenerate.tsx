import { useMutation } from '@apollo/client'
import React from 'react'

import { Tooltip } from '../../lib/components'
import { Account } from '../../lib/types'
import MAGIC_LINK_GENERATE from '../../operations/mutations/LoginLinkGenerate'
import { useAppContext } from '../app/AppContext'
import { Button, TextHighlight } from '../order/OrderDetails'

const LoginLinkGenerate = ({ account }: { account: Account }) => {
  const { conferenceSlug, token } = useAppContext()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [generateLoginLink, { data, loading, error }] = useMutation(MAGIC_LINK_GENERATE)
  if (loading) return <p>Generating login link...</p>
  if (error) return <p>Error generating login link. Reason {error.message}</p>
  if (data)
    return (
      <Tooltip copyToClip value={data.assignmentMagicLinkGenerate.loginLink}>
        <TextHighlight>Generated login link</TextHighlight>
      </Tooltip>
    )

  return (
    <Button
      style={{ cursor: 'pointer' }}
      type="button"
      onClick={async () => {
        // eslint-disable-next-line no-alert
        const reason = prompt('Please enter reason for this change(required)')
        if (reason) {
          await generateLoginLink({
            context: {
              headers: {
                'x-admin-reason': reason,
              },
              slug: conferenceSlug,
              token,
            },
            variables: {
              input: {
                email: account.email,
                eventSlug: conferenceSlug,
              },
            },
          })
        }
      }}
    >
      Generate login link
    </Button>
  )
}

export default LoginLinkGenerate
