import { useMutation } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { TICKET_ACCEPT_MUTATION } from '../../operations/mutations/TicketAccept'
import { Button } from '../ticketDetails/TicketDetails'
import Warning from './Warning'
import { useAppContext } from '../app/AppContext'

const TicketClaim = ({ ticketId }: { ticketId: string }) => {
  const { conferenceSlug, token } = useAppContext()
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
          token,
          slug: conferenceSlug,
          headers: {
            'x-admin-reason': claimReason,
          },
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
