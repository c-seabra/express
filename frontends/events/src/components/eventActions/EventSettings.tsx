import Icon from '@websummit/components/src/atoms/Icon';
import Tooltip from '@websummit/components/src/atoms/Tooltip';
import Breadcrumbs, {
  Breadcrumb,
} from '@websummit/components/src/molecules/Breadcrumbs';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import Table, {
  ColumnDescriptor,
} from '@websummit/components/src/molecules/Table';
import {
  EventQuery,
  useCommerceListPaymentMethodsQuery,
  useEventQuery,
  useLegalEntitiesQuery,
} from '@websummit/graphql/src/@types/operations';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { getServicesReadyForEvent } from '../../lib/utils/eventConfig';
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
  margin-top: 32px;
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

const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 8px 0 8px;
`;

const Tab = styled.div<{ active?: boolean; isSelected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 1.5rem;

  ${(props) =>
    !props.active &&
    css`
      color: #a7a7a7;
      background-color: #f5f5f5;
    `};

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
      event?.endDate &&
      event?.startDate &&
      event?.legalEntity &&
      event?.currency &&
      event?.name &&
      event?.slug
    );
  }

  return false;
};

const checkBillingCompletion = (data?: any): boolean => {
  if (data) {
    const { address, name } = data;
    return !!(
      address &&
      address?.lineOne &&
      address?.country &&
      address?.country?.id &&
      address?.city &&
      address?.region &&
      address?.postalCode &&
      name
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
    renderCell: ({ id, title, active }) => (
      <Tab active={active} isSelected={id === currentTab.id}>
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
  const error = useErrorSnackbar();
  const { conferenceSlug, token } = useAppContext();
  const usedSlug = slug || conferenceSlug;
  const { data, loading, refetch } = useEventQuery({
    context: {
      token,
    },
    onError: (e) => error(e.message),
    skip: !slug,
    variables: {
      slug: usedSlug,
    },
  });

  const { data: entitiesResult } = useLegalEntitiesQuery({
    context: {
      token,
    },
    onError: (e) => error(e.message),
  });

  const eventExists = !!data?.event;
  const eventName = data?.event?.name;
  const eventLegalEntity = data?.event?.legalEntity;
  const legalEntities = entitiesResult?.legalEntities.edges?.map(
    (node) => node.node,
  );
  const eventConfigHeaderText = eventExists ? 'settings' : 'setup';
  const taxes = data?.event?.taxRates?.edges?.map((node) => node.node);
  const { data: paymentMethodsData } = useCommerceListPaymentMethodsQuery({
    context: { slug, token },
    skip: !slug,
  });
  const paymentMethods = paymentMethodsData?.commerceListPaymentMethods?.hits;
  const configCompletion = getServicesReadyForEvent(data);
  const eventPaymentSpecificCompletion =
    !!paymentMethods?.length && configCompletion.stores.ready;
  const eventInfoSpecificCompletion = checkEventInfoCompletion(data);
  const eventTaxSpecificCompletion = !!taxes?.length;
  const eventBillingSpecificCompletion = checkBillingCompletion(
    eventLegalEntity,
  );

  const configCompleteRules = {
    billing_invoicing: {
      ready: checkBillingCompletion(eventLegalEntity),
      text: !eventBillingSpecificCompletion
        ? 'Billing information incomplete'
        : '',
    },
    event_info: {
      ready: configCompletion.avenger.ready && eventInfoSpecificCompletion,
      text: !eventInfoSpecificCompletion ? 'Event information incomplete' : '',
    },
    payment_methods: {
      ready:
        eventPaymentSpecificCompletion &&
        eventInfoSpecificCompletion &&
        eventBillingSpecificCompletion,
      text: configCompletion.stores.missing.some(
        (missingField) => missingField === 'legalEntity',
      )
        ? 'Host company missing from event information'
        : 'Configuration incomplete',
    },
    tax_info: {
      ready: eventTaxSpecificCompletion,
      text: !eventTaxSpecificCompletion ? 'Tax information incomplete' : '',
    },
  };
  const settings: Setting[] = [
    {
      active: true,
      id: 'event_info',
      title: 'Event information',
    },
    {
      active: eventExists,
      id: 'billing_invoicing',
      subTitle:
        'Provide details of the company hosting the event that will appear on the invoice.',
      title: 'Billing information',
    },
    {
      active: eventExists && configCompletion.stores.ready,
      id: 'tax_info',
      title: 'Tax information',
    },
    {
      active: eventExists && configCompletion.stores.ready,
      id: 'payment_methods',
      title: 'Payment methods',
    },
  ];
  const [currentTab, setCurrentTab] = useState<Setting>(settings[0]);
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
  const onTabClick = (item: Setting) => {
    if (item.active) {
      return currentTab.id === item.id ? null : setCurrentTab(item);
    }

    return null;
  };

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
            onRowClick={onTabClick}
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
                eventSlug={data?.event?.slug as string}
                legalEntities={legalEntities as any}
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
