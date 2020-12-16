import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import ASSIGNMENT_LOGIN_LINK from '../../operations/mutations/AssignmentLoginLinkRequest'

import { Account } from '../../lib/types'
import { Button, Text } from '../ticketDetails/TicketDetails'
import { useAppContext } from '../app/AppContext'

const LoginLinkRequest = ({ account }: { account: Account }) => {
  const { conferenceSlug, token } = useAppContext()
  const [lastLoginLinkRequestedAt, setLastLoginLinkRequestedAt] = useState<string>()
  const [loginLinkRequestReasonError, setLoginLinkRequestReasonError] = useState<string>()

  const formatDateTime = (dateTime: string) => {
    const formattedDateTime = new Date(dateTime)
    return formattedDateTime.toString()
  }

  const [sendLoginLink] = useMutation(ASSIGNMENT_LOGIN_LINK, {
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
  })

  if (
    account?.lastLoginTokenCreatedAt &&
    account?.lastLoginTokenCreatedAt != lastLoginLinkRequestedAt
  ) {
    setLastLoginLinkRequestedAt(account.lastLoginTokenCreatedAt)
  }

  const sendAssignmentLoginLink = (email: string) => {
    const reason = prompt('Please enter reason for this change(required)')
    if (reason) {
      sendLoginLink({
        context: {
          token,
          slug: conferenceSlug,
          headers: {
            'x-admin-reason': reason,
          },
        },
        variables: {
          email,
        },
      })
    } else {
      setLoginLinkRequestReasonError('Reason is required on this action.')
    }
  }

  return (
    <>
      {lastLoginLinkRequestedAt ? (
        <Text>Last login link requested at: {formatDateTime(lastLoginLinkRequestedAt)}</Text>
      ) : (
        <Text>No login links requested for assignee</Text>
      )}
      <Text>
        <a
          href={'https://metabase.cilabs.com/question/1184?email=' + account.email}
          target="_blank"
        >
          Check Ticket Machine emails sent to assignee on metabase
        </a>
      </Text>
      {loginLinkRequestReasonError && <Text>You must provide a reason for requesting a link</Text>}
      <Button
        onClick={() => {
          if (confirm('Are you sure you want to send another login link to this assignee?')) {
            sendAssignmentLoginLink(account.email)
          }
        }}
      >
        Send assignee login link email
      </Button>
    </>
  )
}

export default LoginLinkRequest
