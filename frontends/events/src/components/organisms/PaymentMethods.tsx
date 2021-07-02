import { Button } from '@websummit/components/src/atoms/Button';
import Icon from '@websummit/components/src/atoms/Icon';
import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import SelectableTable from '@websummit/components/src/molecules/SelectableTable';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import { ColumnDescriptors } from '@websummit/components/src/molecules/Table';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommercePaymentMethod,
  useCommerceCreatePaymentMethodMutation,
  useCommerceUpdatePaymentMethodMutation,
} from '@websummit/graphql/src/@types/operations';
import CommerceListPaymentMethods from '@websummit/graphql/src/operations/queries/CommerceListPaymentMethods';
import { useAppContext } from '@websummit/graphql/src/utils/AppContext';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { paymentGatewayMap } from '../../lib/constants/paymentGateways';
import PaymentMethodModal from '../modals/PaymentMethodModal';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
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

type PartialPaymentMethod = Pick<
  CommercePaymentMethod,
  'id' | 'name' | 'configuration' | 'active' | 'gateway' | '__typename'
>;

const tableShape: ColumnDescriptors<PartialPaymentMethod> = [
  {
    header: 'Name',
    renderCell: (item) => item.name,
    width: '35%',
  },
  {
    header: 'Payment gateway',
    renderCell: (item) => paymentGatewayMap.get(item.gateway),
    width: '35%',
  },
];

type PaymentMethodsProps = {
  paymentMethods?: PartialPaymentMethod[] | null;
};

const PaymentMethods = ({ paymentMethods }: PaymentMethodsProps) => {
  const { slug } = useParams<{ slug: string }>();

  const { token } = useAppContext();
  const { success, error } = useSnackbars();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    Partial<CommercePaymentMethod> | undefined
  >();

  const { openModal, isOpen, closeModal } = useModalState();
  const [updatePaymentMethod] = useCommerceUpdatePaymentMethodMutation({
    context: { slug, token },
    onCompleted: () => success('Payment method updated'),
    onError: (e) => error(e.message),
    refetchQueries: [
      { context: { slug, token }, query: CommerceListPaymentMethods },
    ],
  });
  const [createPaymentMethod] = useCommerceCreatePaymentMethodMutation({
    context: { slug, token },
    onCompleted: () => success('Payment method added'),
    onError: (e) => error(e.message),
    refetchQueries: [
      { context: { slug, token }, query: CommerceListPaymentMethods },
    ],
  });

  const areNoPaymentMethodsPresent =
    paymentMethods?.length && paymentMethods?.length > 0;

  return (
    <>
      {areNoPaymentMethodsPresent ? (
        <>
          <Spacing top="20px">
            <Spacing bottom="32px">
              <StyledButton
                onClick={() => {
                  setSelectedPaymentMethod(undefined);
                  openModal();
                }}
              >
                <IconWrapper>
                  <Icon>add</Icon>
                </IconWrapper>
                <span>Add a new payment method</span>
              </StyledButton>
            </Spacing>

            <ContainerCard noPadding>
              <SelectableTable<PartialPaymentMethod>
                disableToggleAll
                lastColumn
                header="Active"
                items={paymentMethods?.map((method) => ({
                  ...method,
                  selected: method.active,
                }))}
                tableShape={tableShape}
                onRowClick={(item) => {
                  setSelectedPaymentMethod(item);
                  openModal();
                }}
                onSelect={async (selectedItem, selected) => {
                  if (selectedItem?.id) {
                    await updatePaymentMethod({
                      variables: {
                        id: selectedItem.id,
                        paymentMethod: { active: selected },
                      },
                    });
                  }
                }}
              />
            </ContainerCard>
          </Spacing>
        </>
      ) : (
        <NoPaymentMethodsPlaceholder action={openModal} />
      )}

      <PaymentMethodModal
        createPaymentMethod={createPaymentMethod}
        isOpen={isOpen}
        paymentMethod={selectedPaymentMethod}
        updatePaymentMethod={updatePaymentMethod}
        onRequestClose={closeModal}
      />
    </>
  );
};

export default PaymentMethods;
