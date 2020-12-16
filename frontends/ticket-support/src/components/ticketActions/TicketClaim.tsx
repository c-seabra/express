import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'

import { TICKET_ACCEPT_MUTATION } from '../../operations/mutations/TicketAccept'
import { AppContext } from '../app/App'
import { Button } from '../ticketDetails/TicketDetails'
import Warning from './Warning'

const TicketClaim = ({ ticketId }: { ticketId: string }) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [claimReason, setClaimReason] = useState<string>('')
  const [error, setError] = useState<string | undefined>()
  const [claimStatus, setClaimStatus] = useState({
    message: '',
    type: '',
  })

  useEffect(() => {
    if (claimReason) {
      ticketAccept({
        context: {
          headers: {
            'x-admin-reason': claimReason,
          },
          slug: conferenceSlug,
          token,
        },
        refetchQueries: ['TicketAuditTrail', 'Ticket'],
        variables: {
          ticketId,
        },
      })
    }
  }, [claimReason])

  const [ticketAccept] = useMutation(TICKET_ACCEPT_MUTATION, {
    onCompleted: ({
      ticketAccept,
    }: {
      ticketAccept: {
        userErrors: [{ message: string }]
      }
    }) => {
      if (ticketAccept?.userErrors.length) {
        setClaimStatus({
          message: ticketAccept.userErrors[0].message,
          type: 'ERROR',
        })
      } else {
        setClaimStatus({
          message: 'Auto claim was successful',
          type: 'SUCCESS',
        })
        setError('')
      }
    },
    refetchQueries: ['Ticket'],
  })

  const claimTicket = () => {
    const reason = prompt('Please enter reason for this change(required)')
    if (reason) {
      setClaimReason(reason)
    } else {
      setError('Reason has to be provided')
    }
  }

  return (
    <div>
      {error && <Warning>{error}</Warning>}
      {claimStatus.message}
      <Button type="button" onClick={() => claimTicket()}>
        Auto claim
      </Button>
    </div>
  )
}

export default TicketClaim
