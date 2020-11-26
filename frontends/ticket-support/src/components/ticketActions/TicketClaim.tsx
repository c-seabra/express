import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import { TICKET_ACCEPT_MUTATION } from '../../operations/mutations/TicketAccept'
import { AppContext } from '../app/App'

const TicketClaim = ({ ticketId } : { ticketId :string}) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [claimStatus, setClaimStatus] = useState({
    message: '',
    type: ''
  })

  const [ticketAccept] = useMutation(TICKET_ACCEPT_MUTATION, {
    onCompleted: ({ ticketAccept }: {
      ticketAccept: {
        userErrors: [{message: string}]
      }
    }) => {
      if (ticketAccept?.userErrors.length) {
        setClaimStatus({
          message: ticketAccept.userErrors[0].message,
          type: 'ERROR'
        })
      } else {
        setClaimStatus({
          message: 'Auto claim was successful',
          type: 'SUCCESS'
        })
      }
    }
  })

  const claimTicket = () => {
    ticketAccept({
      context: {
        token,
        slug: conferenceSlug
      },
      variables: {
        ticketId
      }
    })
  }

  return (
    <div>
      {claimStatus.message}
      <button type="button" onClick={() => claimTicket()}>Auto claim</button>
    </div>
  )
}

export default TicketClaim
