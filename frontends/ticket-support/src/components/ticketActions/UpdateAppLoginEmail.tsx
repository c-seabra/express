import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import TICKET_LOGIN_UPDATE from '../../operations/mutations/UpdateLoginEmail'
import { AppContext } from '../app/App'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const FormWrap = styled.div`
  margin-bottom: 1rem;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 1rem;
  margin-bottom: 0.5rem;
  input {
    cursor: pointer;
  }
  span {
    margin-bottom: 0.5rem;
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
  margin-bottom: 0.5rem;
  span {
    background: #ed1846;
    padding: 0.25rem;
    line-height: 1.25rem;
    color: #fff;
  }
`

const UpdateAppLoginEmail: React.FC<{
  bookingRef: string
  resetLoginEmailChange: (value: boolean) => void
}> = ({ bookingRef, resetLoginEmailChange }) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [email, setEmail] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const updateLoginEmail = () => {
    const reason = prompt('Please enter reason for this change(required)')
    if (reason) {
      ticketLoginUpdate({
        context: {
          headers: {
            'x-admin-reason': reason,
          },
          slug: conferenceSlug,
          token,
        },
      })
    } else {
      setError('Reason is required for this action')
    }
  }

  const [ticketLoginUpdate, { error: mutationError }] = useMutation(TICKET_LOGIN_UPDATE, {
    onCompleted: ({ assignmentTicketLoginUpdate }) => {
      if (assignmentTicketLoginUpdate?.ticket?.assignment?.assignee) {
        resetLoginEmailChange(false)
        setError('')
      }
      if (assignmentTicketLoginUpdate?.userErrors?.length) {
        setError(assignmentTicketLoginUpdate.userErrors[0])
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
    variables: {
      appLoginEmail: email,
      bookingRef,
    },
  })

  return (
    <FormWrap>
      {error && (
        <Warning>
          <span>{error}</span>
        </Warning>
      )}
      {mutationError && (
        <Warning>
          <span>{mutationError.message}</span>
        </Warning>
      )}
      <Form
        onSubmit={e => {
          e.preventDefault()
          if (email) {
            if (
              confirm(
                'Are you sure you want to change App Login Email for this ticket? This will have many implications in our systems! Make sure you know what you are doing!'
              )
            ) {
              updateLoginEmail()
            }
          } else {
            setError('Email field value incorrect')
          }
        }}
      >
        <Field>
          <span>Email:</span>
          <input required name="email" type="email" onChange={e => setEmail(e.target.value)} />
        </Field>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <Warning>
        <span>
          This email will be used to login to apps and for further conference specific
          communications.
          <br /> Change this only if you know how it's going to reflect our systems!
        </span>
      </Warning>
    </FormWrap>
  )
}

export default UpdateAppLoginEmail
