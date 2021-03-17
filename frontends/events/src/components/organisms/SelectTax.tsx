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
  TaxRatesQuery,
  TaxType,
  useCountriesQuery,
  useTaxRatesQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
import { useAppContext } from '../app/AppContext';
import TaxRateCreateModalWrapper from '../modals/TaxRateCreateModalWrapper';
import TaxList from './TaxList';

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
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

const IconWrapper = styled(Icon)`
  .material-icons {
    font-size: 20px;
    height: 22px;
  }
`;

const StyledButton = styled(Button)`
  padding-left: 16px;
`;

type NoTaxPlaceholderProps = {
  action: () => void;
};

const NoTaxPlaceholder = ({ action }: NoTaxPlaceholderProps) => {
  return (
    <FlexCol>
      <Spacing bottom="6rem" top="4.125rem">
        <FlexRow>
          <FlexCol>
            <HeaderText>No Taxes Found</HeaderText>
            <span>You haven&apos;t created any taxes yet.</span>
          </FlexCol>
          <Button onClick={action}>Create new tax</Button>
        </FlexRow>
      </Spacing>
    </FlexCol>
  );
};

type SelectTaxProps = {
  eventId: string;
  loading: boolean;
  taxes: any;
};
const SelectTax = ({ loading, eventId, taxes }: SelectTaxProps) => {
  const {
    openModal: openTaxRateModal,
    isOpen: isTaxRateModalOpen,
    closeModal: closeTaxRateModal,
  } = useModalState();
  // const hasTaxes = data?.taxRates && data?.taxRates?.edges.length;
  const hasTaxes = taxes.length;

  const save = () => {
    // TODO add save action
  };

  const cancel = () => {
    // TODO add cancel action
  };

  return (
    <>
      {loading && <Loader />}

      <TaxRateCreateModalWrapper
        closeModal={closeTaxRateModal}
        eventId={eventId}
        isOpen={isTaxRateModalOpen}
      />

      {hasTaxes ? (
        <>
          <Spacing top="20px">
            <Spacing bottom="32px">
              <StyledButton onClick={openTaxRateModal}>
                <IconWrapper>
                  <Icon>add</Icon>
                </IconWrapper>
                <span>Add a new tax</span>
              </StyledButton>
            </Spacing>

            <Spacing bottom="50px">
              <TaxList taxes={taxes} />
            </Spacing>
          </Spacing>

          <FlexRowRight top="32px">
            <Spacing right="16px">
              <SecondaryButton onClick={cancel}>Set up later</SecondaryButton>
            </Spacing>

            <Button onClick={save}>Save & continue</Button>
          </FlexRowRight>
        </>
      ) : (
        <>{!loading && <NoTaxPlaceholder action={openTaxRateModal} />}</>
      )}
    </>
  );
};

export default SelectTax;
