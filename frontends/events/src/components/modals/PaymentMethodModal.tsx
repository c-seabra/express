import Icon from '@websummit/components/src/atoms/Icon';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  CommercePaymentMethod,
  useCommerceCreatePaymentMethodMutation,
  useCommerceUpdatePaymentMethodMutation,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useAppContext } from '../app/AppContext';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 480px;
`;

export const Text = styled.div`
  font-size: 14px;
  letter-spacing: 0;
  line-height: 28px;
  max-width: 580px;
  text-align: left;
`;

export const HeaderText = styled.div`
  color: #0067e9;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

export const FieldWrapper = styled.div`
  min-width: 580px;
  text-align: left;
  padding: 0;
`;

export const IconWrapper = styled.div`
  > .material-icons {
    font-size: 40px;
    color: #0067e9;
  }
`;

type PaymentGateway = 'stripe' | 'paypal' | 'external';

const paymentGatewayOptions = [
  {
    label: '',
    value: undefined,
  },
  {
    label: 'Stripe',
    value: 'stripe',
  },
  {
    label: 'PayPal',
    value: 'paypal',
  },
  { label: 'External', value: 'external' },
];

const paymentGatewayIds = {
  external: 'f163017a-cc4f-4619-9e72-26c5ac9ea5e7',
  paypal: '7c328ad3-53c7-4400-8bba-add5e8381b16',
  stripe: '6e8588c5-f77e-4b1e-9b70-fc412aa97832',
};

const FieldsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: initial;
  padding: 0 0.8rem;
`;

const StripeConfiguration = () => (
  <>
    <TextInputField
      required
      label="Publishable key"
      name="configuration.publishable_key"
    />
    <TextInputField
      required
      label="Secret key"
      name="configuration.secret_key"
    />
  </>
);

const PaypalConfiguration = () => (
  <>
    <TextInputField required label="Client ID" name="configuration.client_id" />
    <TextInputField
      required
      label="Client secret"
      name="configuration.client_secret"
    />
    <TextInputField required label="Environment" name="configuration.env" />
  </>
);

const ExternalConfiguration = () => (
  <>
    <CheckboxField label="Refund method" name="configuration.refundMethod" />
    <CheckboxField
      label="Accept unpaid refunds"
      name="configuration.acceptUnpaidRefunds"
    />
  </>
);

const getFieldsForPaymentGateway = (gateway?: PaymentGateway) => {
  switch (gateway) {
    case 'external':
      return <ExternalConfiguration />;
    case 'paypal':
      return <PaypalConfiguration />;
    case 'stripe':
      return <StripeConfiguration />;
    default:
      return null;
  }
};


type StripeConfigType = { publishable_key?: string; secret_key?: string };
type PaypalConfigType = {
  client_id?: string;
  client_secret?: string;
  env?: string;
};
type ExternalConfigType = {
  acceptUnpaidRefunds?: boolean;
  refundMethod?: boolean;
};

const validationSchema = Yup.object().shape({
  gateway: Yup.string().required('Payment gateway is required'),
  name: Yup.string().required('Name is required'),
});

const getInitialConfigValues = (paymentMethod?: CommercePaymentMethod) => {
  if (paymentMethod?.configuration) {
    switch (paymentMethod.gateway as PaymentGateway) {
      case 'stripe': {
        const {
          publishable_key,
          secret_key,
        } = paymentMethod.configuration as StripeConfigType;
        return {
          publishable_key,
          secret_key,
        };
      }
      case 'paypal': {
        const {
          client_id,
          client_secret,
          env,
        } = paymentMethod.configuration as PaypalConfigType;
        return {
          client_id,
          client_secret,
          env,
        };
      }
      case 'external': {
        const {
          refundMethod,
          acceptUnpaidRefunds,
        } = paymentMethod.configuration as ExternalConfigType;
        return {
          acceptUnpaidRefunds,
          refundMethod,
        };
      }
      default:
        return {};
    }
  }

  return {};
};

type PaymentMethodModalProps = ModalProps & {
  paymentMethod?: CommercePaymentMethod;
};

const PaymentMethodModal = ({
  isOpen,
  onRequestClose,
  paymentMethod,
}: PaymentMethodModalProps) => {
  const { token } = useAppContext();
  const { success, error } = useSnackbars();

  const [createPaymentMethod] = useCommerceCreatePaymentMethodMutation({
    context: { token },
    onCompleted: () => success('Payment method added'),
    onError: (e) => error(e.message),
  });
  const [updatePaymentMethod] = useCommerceUpdatePaymentMethodMutation({
    context: { token },
    onCompleted: () => success('Payment method updated'),
    onError: (e) => error(e.message),
  });

  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        initialValues={{
          configuration: getInitialConfigValues(paymentMethod),
          gateway: paymentMethod?.gateway as PaymentGateway,
          name: paymentMethod?.name || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          if (paymentMethod?.id) {
            await updatePaymentMethod({
              variables: {
                id: paymentMethod.id,
                paymentMethod: {
                  ...values,
                  gateway: paymentGatewayIds[values.gateway],
                },
              },
            });
          } else {
            await createPaymentMethod({
              variables: {
                paymentMethod: {
                  ...values,
                  gateway: paymentGatewayIds[values.gateway],
                },
              },
            });
          }
        }}
      >
        {({ values }) => (
          <Form>
            <Wrapper>
              <Spacing bottom="10px">
                <IconWrapper>
                  <Icon>info</Icon>
                </IconWrapper>
              </Spacing>

              <Spacing bottom="40px">
                <HeaderText>
                  {paymentMethod ? 'Edit' : 'Add'} payment method
                </HeaderText>
              </Spacing>
              <FieldsContainer>
                <TextInputField required label="Name" name="name" />
                <SelectField
                  required
                  label="Payment gateway"
                  name="gateway"
                  options={paymentGatewayOptions}
                />
                {getFieldsForPaymentGateway(values.gateway)}
              </FieldsContainer>
            </Wrapper>
            <Modal.DefaultFooter
              submitText="Add payment method"
              onCancelClick={onRequestClose}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PaymentMethodModal;
