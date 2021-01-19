import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import { Account } from '../../lib/types'
import ASSIGNMENT_LOGIN_LINK from '../../operations/mutations/AssignmentLoginLinkRequest'
import { useAppContext } from '../app/AppContext'

export const Text = styled.div`
  opacity: 0.5;
  color: #07143e;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 17px;

  a {
    color: #337ab7;
    margin: 0 0.25rem;
  }
`

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
          headers: {
            'x-admin-reason': reason,
          },
          slug: conferenceSlug,
          token,
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
          href={`https://metabase.cilabs.com/question/1184?email=${account.email}`}
          target="_blank"
        >
          Check Ticket Machine emails sent to assignee on metabase
        </a>
      </Text>
      {loginLinkRequestReasonError && <Text>You must provide a reason for requesting a link</Text>}
      <Button
        as={SecondaryButton}
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
