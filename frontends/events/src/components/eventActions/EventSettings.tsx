import Icon from '@websummit/components/src/atoms/Icon';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import {
  EventQuery,
  useEventQuery,
  useLegalEntitiesQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { useAppContext } from '../app/AppContext';
import PaymentMethods from '../organisms/PaymentMethods';
import SelectTax from '../organisms/SelectTax';
import EventBillingInvoicingForm from './EventBillingInvoicingForm';
import EventInformationForm from './EventInformationForm';
import SettingsSection from './SettingsSection';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  max-width: 1200px;
`;

const Header = styled.div`
  font-size: 24px;
  color: #0c1439;
  font-weight: 500;
`;

const SettingsContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
`;

const SettingTabs = styled(ContainerCard)`
  max-width: 305px;
`;

const SettingsForm = styled(ContainerCard)`
  max-width: 780px;
`;

type Tab = 'event_info' | 'tax_info' | 'payment_methods' | 'billing_invoicing';

type Setting = {
  active?: boolean;
  id: Tab;
  subTitle?: string;
  title: string;
};

const settings: Setting[] = [
  {
    active: false,
    id: 'billing_invoicing',
    subTitle:
      'Provide details of the company hosting the event that will appear on the invoice.',
    title: 'Billing information',
  },
  {
    id: 'event_info',
    title: 'Event information',
  },
  {
    id: 'tax_info',
    title: 'Tax information',
  },
  {
    id: 'payment_methods',
    title: 'Payment methods',
  },
];

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 8px 0 8px;
`;

const Tab = styled.div<{ isSelected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;

  ${(props) =>
    props.isSelected &&
    css`
      font-weight: 600;
    `};
`;

const settingsTableShape = (
  currentTab: Setting,
  configCompleteRules: {
    billing_invoicing: boolean;
    event_info: boolean;
    payment_methods: boolean;
    tax_info: boolean;
  },
): ColumnDescriptor<Setting>[] => [
  {
    overrideStyle: true,
    renderCell: ({ id, title }) => (
      <Tab isSelected={id === currentTab.id}>
        {title}
        {!configCompleteRules[id] && <Icon color="#E15554">error_outline</Icon>}
      </Tab>
    ),
    width: '100%',
  },
];

const checkConfigCompletion = (data?: EventQuery): boolean => {
  if (data) {
    const { event } = data;
    return !!(
      event?.baseUrl &&
      event?.country &&
      event?.currency &&
      event?.endDate &&
      event?.startDate &&
      event?.taxNumber &&
      event?.legalEntity &&
      event?.timeZone &&
      event?.name &&
      event?.slug
    );
  }

  return false;
};

const checkTaxInfoCompletion = (size?: number): boolean => {
  if (size) {
    return size > 0;
  }

  return false;
};

const EventSettings = () => {
  const { slug } = useParams<{ slug: string }>();
  const { token } = useAppContext();
  const [currentTab, setCurrentTab] = useState<Setting>(settings[0]);

  const { data, loading, refetch } = useEventQuery({
    context: {
      token,
    },
    skip: !slug,
    variables: {
      slug,
    },
  });

  const {
    data: entitiesResult,
    loading: entitiesLoading,
    refetch: refetchEntities,
  } = useLegalEntitiesQuery({
    context: {
      token,
    },
  });

  const eventExists = data?.event;
  const eventName = data?.event?.name;
  console.log(data?.event);
  const eventLegalEntity = data?.event?.legalEntity;
  const legalEntities = entitiesResult?.legalEntities.edges?.map(
    (node) => node.node,
  );
  const eventConfigHeaderText = eventExists ? 'settings' : 'setup';
  const taxes = data?.event?.taxRates?.edges?.map((node) => node.node);
  const configCompleteRules = {
    // TODO - fill the 'true' with rules regarding config completion
    billing_invoicing: true,
    event_info: !loading && checkConfigCompletion(data),
    payment_methods: true,
    tax_info:
      !entitiesLoading && !loading && checkTaxInfoCompletion(taxes?.length),
  };
  const settingsTable = settingsTableShape(currentTab, configCompleteRules);
  const breadcrumbsNewRoutes: Breadcrumb[] = [
    {
      label: 'Settings',
    },
    {
      label: 'New event',
    },
  ];

  const breadcrumbsEditRoutes: Breadcrumb[] = [
    {
      label: 'Edit settings',
    },
    {
      label: `${eventName || 'N/A'}`,
    },
  ];
  const breadcrumbs = data?.event
    ? breadcrumbsEditRoutes
    : breadcrumbsNewRoutes;
  const breadcrumbsRoutes: Breadcrumb[] = [
    {
      label: 'Events',
      redirectUrl: '/',
    },
    ...breadcrumbs,
  ];

  return (
    <PageWrapper>
      <Header>Event {eventConfigHeaderText}</Header>
      <BreadcrumbsContainer>
        <Breadcrumbs routes={breadcrumbsRoutes} />
      </BreadcrumbsContainer>

      <SettingsContainer>
        <SettingTabs noPadding>
          <Table<Setting>
            noHeader
            items={settings}
            tableShape={settingsTable}
            onRowClick={(item) =>
              currentTab.id === item.id ? null : setCurrentTab(item)
            }
          />
        </SettingTabs>
        <SettingsForm>
          <SettingsSection
            subTitle={currentTab.subTitle}
            title={currentTab.title}
          >
            {currentTab.id === 'event_info' && (
              <EventInformationForm
                eventInfo={data?.event}
                refetch={refetch}
                slugParam={slug}
              />
            )}
            {currentTab.id === 'tax_info' && (
              <SelectTax
                eventId={data?.event?.id as string}
                loading={loading}
                refetch={refetch}
                taxes={taxes}
              />
            )}
            {currentTab.id === 'billing_invoicing' && (
              <EventBillingInvoicingForm
                eventBilling={eventLegalEntity as any}
                legalEntities={legalEntities as any}
              />
            )}
            {currentTab.id === 'payment_methods' && (
              <PaymentMethods paymentMethods={[]} />
            )}
          </SettingsSection>
        </SettingsForm>
      </SettingsContainer>
    </PageWrapper>
  );
};

export default EventSettings;
