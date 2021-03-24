import { Button } from '@websummit/components/src/atoms/Button';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { CommercePaymentMethod } from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';

import PaymentMethodCreateModal from '../modals/PaymentMethodModal';

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

type NoPaymentMethodsPlaceholderProps = {
  action: () => void;
};

const NoPaymentMethodsPlaceholder = ({
  action,
}: NoPaymentMethodsPlaceholderProps) => {
  return (
    <FlexCol>
      <Spacing bottom="2" top="1rem">
        <FlexRow>
          <FlexCol>
            <HeaderText>No Payment Methods added</HeaderText>
            <span>You haven&apos;t added any payment methods yet.</span>
          </FlexCol>
          <Button onClick={action}>Add a new payment method</Button>
        </FlexRow>
      </Spacing>
    </FlexCol>
  );
};

type PaymentMethodsProps = {
  paymentMethods: CommercePaymentMethod[];
};

const PaymentMethods = ({ paymentMethods }: PaymentMethodsProps) => {
  const { openModal, isOpen, closeModal } = useModalState();
  return (
    <>
      {paymentMethods && <NoPaymentMethodsPlaceholder action={openModal} />}
      <PaymentMethodCreateModal isOpen={isOpen} onRequestClose={closeModal} />
    </>
  );
};

export default PaymentMethods;
