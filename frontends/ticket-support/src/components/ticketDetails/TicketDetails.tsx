import React, { ReactElement, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { Input, Tooltip } from '../../lib/components'
import { Button, SecondaryButton } from '../../lib/components/atoms/Button'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import TextHeading from '../../lib/components/atoms/Heading'
import Breadcrumbs, { Breadcrumb } from '../../lib/components/molecules/Breadcrumbs'
import { useModalState } from '../../lib/components/molecules/Modal'
import useSingleTicketQuery from '../../lib/hooks/useSingleTicketQuery'
import Loader from '../../lib/Loading'
import { useAppContext } from '../app/AppContext'
import AuditTrail from '../auditTrail/AuditTrail'
import LoginLinkActions from '../ticketActions/LoginLinkActions'
import TicketAssignModal from '../ticketActions/TicketAssignModal'
import UnassignTicketModal from '../ticketActions/UnassignTicketModal'
import UpdateAppLoginEmail from '../ticketActions/UpdateAppLoginEmail'
import TicketStateActions from './TicketStateActions'

// --- new ---
const Text = styled.div`
  border-radius: 8px;
  padding: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  a {
    color: #337ab7;
    margin: 0 0.25rem;
  }
`

const PageContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;

  display: flex;
  flex-direction: column;
`

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`

const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`

const SpacingBottomSm = styled.div`
  margin-bottom: 1rem;
`

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RowContainer = styled.div`
  display: flex;
`

const ContainerCardInner = styled.div`
  display: flex;
  flex-direction: column;
`

const TicketActionsContainerCard = styled(ContainerCard)`
  margin-right: 3.75rem;
  max-width: 300px;
`

const StyledPairContainer = styled.span`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const StyledLabel = styled.span`
  color: #091a46;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0;
  line-height: 24px;
`

const StyledValue = styled.span`
  color: #0c1439;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 24px;
`

const StyledInnerContainerCard = styled.span`
  display: flex;
  flex-direction: column;
  padding: 32px;
`

const StyledInnerContainerCardWithBorder = styled(StyledInnerContainerCard)`
  border-bottom: 1px solid #dcdfe5;
`

const PrimaryButton = styled(Button)`
  width: 100%;
`

const TextHighlight = styled.span`
  color: #337ab7;
  margin: 0 0.25rem;
`

const TicketDetails = (): ReactElement => {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const { conferenceSlug, token } = useAppContext()
  const [loginEmailChange, setLoginEmailChange] = useState(false)
  const [showAuditTrail, setShowAuditTrail] = useState(false)
  const {
    openModal: openTicketAssignModal,
    isOpen: isTicketAssignModalOpen,
    closeModal: closeTicketAssignModal,
  } = useModalState()
  const {
    openModal: openUnassignTicketModal,
    isOpen: isUnassignTicketModalOpen,
    closeModal: closeUnassignTicketModal,
  } = useModalState()

  const { loading, error, ticket } = useSingleTicketQuery({ reference: bookingRef })

  const assignment = ticket?.assignment
  const assignee = assignment?.assignee
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Web Summit 2020', // TODO get event name
      redirectUrl: '/',
    },
    {
      label: 'Orders',
      redirectUrl: '/orders',
    },
    {
      label: 'Order',
      redirectUrl: '/order',
    },
    {
      label: `Ticket ${bookingRef}`,
    },
  ]

  return (
    <>
      <Helmet>
        <title>Manage {bookingRef} ticket - Ticket machine</title>
      </Helmet>

      {loading && <Loader />}
      {error && <div>{error}</div>}
      {!loading && !error && ticket && (
        <PageContainer>
          <BreadcrumbsContainer>
            <Breadcrumbs routes={breadcrumbsRoutes} />
          </BreadcrumbsContainer>

          <SpacingBottom>
            <StyledRow>
              <TextHeading>Manage ticket</TextHeading>
            </StyledRow>
          </SpacingBottom>

          <RowContainer>
            <TicketActionsContainerCard noPadding>
              <StyledInnerContainerCardWithBorder>
                <StyledPairContainer>
                  <StyledLabel>Ticket reference</StyledLabel>
                  <StyledValue>{bookingRef}</StyledValue>
                </StyledPairContainer>

                <StyledPairContainer>
                  <StyledLabel>Ticket type</StyledLabel>
                  <StyledValue>{ticket?.ticketType?.name}</StyledValue>
                </StyledPairContainer>

                <StyledPairContainer>
                  <TicketStateActions ticket={ticket} />
                </StyledPairContainer>
              </StyledInnerContainerCardWithBorder>

              <StyledInnerContainerCard>
                <SpacingBottomSm>
                  <PrimaryButton onClick={openTicketAssignModal}>Reassign</PrimaryButton>
                  <TicketAssignModal
                    closeModal={closeTicketAssignModal}
                    isOpen={isTicketAssignModalOpen}
                    ticket={ticket}
                  />
                </SpacingBottomSm>

                <SpacingBottomSm>
                  <PrimaryButton onClick={openUnassignTicketModal}>Unassign</PrimaryButton>
                  <UnassignTicketModal
                    isOpen={isUnassignTicketModalOpen}
                    ticket={ticket}
                    onRequestClose={closeUnassignTicketModal}
                  />
                </SpacingBottomSm>

                <Button as={SecondaryButton}>Load history changes</Button>

                <div>
                  <p>History changes</p>
                  <Button onClick={() => setShowAuditTrail(!showAuditTrail)}>
                    {showAuditTrail ? 'Hide' : 'Load History Changes'}
                  </Button>
                  {showAuditTrail && (
                    <AuditTrail
                      bookingRef={bookingRef}
                      conferenceSlug={conferenceSlug as string}
                      token={token as string}
                    />
                  )}
                </div>
              </StyledInnerContainerCard>
            </TicketActionsContainerCard>

            <ContainerCard title="User account details">
              <ContainerCardInner>
                <p>There is a little line below this heading that explains what you can put here</p>

                <SpacingBottom>
                  <StyledLabel>Unique user identifier</StyledLabel>
                  <Input disabled value="dylan.hodge@websummit.net" />
                </SpacingBottom>

                <SpacingBottom>
                  <StyledLabel>App login email</StyledLabel>
                  <Input disabled value={assignment?.appLoginEmail || assignee?.email} />

                  {assignment?.state === 'ACCEPTED' && (
                    <>
                      <Text>
                        App login email:
                        <Tooltip copyToClip value={assignment?.appLoginEmail || assignee?.email}>
                          <TextHighlight>
                            {assignment?.appLoginEmail || assignee?.email}
                          </TextHighlight>
                        </Tooltip>
                      </Text>
                      {loginEmailChange && (
                        <UpdateAppLoginEmail
                          bookingRef={bookingRef}
                          resetLoginEmailChange={setLoginEmailChange}
                        />
                      )}
                      <Button onClick={() => setLoginEmailChange(!loginEmailChange)}>
                        {loginEmailChange ? 'Cancel' : 'Update App Login Email'}
                      </Button>
                    </>
                  )}
                </SpacingBottom>

                {assignee && (
                  <>
                    <SpacingBottomSm>
                      <StyledLabel>Assignment dashboard login link</StyledLabel>
                      <LoginLinkActions assignee={assignee} />
                    </SpacingBottomSm>
                  </>
                )}
              </ContainerCardInner>
            </ContainerCard>
          </RowContainer>
        </PageContainer>
      )}
    </>
  )
}

export default TicketDetails
