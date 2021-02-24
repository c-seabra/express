import { CommerceOrder } from '@websummit/graphql/src/@types/operations';
import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import Icon from '../../lib/components/atoms/Icon';
import { WarningMessage } from '../../lib/components/atoms/Messages';
import CheckboxField from '../../lib/components/molecules/CheckboxField';
import Modal, { ModalProps } from '../../lib/components/molecules/Modal';
import MoneyInputField from '../../lib/components/molecules/MoneyInputField';
import RadioField from '../../lib/components/molecules/RadioField';
import {
  AlertText,
  HeaderText,
  IconWrapper,
} from '../../lib/components/molecules/ReasonAlertModal';
import SelectField from '../../lib/components/molecules/SelectField';
import TextAreaField from '../../lib/components/molecules/TextAreaField';
import { VALIDATION_MESSAGES } from '../../lib/constants/messages';
import useRefund from '../../lib/hooks/useRefund';
import { useErrorSnackbar } from '../../lib/hooks/useSnackbarMessage';
import { Spacing } from '../templates/Spacing';

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

const refundMethods = {
  CREDIT: 'credit',
  DEFAULT: 'default',
  REFUNDED: 'refunded',
};

const refundMethodOptions = [
  {
    label: "Full refund via customer's payment method",
    value: refundMethods.DEFAULT,
  },
  {
    // TODO - remove disabled when option is allowed
    disabled: true,
    label: 'Record transaction as refunded',
    value: refundMethods.REFUNDED,
  },
  {
    // TODO - remove disabled when option is allowed
    disabled: true,
    label: 'Credit value to future event',
    value: refundMethods.CREDIT,
  },
];

const refundShape = {
  amount: Yup.number()
    .typeError('Amount must be a number')
    .required(VALIDATION_MESSAGES.REQUIRED),
  method: Yup.string().required(VALIDATION_MESSAGES.REQUIRED),
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
    amount: order.billed,
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
    amount: number;
    refundTax: boolean;
    taxRefundAmount: number;
  }>();

  useEffect(() => {
    setFieldValue(
      'taxRefundAmount',
      (amount - amount / ((100 + taxRate) / 100) || 0).toFixed(2),
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

type OrderRefundModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  commerceOrder: CommerceOrder;
  orderRef: string;
};

const OrderRefundModal = ({
  commerceOrder,
  isOpen,
  onRequestClose,
  orderRef,
}: OrderRefundModalProps) => {
  const [isConfirmStep, setConfirmStep] = useState(false);
  const { fullRefund, partialRefund } = useRefund({ order: commerceOrder });
  const error = useErrorSnackbar();

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
          method: refundMethods.DEFAULT,
          reason: '',
          refundTax: false,
          taxRefundAmount: commerceOrder.taxTotal,
          type: refundTypes.full,
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={orderRefundSchema}
        onSubmit={async (values) => {
          if (isConfirmStep) {
            if (values.type === 'full') {
              await fullRefund(values.reason);
            } else if ((commerceOrder.total || 0) < (values.amount || 0)) {
              error('Refund amount cannot be bigger than the total');
            } else {
              await partialRefund(values.reason, values.amount);
            }

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
                {values.type === refundTypes.partial && (
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
                  name="method"
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
