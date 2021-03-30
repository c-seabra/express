import Icon from '@websummit/components/src/atoms/Icon';
import Tooltip from '@websummit/components/src/atoms/Tooltip';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import {
  EventQuery,
  useCommerceListPaymentMethodsQuery,
  useEventQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { getServicesReadyForEvent } from '../../lib/utils/eventConfig';
import { useAppContext } from '../app/AppContext';
import PaymentMethods from '../organisms/PaymentMethods';
import SelectTax from '../organisms/SelectTax';
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
  id: Tab;
  title: string;
};

const settings: Setting[] = [
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
  {
    id: 'billing_invoicing',
    title: 'Billing & invoicing',
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

const checkEventInfoCompletion = (data?: EventQuery): boolean => {
  if (data) {
    const { event } = data;
    return !!(
      event?.baseUrl &&
      event?.country &&
      event?.currency &&
      event?.endDate &&
      event?.startDate &&
      event?.taxNumber &&
      event?.timeZone &&
      event?.name &&
      event?.slug
    );
  }

  return false;
};

type Rule = {
  ready: boolean;
  text?: string;
};

const settingsTableShape = (
  currentTab: Setting,
  configCompleteRules: {
    billing_invoicing: Rule;
    event_info: Rule;
    payment_methods: Rule;
    tax_info: Rule;
  },
): ColumnDescriptor<Setting>[] => [
  {
    overrideStyle: true,
    renderCell: ({ id, title }) => (
      <Tab isSelected={id === currentTab.id}>
        {title}
        <Tooltip content={configCompleteRules[id].text}>
          {!configCompleteRules[id].ready && (
            <Icon color="#E15554">error_outline</Icon>
          )}
        </Tooltip>
      </Tab>
    ),
    width: '100%',
  },
];

const EventSettings = () => {
  const { slug } = useParams<{ slug: string }>();
  const { conferenceSlug, token } = useAppContext();

  const usedSlug = slug || conferenceSlug;

  const [currentTab, setCurrentTab] = useState<Setting>(settings[0]);

  const { data, loading, refetch } = useEventQuery({
    context: {
      token,
    },
    skip: !usedSlug,
    variables: {
      slug: usedSlug,
    },
  });

  const { data: paymentMethodsData } = useCommerceListPaymentMethodsQuery({
    context: { headers: { 'x-event-id': slug }, token },
    skip: !slug,
  });

  const configCompletion = getServicesReadyForEvent(data);

  const eventInfoSpecificCompletion = checkEventInfoCompletion(data);

  const configCompleteRules = {
    // TODO - fill the 'true' with rules regarding config completion
    billing_invoicing: {
      ready: true,
    },
    event_info: {
      ready: configCompletion.avenger.ready && eventInfoSpecificCompletion,
      text: !eventInfoSpecificCompletion ? 'Event information incomplete' : '',
    },
    payment_methods: {
      ready: configCompletion.stores.ready,
      text: configCompletion.stores.missing.some(
        (missingField) => missingField === 'legalEntity',
      )
        ? 'Host company missing from event information'
        : 'Configuration incomplete',
    },
    tax_info: {
      ready: true,
    },
  };

  const settingsTable = settingsTableShape(currentTab, configCompleteRules);

  const taxes = data?.event?.taxRates?.edges?.map((node) => node.node);
  const eventName = data?.event?.name;
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
      <Header>Event settings</Header>
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
          <SettingsSection title={currentTab.title}>
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
            {currentTab.id === 'payment_methods' && (
              <PaymentMethods
                paymentMethods={
                  paymentMethodsData?.commerceListPaymentMethods?.hits
                }
              />
            )}
          </SettingsSection>
        </SettingsForm>
      </SettingsContainer>
    </PageWrapper>
  );
};

export default EventSettings;
