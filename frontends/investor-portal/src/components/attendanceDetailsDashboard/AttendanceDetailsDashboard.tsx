import { ApolloError, useQuery } from '@apollo/client';
import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';

import {
  DestructiveButton,
  Label,
  Modal,
  useModalState,
} from '../../lib/components';
import ContainerCard from '../../lib/components/atoms/ContainerCard';
import { useInvestorPortalRevokeAccessMutation } from '../../lib/hooks';
import { Attendance, AttendanceAppearanceSelection } from '../../lib/types';
import { ATTENDANCE_DETAILS_QUERY } from '../../operations/queries/AttendanceDetails';
import { useAppContext } from '../app/AppContext';
import AttendanceAppearanceSelectionsList from '../attendanceAppearanceSelection';
import AttendanceInvestorSession from '../attendanceInvestorSession/AttendanceInvestorSession';
import { BorderBottom } from '../settingsDashboard/SettingsDashboard.styled';
import {
  ContentContainer,
  DashboardDetailsContainer,
} from './AttendanceDetailsDashboard.styled';

const AttendanceDetailsDashboard = (): ReactElement => {
  const { isOpen, openModal, closeModal } = useModalState();
  const { attendanceId } = useParams<{ attendanceId: string }>();
  const { slug, token } = useAppContext();
  const history = useHistory();

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
      slug,
      token,
    },
    variables: {
      attendance_id: attendanceId,
    },
  });

  const selections: AttendanceAppearanceSelection[] =
    data?.attendance.attendanceAppearanceSelectionsDetails.attendanceAppearanceSelections?.edges.map(
      (edge) => edge.node,
    ) || [];

  const startsAt = data?.attendance.investorSession?.startsAt;
  const endsAt = data?.attendance.investorSession?.endsAt;
  const gdprConsent = data?.attendance.investorGdprConsent;

  const { investorRevokeMutation } = useInvestorPortalRevokeAccessMutation({
    attendanceId,
  });

  const goBackToDashboard = () => {
    history.replace('/dashboard/');
  };

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
            gdprConsent={gdprConsent}
            selections={selections}
          />
        </ContainerCard>
      </BorderBottom>
      <BorderBottom>
        <ContainerCard color="#4688D9" title="Startup Confirmations">
          <AttendanceAppearanceSelectionsList
            attendanceId={attendanceId}
            error={error}
            list={selections}
            loading={loading}
          />
        </ContainerCard>
      </BorderBottom>
      <BorderBottom>
        <ContainerCard color="#00ACA8" title="Remove Investor">
          <ContentContainer>
            <p>
              By taking this action you will be removing access to the Invesort
              portal, along with deleting this investors selections.
            </p>
            <DestructiveButton style={{ marginLeft: 10 }} onClick={openModal}>
              Delete investor
            </DestructiveButton>
          </ContentContainer>

          <Modal
            defaultFooterIsDestructive
            withDefaultFooter
            defaultFooterPositiveButtonAction={async () => {
              await investorRevokeMutation();
              goBackToDashboard();
              closeModal();
            }}
            defaultFooterPositiveButtonText="Delete"
            description="This action can not be un-done!"
            isOpen={isOpen}
            title="Are you sure?"
            onRequestClose={closeModal}
          />
        </ContainerCard>
      </BorderBottom>
    </DashboardDetailsContainer>
  );
};

export default AttendanceDetailsDashboard;
