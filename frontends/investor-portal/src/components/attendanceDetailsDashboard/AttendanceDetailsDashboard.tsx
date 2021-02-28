import { ApolloError, useQuery } from '@apollo/client';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Label } from '../../lib/components';
import ContainerCard from '../../lib/components/atoms/ContainerCard';
import { Attendance, AttendanceAppearanceSelection } from '../../lib/types';
import { ATTENDANCE_DETAILS_QUERY } from '../../operations/queries/AttendanceDetails';
import { useAppContext } from '../app/AppContext';
import AttendanceAppearanceSelectionsList from '../attendanceAppearanceSelection';
import AttendanceInvestorSession from '../attendanceInvestorSession/AttendanceInvestorSession';
import { BorderBottom } from '../settingsDashboard/SettingsDashboard.styled';
import { DashboardDetailsContainer } from './AttendanceDetailsDashboard.styled';

const AttendanceDetailsDashboard = (): ReactElement => {
  const { attendanceId } = useParams<{ attendanceId: string }>();
  const { conferenceSlug, token } = useAppContext();

  const {
    data,
    error,
    loading,
  }: {
    data?: {
      attendance: Attendance;
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(ATTENDANCE_DETAILS_QUERY, {
    context: {
      slug: conferenceSlug,
      token,
    },
    variables: {
      attendance_id: attendanceId,
    },
  });

  const selections: AttendanceAppearanceSelection[] =
    data?.attendance.attendanceAppearanceSelections?.edges.flatMap(
      (edge) => edge.node,
    ) || [];

  const startsAt = data?.attendance.investorSession?.startsAt;
  const endsAt = data?.attendance.investorSession?.endsAt;

  return (
    <DashboardDetailsContainer>
      <Helmet>
        <title>Investor Details - Investor Portal</title>
      </Helmet>
      <Label>{data?.attendance.name}</Label>
      <BorderBottom>
        <ContainerCard color="#00ACA8" title="Investor Session">
          <AttendanceInvestorSession
            attendanceId={attendanceId}
            currentEndsAt={endsAt}
            currentStartsAt={startsAt}
            selections={selections}
          />
        </ContainerCard>
      </BorderBottom>
      <ContainerCard color="#4688D9" title="Startup Confirmations">
        <AttendanceAppearanceSelectionsList
          attendanceId={attendanceId}
          error={error}
          list={selections}
          loading={loading}
        />
      </ContainerCard>
    </DashboardDetailsContainer>
  );
};

export default AttendanceDetailsDashboard;
