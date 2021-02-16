import { ApolloError, useQuery } from '@apollo/client'
import React, { ReactElement, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { ContainerCard } from '../../lib/components'
import { EVENT_QUERY } from '../../operations/queries/Event'
import { useAppContext } from '../app/AppContext'
import { PageContainer, SpacingBottom } from './InvestorPermissionsDashboard.styled'
import InvestorPermissionsForm from './InvestorPermissionsForm'
import InvestorPermissionsList from './InvestorPermissionsList'

const InvestorPermissionsDashboard = (): ReactElement => {
  type Ticket = {
    attendanceId?: string
    bookingRef: string
    name?: string
  }
  const [tickets, setTickets] = useState<Array<Ticket>>([])
  const { conferenceSlug, token } = useAppContext()
  const [defaultSelectionsCount, setDefaultSelectionsCount] = useState<number | undefined>()
  const {
    loading,
    error,
    data,
  }: {
    data?: {
      event: {
        configuration: {
          investorMeetingConfiguration: {
            defaultStartupSelections: number
          }
        }
      }
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(EVENT_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
  })

  useEffect(() => {
    if (data) {
      const selections =
        data?.event.configuration.investorMeetingConfiguration.defaultStartupSelections
      setDefaultSelectionsCount(selections)
    }
  }, [data])

  return (
    <>
      <Helmet>
        <title>Investor permissions</title>
      </Helmet>
      <PageContainer>
        <ContainerCard color="#555" title="Investor portal permissions">
          <h4>Give investors permission to access the Investor Portal.</h4>
          <SpacingBottom>
            <InvestorPermissionsForm
              defaultSelectionsCount={defaultSelectionsCount}
              setTickets={setTickets}
            />
          </SpacingBottom>
          <SpacingBottom>
            <InvestorPermissionsList tickets={tickets} />
          </SpacingBottom>
        </ContainerCard>
      </PageContainer>
    </>
  )
}

export default InvestorPermissionsDashboard
