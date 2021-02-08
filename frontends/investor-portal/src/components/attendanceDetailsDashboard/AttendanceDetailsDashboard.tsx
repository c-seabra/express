import { ApolloError, useQuery } from '@apollo/client'
import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

import { Label } from '../../lib/components'
import ContainerCard from '../../lib/components/atoms/ContainerCard'
import { Attendance, AttendanceAppearanceSelection } from '../../lib/types'
import { ATTENDANCE_DETAILS_QUERY } from '../../operations/queries/AttendanceDetails'
import { useAppContext } from '../app/AppContext'
import AttendanceAppearanceSelectionsList from '../attendanceAppearanceSelection'
import { DashboardDetailsContainer } from './AttendanceDetailsDashboard.styled'

const AttendanceDetailsDashboard = (): ReactElement => {
  const { attendanceId } = useParams<{ attendanceId: string }>()
  const { conferenceSlug, token } = useAppContext()

  const {
    data,
    error,
    loading,
  }: {
    data?: {
      attendance: Attendance
    }
    error?: ApolloError
    loading?: boolean
  } = useQuery(ATTENDANCE_DETAILS_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      attendance_id: attendanceId,
    },
  })

  const selections: AttendanceAppearanceSelection[] =
    data?.attendance.attendanceAppearanceSelections?.edges.flatMap(edge => edge.node) || []

  return (
    <DashboardDetailsContainer>
      <Helmet>
        <title>Investor Details - Investor Portal</title>
      </Helmet>
      <Label>{data?.attendance.name}</Label>
      <ContainerCard color="#4688D9" title="Startup Confirmations">
        <AttendanceAppearanceSelectionsList error={error} list={selections} loading={loading} />
      </ContainerCard>
    </DashboardDetailsContainer>
  )
}

export default AttendanceDetailsDashboard
