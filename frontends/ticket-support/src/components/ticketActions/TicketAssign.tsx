import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import TICKET_ASSIGN_MUTATION from '../../operations/mutations/TicketAssign'
import { AppContext } from '../app/App'

const Form = styled.form`
  display: flex;
  flex-direction: row;
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
  margin: 1rem 0;
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
  const [email, setEmail] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [error, setError] = useState()

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
    <Form
      onSubmit={e => {
        e.preventDefault()
        assign()
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
  )
}

export default TicketAssign
