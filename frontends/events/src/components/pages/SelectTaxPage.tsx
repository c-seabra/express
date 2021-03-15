import { ApolloError } from '@apollo/client';
import { Button } from '@websummit/components/src/atoms/Button';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  EventListQueryQuery,
  useEventListQueryQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
import { useAppContext } from '../app/AppContext';
import TaxList from '../organisms/TaxList';

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 26px 36px;
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
  data?: EventListQueryQuery;
  error?: ApolloError;
  loading?: boolean;
};

const EventPage = () => {
  const history = useHistory();
  const { conferenceSlug, token } = useAppContext();
  const context = {
    conferenceSlug,
    token,
  };

  const {
    loading,
    error,
    data,
  }: EventListQueryResponse = useEventListQueryQuery({ context });

  const hasTaxes = data?.events && data?.events?.edges.length;
  const taxes = data?.events && data?.events.edges.map((node) => node.node);

  return (
    <>
      {loading && <Loader />}

      {hasTaxes ? (
        <>
          <ContainerCard>
            <HeaderText>Tax information</HeaderText>
            <Button>Add a new tax</Button>
            <TaxList error={error} taxes={taxes} />
          </ContainerCard>
        </>
      ) : (
        <>{!loading && <NoTaxPlaceholder />}</>
      )}
    </>
  );
};

export default EventPage;
