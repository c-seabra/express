import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import styled from 'styled-components'

import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import BoxMessage from '../../lib/components/molecules/BoxMessage'
import EditableInput from '../../lib/components/molecules/EditableInput'
import Modal, { useModalState } from '../../lib/components/molecules/Modal'
import { useAppContext } from '../app/AppContext'
import { SpacingBottom, SpacingBottomXs } from '../templates/Spacing'
import UpdateAppLoginEmailModal from "./UpdateAppLoginEmailModal";

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
  const [editMode, setEditMode] = useState(false)

  const cancelAction = () => {
    setEditMode(false)
  }
  const editAction = () => {
    setEditMode(true)
  }
  const saveAction = () => {
    openModal()
  }

  return (
    <>
      <StyledLabel>App login email</StyledLabel>
      <SpacingBottomXs>
        <EditableInput
          editModeOn={editMode}
          placeholder="Type email"
          value={email || 'N/A'}
          onEdit={editAction}
        />
      </SpacingBottomXs>
      {editMode && (
        <>
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
              <Modal isOpen={isOpen} onRequestClose={closeModal} />
              <UpdateAppLoginEmailModal closeModal={closeModal} isOpen={isOpen} />
            </StyledActions>
          </SpacingBottom>
        </>
      )}
    </>
  )
}

export default UpdateAppLoginEmail
