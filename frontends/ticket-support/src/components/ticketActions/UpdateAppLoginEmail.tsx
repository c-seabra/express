import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import BoxMessage from '../../lib/components/molecules/BoxMessage'
import EditableInput from '../../lib/components/molecules/EditableInput'
import { useModalState } from '../../lib/components/molecules/Modal'
import TICKET_LOGIN_UPDATE from '../../operations/mutations/UpdateLoginEmail'
import { useAppContext } from '../app/AppContext'

const StyledActions = styled.span`
  display: flex;
  justify-content: flex-end;

  & > * {
    margin-right: 16px;
  }
`

const StyledLabel = styled.span`
  color: #091a46;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

const SpacingBottomSm = styled.div`
  margin-bottom: 1rem;
`

const SpacingBottomXs = styled.div`
  margin-bottom: 0.5rem;
`

type UpdateAppLoginEmailProps = {
  bookingRef?: string // TODO Switch to required
  email?: string
  // resetLoginEmailChange: (value: boolean) => void
}

const UpdateAppLoginEmail = ({ email, bookingRef }: UpdateAppLoginEmailProps) => {
  const { conferenceSlug, token } = useAppContext()

  const { isOpen, openModal, closeModal } = useModalState()
  const {
    openModal: openAppLoginModal,
    isOpen: isAppLoginModalOpen,
    closeModal: closeAppLoginModal,
  } = useModalState()

  return (
    <>
      <StyledLabel>App login email</StyledLabel>
      <SpacingBottomXs>
        <EditableInput disabled value={email || 'N/A'} />
      </SpacingBottomXs>
      <SpacingBottomXs>
        <BoxMessage backgroundColor="#F7F7F7" color="#E15554" type="error">
          <>
            This email will be used to login to apps and for further conference specific
            communications
            <br />
            Change this only if you know how it&apos;s going to reflect our systems!
          </>
        </BoxMessage>
      </SpacingBottomXs>
      <SpacingBottom>
        <StyledActions>
          <SecondaryButton>Cancel</SecondaryButton>
          <Button>Save</Button>
        </StyledActions>
      </SpacingBottom>
    </>
  )
}

export default UpdateAppLoginEmail

// <>
// <Text>
// App login email:
//     <Tooltip copyToClip value={assignment?.appLoginEmail || assignee?.email}>
//       <TextHighlight>
//         {assignment?.appLoginEmail || assignee?.email}
//       </TextHighlight>
//     </Tooltip>
// </Text>
// {loginEmailChange && (
// <UpdateAppLoginEmail
// bookingRef={bookingRef}
// resetLoginEmailChange={setLoginEmailChange}
// />
// )}
// <Button onClick={() => setLoginEmailChange(!loginEmailChange)}>
// {loginEmailChange ? 'Cancel' : 'Update App Login Email'}
// </Button>
// </>
