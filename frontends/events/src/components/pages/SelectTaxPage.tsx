import { ApolloError } from '@apollo/client';
import { Icon } from '@material-ui/core';
import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CurrencyCode,
  TaxRate,
  TaxRatesQuery,
  TaxType,
  useTaxRatesQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
import { useAppContext } from '../app/AppContext';
import TaxRateCreateModal from '../modals/TaxRateCreateModal';
import TaxRateCreateModalWrapper from '../modals/TaxRateCreateModalWrapper';
import SideNavigation from '../organisms/SideNavigation';
import TaxList from '../organisms/TaxList';

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexRowCentered = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 36px;
`;

const FlexRowRight = styled(Spacing)`
  display: flex;
  justify-content: flex-end;
`;

// Good candidate to move to package templates
const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h1`
  color: #0c1439;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 32px;
  margin: 0;
`;

const StyledHr = styled(Spacing)`
  border-top: 1px solid #dcdfe5;
`;

const IconWrapper = styled(Icon)`
  .material-icons {
    font-size: 20px;
    height: 22px;
  }
`;

const NoTaxPlaceholder = () => {
  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <ContainerCard noPadding>
          <FlexRow>
            <FlexCol>
              <HeaderText>No Taxes Found</HeaderText>
              <span>You haven&apos;t created any taxes yet.</span>
            </FlexCol>
            <Button>Create new tax</Button>
          </FlexRow>
        </ContainerCard>
      </Spacing>
    </FlexCol>
  );
};

type EventListQueryResponse = {
  data?: TaxRatesQuery;
  error?: ApolloError;
  loading?: boolean;
};

// const mock: TaxRate[] = [
const mock: any = [
  {
    country: {
      code: 'code',
      id: 'id',
      name: 'Ireland',
    },
    event: {
      baseUrl: null,
      brandName: 'Collision 2021',
      companySizes: [100, 200],
      configuration: {
        algoliaKey: 'st',
      },
      country: null,
      currency: CurrencyCode.Cad,
      description: '"America’s fastest growing tech conference"',
      endDate: '2021-04-22',
      id: 'c1127a35-5a79-4933-9626-924ebf1ebb76',
      industries: [],
      investorSessionsSummary: [],
      legalEntity: null,
      name: 'Collision 2021 Online',
      passportRequired: false,
      slug: 'cc21',
      startDate: '2021-04-20',
      taxNumber: 'change me',
      taxRates: {
        edges: [],
        pageInfo: {
          endCursor: '10',
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '1',
        },
      },
      timeZone: {
        displayName: 'Eastern Time (US & Canada)',
        ianaName: 'America/New_York',
      },
      timezone: 'America/New_York',
      versions: [{ createdAt: 'test' }],
    },
    id: 1,
    name: 'tax name2',
    taxType: TaxType.Accommodation,
    value: 19,
  },

  {
    country: {
      code: 'code',
      id: 'id',
      name: 'Poland',
    },
    event: {
      baseUrl: null,
      brandName: 'Collision 2021',
      companySizes: [100, 200],
      configuration: {
        algoliaKey: 'st',
      },
      country: null,
      currency: CurrencyCode.Cad,
      description: '"America’s fastest growing tech conference"',
      endDate: '2021-04-22',
      id: 'c1127a35-5a79-4933-9626-924ebf1ebb75',
      industries: [],
      investorSessionsSummary: [],
      legalEntity: null,
      name: 'Collision 2021 Online',
      passportRequired: false,
      slug: 'cc21',
      startDate: '2021-04-20',
      taxNumber: 'change me',
      taxRates: {
        edges: [],
        pageInfo: {
          endCursor: '10',
          hasNextPage: true,
          hasPreviousPage: false,
          startCursor: '1',
        },
      },
      timeZone: {
        displayName: 'Eastern Time (US & Canada)',
        ianaName: 'America/New_York',
      },
      timezone: 'America/New_York',
      versions: [{ createdAt: 'test' }],
    },
    id: 2,
    name: 'tax name',
    taxType: TaxType.Standard,
    value: 23,
  },
];

const EventPage = () => {
  const history = useHistory();
  const { conferenceSlug, token } = useAppContext();
  const context = {
    conferenceSlug,
    token,
  };

  const { loading, error, data }: EventListQueryResponse = useTaxRatesQuery({
    context,
  });

  // const hasTaxes = data?.taxRates && data?.taxRates?.edges.length;
  // const taxes = data?.taxRates && data?.taxRates.edges.map((node) => node.node);
  const hasTaxes = true;
  const taxes = mock;
  const {
    openModal: openTaxRateModal,
    isOpen: isTaxRateModalOpen,
    closeModal: closeTaxRateModal,
  } = useModalState();

  const save = () => {
    // TODO add save action
  };

  const cancel = () => {
    // TODO add cancel action
  };

  return (
    <>
      {loading && <Loader />}

      {hasTaxes ? (
        <>
          <FlexCol>
            <FlexRow>
              <Spacing bottom="30px">
                <HeaderText>Event setup</HeaderText>
              </Spacing>
            </FlexRow>
            <FlexRow>
              <Spacing right="3.75rem">
                <SideNavigation />
              </Spacing>

              <ContainerCard noPadding>
                <Spacing left="37px" right="31px" top="40px">
                  <Spacing bottom="32px">
                    <HeaderText>Tax information</HeaderText>
                  </Spacing>

                  <Spacing bottom="32px">
                    <Button onClick={openTaxRateModal}>
                      <IconWrapper>
                        <Icon>add</Icon>
                      </IconWrapper>
                      <span>Add a new tax</span>
                    </Button>
                    <TaxRateCreateModalWrapper
                      closeModal={closeTaxRateModal}
                      isOpen={isTaxRateModalOpen}
                    />
                  </Spacing>

                  <Spacing bottom="50px">
                    <TaxList error={error} taxes={taxes} />
                  </Spacing>
                </Spacing>

                <StyledHr>
                  <FlexRowRight
                    bottom="32px"
                    left="37px"
                    right="31px"
                    top="32px"
                  >
                    <Spacing right="16px">
                      <SecondaryButton onClick={cancel}>
                        Set up later
                      </SecondaryButton>
                    </Spacing>

                    <Button onClick={save}>Save & continue</Button>
                  </FlexRowRight>
                </StyledHr>
              </ContainerCard>
            </FlexRow>
          </FlexCol>
        </>
      ) : (
        <>{!loading && <NoTaxPlaceholder />}</>
      )}
    </>
  );
};

export default EventPage;
