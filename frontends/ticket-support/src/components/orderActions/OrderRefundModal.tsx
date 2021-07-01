import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import MoneyInputField from '@websummit/components/src/molecules/MoneyInputField';
import RadioField from '@websummit/components/src/molecules/RadioField';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useErrorSnackbar } from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommerceOrder,
  CommercePaymentMethod,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Icon from '../../lib/components/atoms/Icon';
import { WarningMessage } from '../../lib/components/atoms/Messages';
import Modal, { ModalProps } from '../../lib/components/molecules/Modal';
import {
  AlertText,
  HeaderText,
  IconWrapper,
} from '../../lib/components/molecules/ReasonAlertModal';
import { VALIDATION_MESSAGES } from '../../lib/constants/messages';
import useRefund from '../../lib/hooks/useRefund';
import { fromCents, toCents, Total } from '../../lib/utils/price';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0 1rem;
  width: 500px;

  & > * {
    margin-bottom: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    width: 48%;
  }
`;

const RadioGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledWarningMessage = styled(WarningMessage)`
  margin-bottom: 2.5rem;

  & > span {
    font-weight: 600;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const StyledAlertText = styled(AlertText)`
  display: flex;
  justify-content: center;
`;

const refundTypes = {
  full: 'full',
  partial: 'partial',
};

const refundShape = {
  amount: Yup.number()
    .typeError('Amount must be a number')
    .required(VALIDATION_MESSAGES.REQUIRED),
  paymentMethod: Yup.string(),
  reason: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  type: Yup.mixed().oneOf([refundTypes.full, refundTypes.partial]),
};

const fullRefundSchema = Yup.object().shape(refundShape);

const partialRefundSchema = Yup.object().shape({
  ...refundShape,
  refundTax: Yup.boolean(),
  taxRefundAmount: Yup.string().when('refundTax', {
    is: true,
    then: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
  }),
});

const orderRefundSchema = () =>
  Yup.lazy((value: { type: string }) => {
    if (value.type === refundTypes.full) {
      return fullRefundSchema;
    }

    return partialRefundSchema;
  });

const getFullRefundInitialValues = (order: CommerceOrder) => {
  return {
    amount: fromCents(order.billed),
  };
};

// TODO - for now, it's just the first tax type found on the order
// later down the line it's going to be a select field with different taxes
const getProductTax = (order: CommerceOrder) => {
  return order?.items[0]?.tax;
};

type DependentTaxRateAmountInputField = {
  currencySymbol: string;
  disabled: boolean;
  required: boolean;
  taxName?: string;
  taxRate?: number;
  taxTotal?: number | null;
};

const DependentTaxRateAmountInputField = ({
  currencySymbol,
  disabled,
  required,
  taxName = 'tax',
  taxRate = 0,
  taxTotal,
}: DependentTaxRateAmountInputField) => {
  const {
    values: { amount, taxRefundAmount, refundTax },
    setFieldValue,
  } = useFormikContext<{
    amount: Total;
    refundTax: boolean;
    taxRefundAmount: number;
  }>();

  useEffect(() => {
    setFieldValue(
      'taxRefundAmount',
      fromCents(toCents(amount) - toCents(amount) / ((100 + taxRate) / 100)),
    );
  }, [amount, setFieldValue, taxRate, taxTotal]);

  return (
    <MoneyInputField
      key={refundTax ? '' : taxRefundAmount}
      currencySymbol={currencySymbol}
      disabled={disabled}
      label={`Amount of ${taxName} to refund`}
      name="taxRefundAmount"
      required={required}
    />
  );
};

const autoRefundOption = {
  label: "Refund via customer's payment method",
  value: '',
};

const getRefundMethodOptions = (
  methods?: (Partial<CommercePaymentMethod> | null)[] | null,
) => {
  if (!methods) {
    return [];
  }

  return [
    autoRefundOption,
    ...methods
      .filter(Boolean)
      .filter(
        (method) =>
          (method?.configuration as { refundMethod?: string })?.refundMethod ===
          'true',
      )
      .map((method) => ({ label: method?.name, value: method?.id || '' })),
  ];
};

type OrderRefundModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  commerceOrder: CommerceOrder;
  orderRef: string;
  paymentMethods?: (Partial<CommercePaymentMethod> | null)[] | null;
  refetchCommerceOrder: () => void;
};

const OrderRefundModal = ({
  commerceOrder,
  isOpen,
  onRequestClose,
  orderRef,
  paymentMethods,
  refetchCommerceOrder,
}: OrderRefundModalProps) => {
  const [isConfirmStep, setConfirmStep] = useState(false);
  const { fullRefund, partialRefund } = useRefund({ order: commerceOrder });
  const error = useErrorSnackbar();

  const refundMethodOptions = getRefundMethodOptions(paymentMethods);

  const orderInitialValues = getFullRefundInitialValues(commerceOrder);

  const handleClose = () => {
    setConfirmStep(false);
    onRequestClose();
  };

  const tax = getProductTax(commerceOrder);
  const { country, name, rateAmount } = tax || {};

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose}>
      <Formik
        initialValues={{
          ...orderInitialValues,
          paymentMethod: undefined,
          reason: '',
          refundTax: false,
          taxRefundAmount: fromCents(commerceOrder.taxTotal),
          type: refundTypes.full,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={orderRefundSchema}
        onSubmit={async (values) => {
          const {
            type,
            reason,
            paymentMethod,
            amount,
            taxRefundAmount,
            refundTax,
          } = values;

          if (isConfirmStep) {
            if (type === 'full') {
              await fullRefund({
                paymentMethod,
                reason,
              });
            } else if ((commerceOrder.total || 0) < (amount || 0)) {
              error('Refund amount cannot be bigger than the total');
            } else {
              await partialRefund({
                amount: toCents(amount),
                paymentMethod,
                reason,
                taxDetails:
                  refundTax && taxRefundAmount
                    ? {
                        taxId: tax?.id,
                        total: toCents(taxRefundAmount),
                      }
                    : undefined,
              });
            }

            setTimeout(refetchCommerceOrder, 1000);
            handleClose();
          } else {
            setConfirmStep(true);
          }
        }}
      >
        {({ values }) => (
          <StyledForm>
            <Header>
              <Spacing bottom="10px">
                <IconWrapper>
                  <Icon>error</Icon>
                </IconWrapper>
              </Spacing>

              <HeaderText>Refund of order</HeaderText>
            </Header>

            <Spacing bottom="40px">
              <StyledAlertText>{orderRef}</StyledAlertText>
            </Spacing>
            {!isConfirmStep ? (
              <>
                <RadioGroup>
                  <RadioField
                    label="Full refund"
                    name="type"
                    value={refundTypes.full}
                  />
                  <RadioField
                    label="Partial refund"
                    name="type"
                    value={refundTypes.partial}
                  />
                </RadioGroup>
                <MoneyInputField
                  currencySymbol={commerceOrder.currencySymbol}
                  disabled={values.type === refundTypes.full}
                  label="Amount to refund"
                  name="amount"
                />
                {values.type === refundTypes.partial && (commerceOrder.taxTotal || 0) > 0 && (
                  <Row>
                    <CheckboxField
                      label={
                        name && country && rateAmount
                          ? `Refund ${name} (${country}) at ${rateAmount}%?`
                          : ''
                      }
                      name="refundTax"
                    />
                    <DependentTaxRateAmountInputField
                      currencySymbol={commerceOrder.currencySymbol || ''}
                      disabled={!values.refundTax}
                      required={values.refundTax}
                      taxName={name}
                      taxRate={rateAmount}
                      taxTotal={commerceOrder.taxTotal}
                    />
                  </Row>
                )}
                <SelectField
                  required
                  label="How would you like this order to be refunded"
                  name="paymentMethod"
                  options={refundMethodOptions}
                />
                <TextAreaField
                  required
                  label="Please specify a reason for your actions"
                  name="reason"
                />
              </>
            ) : (
              <StyledWarningMessage>
                Are you sure you want to refund order <span>{orderRef}</span>?
              </StyledWarningMessage>
            )}
            <Modal.DefaultFooter red onCancelClick={handleClose} />
          </StyledForm>
        )}
      </Formik>
    </Modal>
  );
};

export default OrderRefundModal;
