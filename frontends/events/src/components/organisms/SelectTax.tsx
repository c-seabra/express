import { Icon } from '@material-ui/core';
import { Button } from '@websummit/components/src/atoms/Button';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import React, { useState } from 'react';
import styled from 'styled-components';

import Loader from '../../lib/Loading';
import TaxRateCreateModalWrapper, {
  ModalInputMode,
} from '../modals/TaxRateCreateModalWrapper';
import TaxList from './TaxList';

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
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
  const [modalMode, setModalMode] = useState<ModalInputMode>('ADD');
  const [prefilledTax, setPrefilledTax] = useState();
  const hasTaxes = taxes && taxes.length;
  const onTaxButtonClick = () => {
    setModalMode('ADD');
    openTaxRateModal();
  };

  const onTaxClick = (event: any) => {
    setModalMode('EDIT');
    setPrefilledTax(event);
    openTaxRateModal();
  };

  return (
    <>
      {loading && <Loader />}

      <TaxRateCreateModalWrapper
        closeModal={closeTaxRateModal}
        eventId={eventId}
        isOpen={isTaxRateModalOpen}
        mode={modalMode}
        prefilledTax={prefilledTax}
        refetch={refetch}
      />

      {hasTaxes ? (
        <>
          <Spacing top="20px">
            <Spacing bottom="32px">
              <StyledButton onClick={onTaxButtonClick}>
                <IconWrapper>
                  <Icon>add</Icon>
                </IconWrapper>
                <span>Add a new tax</span>
              </StyledButton>
            </Spacing>

            <Spacing bottom="50px">
              <TaxList taxes={taxes} onTaxClick={onTaxClick} />
            </Spacing>
          </Spacing>
        </>
      ) : (
        <>{!loading && <NoTaxPlaceholder action={openTaxRateModal} />}</>
      )}
    </>
  );
};

export default SelectTax;
