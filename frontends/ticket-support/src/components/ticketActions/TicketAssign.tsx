import { useMutation } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'
import { AppContext } from '../app/App'
import Warning from './Warning'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 1rem;
  margin-bottom: .5rem;
  input {
    cursor: pointer;
  }
  span {
    margin-bottom: .5rem;
  }
`

const SubmitButton = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
`

const TicketAssign: React.FC<{ ticketId: string; resetReassignment: (value: boolean) => void }> = ({
  ticketId,
  resetReassignment,
}) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [email, setEmail] = useState<string | undefined>()
  const [emailNotification, setEmailNotification] = useState(true)
  const [firstName, setFirstName] = useState<string | undefined>()
  const [lastName, setLastName] = useState<string | undefined>()
  const [assignReason, setAssignReason] = useState<string>('')
  const [error, setError] = useState<string | undefined>()

  const assign = () => {
    if (firstName && email && assignReason) {
      ticketAssignMutation()
    }
  }

  useEffect(() => {
    if (assignReason && confirm('Are you sure you want to reassign this ticket? This will have  implications in our systems and current assignee! Make sure you know what you are doing!')) {
      assign()
    }
  }, [assignReason])

  const [ticketAssignMutation] = useMutation(TICKET_ASSIGN_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
      headers: {
        'x-admin-reason': assignReason
      }
    },
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        resetReassignment(false)
        setError('')
      }
      if (ticketAssign?.userErrors.length) {
        setError(ticketAssign.userErrors[0])
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
    variables: {
      email,
      firstName,
      lastName,
      ticketId,
      notify: emailNotification
    },
  })

  return (
    <div>
      {error && <Warning>{error}</Warning>}
      <Form
        onSubmit={e => {
          e.preventDefault()
          const reason = prompt('Please enter reason for this change(required)')
          if(reason) {
            setAssignReason(reason)
          } else {
            setError('Reason has to be provided')
          }
        }}
      >
        <Field>
          <span>First name*</span>
          <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)} required />
        </Field>
        <Field>
          <span>Last name</span>
          <input type="text" name="lastName" onChange={e => setLastName(e.target.value)} />
        </Field>
        <Field>
          <span>Email*</span>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} required />
        </Field>
        <Field>
          <span>
            Send email notification<br/>
            to old and new assignee
          </span>
          <input
            name="isGoing"
            type="checkbox"
            checked={emailNotification}
            onChange={e => setEmailNotification(e.target.checked)} />
        </Field>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <Warning>Email notifications will be sent to new assignee, old assignee and order owner</Warning>
    </div>
  )
}

export default TicketAssign
