import React, { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { ContainerCard } from '../../lib/components';
import Breadcrumbs, {
  Breadcrumb,
} from '../../lib/components/molecules/Breadcrumbs';
import { useEventQuery } from '../../lib/hooks';
import Loader from '../../lib/Loading';
import Warning from '../settingsActions/Warning';
import {
  BreadcrumbsContainer,
  PageContainer,
  SpacingBottom,
} from './InvestorPermissionsDashboard.styled';
import InvestorPermissionsForm from './InvestorPermissionsForm';
import InvestorPermissionsList from './InvestorPermissionsList';

const InvestorPermissionsDashboard = (): ReactElement => {
  type Ticket = {
    attendanceId?: string;
    bookingRef: string;
    name?: string;
  };
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [updating, setUpdating] = useState<boolean>(false);
  const [defaultSelectionsCount, setDefaultSelectionsCount] = useState<
    number | undefined
  >();
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
      label: 'Investor Permissions',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Investor permissions</title>
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

        <ContainerCard color="#555" title="Investor portal permissions">
          <h4>Give investors permission to access the Investor Portal.</h4>
          <SpacingBottom>
            <InvestorPermissionsForm
              defaultSelectionsCount={defaultSelectionsCount}
              setTickets={setTickets}
              setUpdating={setUpdating}
            />
          </SpacingBottom>
          <SpacingBottom>
            <InvestorPermissionsList tickets={tickets} />
          </SpacingBottom>
        </ContainerCard>
      </PageContainer>
    </>
  );
};

export default InvestorPermissionsDashboard;
