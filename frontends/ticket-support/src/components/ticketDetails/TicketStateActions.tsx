import React from 'react'
import styled from 'styled-components'

import { TextButton } from '../../lib/components/atoms/Button'
import { useModalState } from '../../lib/components/molecules/Modal'
import { Ticket } from '../../lib/types'
import ClaimTicketModal from '../ticketActions/ClaimTicketModal'
import StatePlate from '../ticketItem/StatePlate'

const TicketStateContainer = styled.div``

const StyledLabel = styled.span`
  color: #091a46;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`

const StateActionContainer = styled.div`
  margin-top: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

type TicketStateActionsProps = {
  ticket: Ticket
}

const TicketAction = ({ ticket }: { ticket: Ticket }) => {
  const { isOpen, openModal, closeModal } = useModalState()

  switch (ticket?.state) {
    case 'PENDING':
      return (
        <>
          <TextButton onClick={openModal}>Claim ticket</TextButton>
          <ClaimTicketModal isOpen={isOpen} ticket={ticket} onRequestClose={closeModal} />
        </>
      )
    default:
      return null
  }
}

const TicketStateActions = ({ ticket }: TicketStateActionsProps) => {
  return (
    <TicketStateContainer>
      <StyledLabel>Ticket status</StyledLabel>
      <StateActionContainer>
        <StatePlate state={ticket?.state} />
        <TicketAction ticket={ticket} />
      </StateActionContainer>
    </TicketStateContainer>
  )
}

export default TicketStateActions
