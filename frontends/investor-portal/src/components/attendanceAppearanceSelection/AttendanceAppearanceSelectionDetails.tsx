import { ApolloError } from '@apollo/client';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import React, { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { Button, ContainerCard } from '../../lib/components';
import LabeledInput from '../../lib/components/molecules/LabeledInput';
import { useSessionTimeslotParticipationCreateMutation } from '../../lib/hooks';
import useAttendanceAppearanceSelectionQuery from '../../lib/hooks/useAttendanceAppearanceSelectionQuery';
import { Attendance, AttendanceAppearanceSelection } from '../../lib/types';
import {
  BreadcrumbsContainer,
  FormArea,
  PageContainer,
  ParticipationCreatePanel,
  SpacingBottom,
  StyledHeading,
  StyledList,
  StyledListItem,
  StyledNoticeContainer,
  StyledSpan,
} from './AttendanceAppearanceSelectionItem.styled';

const AttendanceAppearanceSelectionDetails = (): ReactElement => {
  const { attendanceId: currentAttendance } = useParams<{
    attendanceId: string;
  }>();
  const { selectionId } = useParams<{ selectionId: string }>();

  const [attendanceId, setAttendanceId] = useState<string>();
  const [companyName, setCompanyName] = useState<string>();
  const [participations, setParticipations] = useState<[Attendance]>();
  const [sessionTimeslotId, setSessionTimeslotId] = useState<string>();

  const {
    data,
  }: {
    data?: {
      attendanceAppearanceSelection: AttendanceAppearanceSelection;
    };
    error?: ApolloError;
    loading?: boolean;
  } = useAttendanceAppearanceSelectionQuery({ selectionId });

  const { createSessionTimeslotParticipationMutation } =
    useSessionTimeslotParticipationCreateMutation({
      attendanceId,
      sessionTimeslotId,
    });

  useEffect(() => {
    if (data) {
      setCompanyName(
        data.attendanceAppearanceSelection.appearance.company.name,
      );
      setParticipations(data.attendanceAppearanceSelection.participations);
      setSessionTimeslotId(
        data.attendanceAppearanceSelection.sessionTimeslotId,
      );
    }
  }, [data]);

  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Home',
      redirectUrl: '/dashboard',
    },
    {
      label: 'Startup Confirmations',
      redirectUrl: `/dashboard/${currentAttendance}`,
    },
    {
      label: companyName,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Investor Portal configurations</title>
      </Helmet>
      <PageContainer>
        <BreadcrumbsContainer>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </BreadcrumbsContainer>

        <SpacingBottom>
          <ContainerCard color="#00AFA9" title="Add additional attendance">
            <StyledNoticeContainer>
              <p>
                To add an additional attendee to this session please enter their
                Attendance ID and click submit.
              </p>
            </StyledNoticeContainer>
            <ParticipationCreatePanel
              onSubmit={async (e) => {
                e.preventDefault();
                await createSessionTimeslotParticipationMutation();
              }}
            >
              <FormArea>
                <div>
                  <StyledHeading>Current participants:</StyledHeading>
                  <StyledList>
                    {participations?.map((participant, i) => (
                      <StyledListItem key={i}>
                        {participant.name}
                        <StyledSpan>({participant.companyName})</StyledSpan>
                      </StyledListItem>
                    ))}
                  </StyledList>
                </div>
                <div>
                  <LabeledInput
                    label="New attendance ID"
                    type="text"
                    onChange={(e) => {
                      setAttendanceId(e.target.value);
                    }}
                  />
                  <Button className="full-width" type="submit">
                    Add attendance
                  </Button>
                </div>
              </FormArea>
            </ParticipationCreatePanel>
          </ContainerCard>
        </SpacingBottom>
      </PageContainer>
    </>
  );
};

export default AttendanceAppearanceSelectionDetails;
