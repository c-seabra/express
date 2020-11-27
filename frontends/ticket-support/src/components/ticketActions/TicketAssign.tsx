import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'
import { AppContext } from '../app/App'

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

const Warning = styled.div`
  font-style: italic;
  font-size: 0.8em;
  span {
    background: #ed1846;
    padding: .25rem;
    line-height: 1.25rem;
    color: #fff;
  }
`

const TicketAssign: React.FC<{ ticketId: string; resetReassignment: (value: boolean) => void }> = ({
  ticketId,
  resetReassignment,
}) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [email, setEmail] = useState<string | undefined>()
  const [firstName, setFirstName] = useState<string | undefined>()
  const [lastName, setLastName] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const assign = () => {
    if (firstName && email) {
      ticketAssignMutation()
    }
  }

  const [ticketAssignMutation] = useMutation(TICKET_ASSIGN_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ ticketAssign }) => {
      if (ticketAssign?.ticket?.assignment?.assignee) {
        resetReassignment(false)
      }
      if (ticketAssign?.userErrors.length) {
        setError(ticketAssign.userErrors[0])
      }
    },
    refetchQueries: ['MyTickets'],
    variables: {
      email,
      firstName,
      lastName,
      ticketId,
    },
  })

  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault()
          if (confirm('Are you sure you want to reassign this ticket? This will have  implications in our systems and current assignee! Make sure you know what you are doing!')) {
            assign()
          }
        }}
      >
        {error && <div>{error}</div>}
        <Field>
          <span>First name:</span>
          <input type="text" name="firstName" onChange={e => setFirstName(e.target.value)} required />
        </Field>
        <Field>
          <span>Last name:</span>
          <input type="text" name="lastName" onChange={e => setLastName(e.target.value)} />
        </Field>
        <Field>
          <span>Email:</span>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} required />
        </Field>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <Warning><span>Email notifications will be sent to new assignee, old assignee and order owner</span></Warning>
    </div>
  )
}

export default TicketAssign
