import { useMutation } from '@apollo/client'
import React, { useContext, useState, useEffect } from 'react'
import TICKET_REJECT_MUTATION from '../../operations/mutations/TicketReject'
import { AppContext } from '../app/App'
import { Button } from '../ticketDetails/TicketDetails'
import Warning from './Warning'

const TicketReject = ({ ticketId } : { ticketId :string}) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [rejectReason, setRejectReason] = useState<string>('')
  const [error, setError] = useState<string | undefined>()
  const [rejectStatus, setRejectStatus] = useState({
    message: '',
    type: ''
  })
  const [emailNotification, setEmailNotification] = useState(true)

  useEffect(() => {
    if(rejectReason) {
      ticketReject({
        context: {
          token,
          slug: conferenceSlug,
          headers: {
            'x-admin-reason': rejectReason
          }
        },
        refetchQueries: ['TicketAuditTrail', 'Ticket'],
        variables: {
          ticketId,
          notify: emailNotification
        }
      })
    }
  }, [rejectReason])

  const [ticketReject] = useMutation(TICKET_REJECT_MUTATION, {
    onCompleted: ({ ticketReject }: {
      ticketReject: {
        userErrors: [{message: string}]
      }
    }) => {
      if (ticketReject?.userErrors.length) {
        setRejectStatus({
          message: ticketReject.userErrors[0].message,
          type: 'ERROR'
        })
      } else {
        setRejectStatus({
          message: 'Unassign/reject was successful',
          type: 'SUCCESS'
        })
        setError('')
      }
    },
    refetchQueries: ['Ticket'],
  })

  const rejectTicket = () => {
    const reason = prompt('Please enter reason for this change(required)')
    if(reason) {
      setRejectReason(reason)
    } else {
      setError('Reason has to be provided')
    }
  }

  return (
    <div>
      {error && <Warning>{error}</Warning>}
      {rejectStatus && rejectStatus.message}
      <Warning>
        <span>Only super admins can unassign/reject a ticket that has been locked(already used to login into our apps)</span>
      </Warning>
      <div>
        <div>
          <span>Send email notification to assignee</span>
          <input
            name="emailNotification"
            type="checkbox"
            checked={emailNotification}
            onChange={e => setEmailNotification(e.target.checked)} />
        </div>
          <Button onClick={() => {
            if (confirm('Are you sure you want to unassign/reject this ticket? This will have many implications to our systems and attendee! Make sure you are fully aware what this change does before executing it!')) {
              rejectTicket()
            }
          }}>
          Unassign
        </Button>
      </div>
    </div>
  )
}

export default TicketReject
