import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import BoxMessage from '../../lib/components/molecules/BoxMessage'
import EditableInput from '../../lib/components/molecules/EditableInput'
import Modal, { useModalState } from '../../lib/components/molecules/Modal'
import TICKET_LOGIN_UPDATE from '../../operations/mutations/UpdateLoginEmail'
import { useAppContext } from '../app/AppContext'
import { SpacingBottom, SpacingBottomXs } from '../templates/Spacing'

const StyledActions = styled.span`
  display: flex;
  justify-content: flex-end;
`

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 16px;
`

const StyledLabel = styled.span`
  color: #091a46;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`

type UpdateAppLoginEmailProps = {
  bookingRef?: string // TODO Switch to required
  email?: string
  // resetLoginEmailChange: (value: boolean) => void
}

const UpdateAppLoginEmail = ({ email, bookingRef }: UpdateAppLoginEmailProps) => {
  const { conferenceSlug, token } = useAppContext()
  const { isOpen, openModal, closeModal } = useModalState()
  const cancelAction = () => {}
  const saveAction = () => {}

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
          <StyledSecondaryButton onClick={cancelAction}>Cancel</StyledSecondaryButton>
          <Button onClick={saveAction}>Save</Button>
          <Modal isOpen={false} onRequestClose={null} />
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
