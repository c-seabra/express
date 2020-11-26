import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import TICKET_LOGIN_UPDATE from '../../operations/mutations/UpdateLoginEmail'
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

const Warning = styled.div`
  font-style: italic;
  font-size: 0.8em;
`

const UpdateAppLoginEmail: React.FC<{ bookingRef: string }> = ({
  bookingRef
}) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [email, setEmail] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const updateLoginEmail = () => {
    if (email) {
      ticketLoginUpdate()
    }
  }

  const [ticketLoginUpdate] = useMutation(TICKET_LOGIN_UPDATE, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({assignmentTicketLoginUpdate}) => {
      console.log({assignmentTicketLoginUpdate})
      if (assignmentTicketLoginUpdate?.ticket?.assignment?.assignee) {
        console.log(assignmentTicketLoginUpdate?.ticket?.assignment)
      }
      if (assignmentTicketLoginUpdate?.userErrors?.length) {
        setError(assignmentTicketLoginUpdate.userErrors[0])
      }
    },
    refetchQueries: ['Ticket'],
    variables: {
      appLoginEmail: email,
      bookingRef,
    },
  })

  return (
    <div>
      <Form
        onSubmit={e => {
          e.preventDefault()
          if (confirm('Are you sure you want to change App Login Email for this ticket? This will have many implications in our systems! Make sure you know what you are doing!')) {
            updateLoginEmail()
          }
        }}
      >
        {error && <div>{error}</div>}
        <Field>
          <span>Email:</span>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} required />
        </Field>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <Warning>Change this only if you know how it's going to reflect our systems!</Warning>
    </div>
  )
}

export default UpdateAppLoginEmail
