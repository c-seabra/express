import { useMutation } from '@apollo/client'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import IDENTITY_EMAIL_UPDATE from '../../operations/mutations/IdentityEmailUpdate'
import { AppContext } from '../app/App'
import { Account, UserError } from '../../lib/types'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const FormWrap = styled.div`
  margin-bottom: 1rem;
`

const Field = styled.label`
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
  accountId: string
  resetIdentityEmailChange: (value: boolean) => void
}> = ({ accountId, resetIdentityEmailChange }) => {
  const { conferenceSlug, token } = useContext(AppContext)
  const [email, setEmail] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const updateIdentityEmail = () => {
    const reason = prompt('Please enter reason for this change(required)')
    if (reason) {
      identityEmailUpdate({
        context: {
          slug: conferenceSlug,
          token,
          headers: {
            'x-admin-reason': reason,
          },
        },
      })
    } else {
      setError('Reason is required for this action')
    }
  }

  const [identityEmailUpdate, { error: mutationError }] = useMutation<{
    assignmentAccountUpdate: { account: Account; userErrors: [UserError] }
  }>(IDENTITY_EMAIL_UPDATE, {
    onCompleted: ({ assignmentAccountUpdate }) => {
      if (assignmentAccountUpdate?.account?.email) {
        resetIdentityEmailChange(false)
        setError('')
      }
      if (assignmentAccountUpdate?.userErrors?.length) {
        setError(assignmentAccountUpdate.userErrors[0].message)
      }
    },
    refetchQueries: ['TicketAuditTrail', 'Ticket'],
    variables: {
      accountId,
      email,
    },
  })

  return (
    <FormWrap>
      <Warning>
        <span>Only super admins are permitted to make this change</span>
      </Warning>
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
                'Are you sure you want to change the identity email for this assignee? This will have many implications in our systems! Make sure you know what you are doing!'
              )
            ) {
              updateIdentityEmail()
            }
          } else {
            setError('Email field value incorrect')
          }
        }}
      >
        <Field>
          <span>Email:</span>
          <input type="email" name="email" onChange={e => setEmail(e.target.value)} required />
        </Field>
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <Warning>
        <span>
          This email will be used to identify the assignee. An App login email distinctly set for a
          ticket will not be effected, however all other identifications by this email will be
          updated.
          <br /> Change this only if you know how it's going to reflect our systems!
        </span>
      </Warning>
    </FormWrap>
  )
}

export default UpdateAppLoginEmail
