import React, { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { ContainerCard } from '../../lib/components/atoms';
import { Breadcrumb, Breadcrumbs } from '../../lib/components/molecules';
import { useEventQuery } from '../../lib/hooks';
import Loader from '../../lib/Loading';
import { Attendance } from '../../lib/types';
import Warning from '../settingsActions/Warning';
import {
  BreadcrumbsContainer,
  PageContainer,
  SpacingBottom,
} from './InvestorAccessDashboard.styled';
import InvestorAccessForm from './InvestorAccessForm';
import InvestorAccessList from './InvestorAccessList';

const InvestorAccessDashboard = (): ReactElement => {
  const [attendances, setAttendances] = useState<Array<Attendance>>([]);
  const [updating, setUpdating] = useState<boolean>(false);
  const [defaultSelectionsCount, setDefaultSelectionsCount] = useState<
    number | undefined
  >();
  const [invalidBookingReferences, setInvalidBookingReferences] = useState<
    Array<string>
  >([]);
  const { data, loading, error } = useEventQuery();

  useEffect(() => {
    if (data) {
      const selections =
        data?.event.configuration.investorMeetingConfiguration
          .defaultStartupSelections;
      setDefaultSelectionsCount(selections);
    }
  }, [data]);

  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: data?.event.name || 'Home',
      redirectUrl: '/',
    },
    {
      label: 'Investor Access',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Investor Access</title>
      </Helmet>
      <PageContainer>
        {(loading || updating) && <Loader />}
        {error && (
          <Warning>
            <span>{error.message}</span>
          </Warning>
        )}
        <BreadcrumbsContainer>
          <Breadcrumbs routes={breadcrumbsRoutes} />
        </BreadcrumbsContainer>

        <ContainerCard
          color="#555"
          title="Give investor access to the investor portal"
        >
          <SpacingBottom>
            <InvestorAccessForm
              defaultSelectionsCount={defaultSelectionsCount}
              invalidBookingReferences={invalidBookingReferences}
              setAttendances={setAttendances}
              setInvalidBookingReferences={setInvalidBookingReferences}
              setUpdating={setUpdating}
            />
          </SpacingBottom>
          <SpacingBottom>
            <InvestorAccessList
              attendances={attendances}
              invalidBookingReferences={invalidBookingReferences}
            />
          </SpacingBottom>
        </ContainerCard>
      </PageContainer>
    </>
  );
};

export default InvestorAccessDashboard;
