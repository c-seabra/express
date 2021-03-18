import { Icon } from '@material-ui/core';
import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React from 'react';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
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
      <Spacing bottom="2" top="1rem">
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
  refetch: any;
  taxes: any;
};
const SelectTax = ({ loading, eventId, taxes, refetch }: SelectTaxProps) => {
  const {
    openModal: openTaxRateModal,
    isOpen: isTaxRateModalOpen,
    closeModal: closeTaxRateModal,
  } = useModalState();
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
        refetch={refetch}
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

            <Button disabled onClick={save}>
              Save & continue
            </Button>
          </FlexRowRight>
        </>
      ) : (
        <>{!loading && <NoTaxPlaceholder action={openTaxRateModal} />}</>
      )}
    </>
  );
};

export default SelectTax;
