/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { useMutation } from '@apollo/client'
import React, { FC, useContext, useEffect, useState } from 'react'

import UNLOCK_MUTATION from '../../operations/mutations/TicketUnlock'
import { AppContext } from '../app/App'
import { Button } from '../ticketDetails/TicketDetails'

interface IProps {
  bookingRef: string
}

const TicketUnlock: FC<IProps> = ({ bookingRef }: IProps) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [claimReason, setClaimReason] = useState<string>('')
  const [claimReasonError, setClaimReasonError] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [unlockTicket, { data, loading, error }] = useMutation(UNLOCK_MUTATION)

  useEffect(() => {
    if(claimReason) {
      unlockTicket({
        context: {
          token,
          slug: conferenceSlug,
          headers: {
            'x-admin-reason': claimReason
          }
        },
        variables: {
          input: { reference: bookingRef },
        },
      })
    }
  }, [claimReason])

  const claimTicket = () => {
    const reason = prompt('Please enter reason for this change(required)')
    if(reason) {
      setClaimReason(reason)
    } else {
      setClaimReasonError('Reason is required on this action.')
    }
  }

  if (loading) return <p>Unlocking ticket...</p>
  if (error) return <p>Error unlocking ticket. Reason: {error.message}</p>
  if (data) return <p>Ticket unlocked.</p>

  return (
    <Button
      style={{ cursor: 'pointer' }}
      type="button"
      onClick={async () => {
        if (confirm('Are you sure you want to unlock this ticket?')) {
          await unlockTicket({
            variables: {
              input: { reference: bookingRef },
            },
          })
        }
      }}
    >
      Unlock
    </Button>
  )
}

export default TicketUnlock
