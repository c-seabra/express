/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { useMutation } from '@apollo/client'
import React, { FC, useContext } from 'react'

import UNLOCK_MUTATION from '../../operations/mutations/TicketUnlock'
import { AppContext } from '../app/App'

interface IProps {
  bookingRef: string
}

const TicketUnlock: FC<IProps> = ({ bookingRef }: IProps) => {
  const { conferenceSlug, token } = useContext(AppContext)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [unlockTicket, { data, loading, error }] = useMutation(UNLOCK_MUTATION, {
    context: { slug: conferenceSlug, token },
  })

  if (loading) return <p>Unlocking ticket...</p>
  if (error) return <p>Error unlocking ticket. Reason: {error.message}</p>
  if (data) return <p>Ticket unlocked.</p>

  return (
    <button
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
    </button>
  )
}

export default TicketUnlock
