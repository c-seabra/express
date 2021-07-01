import Icon from '@websummit/components/src/atoms/Icon';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import SelectField from '@websummit/components/src/molecules/SelectField';
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

import {
  externalPaymentMethods,
  PaymentGateway,
  paymentGatewayIds,
} from '../../lib/constants/paymentGateways';

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

const paymentGatewayOptions = [
  {
    label: '',
    value: undefined,
  },
  {
    label: 'Stripe',
    value: paymentGatewayIds.stripe,
  },
  {
    label: 'PayPal',
    value: paymentGatewayIds.paypal,
  },
  { label: 'External', value: paymentGatewayIds.external },
  { label: 'Complementary', value: paymentGatewayIds.complementary },
];

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

const getFieldsForPaymentGateway = (gateway?: string) => {
  switch (gateway) {
    case paymentGatewayIds.complementary:
    case paymentGatewayIds.external:
      return <ExternalConfiguration />;
    case paymentGatewayIds.paypal:
      return <PaypalConfiguration />;
    case paymentGatewayIds.stripe:
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
  type?: keyof typeof externalPaymentMethods;
};

const validationSchema = Yup.object().shape({
  gateway: Yup.string().required('Payment gateway is required'),
  name: Yup.string().required('Name is required'),
});

const trimConfiguration = (
  gateway: string,
  configuration: StripeConfigType | PaypalConfigType | ExternalConfigType,
) => {
  switch (gateway) {
    case paymentGatewayIds.stripe: {
      const { publishable_key, secret_key } = configuration as StripeConfigType;
      return {
        publishable_key: publishable_key?.trim() || '',
        secret_key: secret_key?.trim() || '',
      };
    }
    case paymentGatewayIds.paypal: {
      const { client_id, client_secret, env } =
        configuration as PaypalConfigType;
      return {
        client_id: client_id?.trim() || '',
        client_secret: client_secret?.trim() || '',
        env: env?.trim() || '',
      };
    }
    case paymentGatewayIds.complementary:
    case paymentGatewayIds.external: {
      const { refundMethod, acceptUnpaidRefunds } =
        configuration as ExternalConfigType;
      return {
        acceptUnpaidRefunds: acceptUnpaidRefunds ? 'true' : 'false',
        refundMethod: refundMethod ? 'true' : 'false',
        type:
          gateway === paymentGatewayIds.complementary
            ? externalPaymentMethods.complementary
            : externalPaymentMethods.external,
      };
    }
    default:
      return configuration;
  }
};

const getInitialConfigValues = (
  paymentMethod?: Partial<CommercePaymentMethod>,
) => {
  if (paymentMethod?.configuration) {
    switch (paymentMethod.gateway) {
      case paymentGatewayIds.stripe: {
        const { publishable_key, secret_key } =
          paymentMethod.configuration as StripeConfigType;
        return {
          publishable_key,
          secret_key,
        };
      }
      case paymentGatewayIds.paypal: {
        const { client_id, client_secret, env } =
          paymentMethod.configuration as PaypalConfigType;
        return {
          client_id,
          client_secret,
          env,
        };
      }
      case paymentGatewayIds.complementary:
      case paymentGatewayIds.external: {
        const { refundMethod, acceptUnpaidRefunds, type } =
          paymentMethod.configuration as ExternalConfigType;
        return {
          acceptUnpaidRefunds,
          refundMethod,
          type,
        };
      }
      default:
        return {};
    }
  }

  return {};
};

type PaymentMethodModalProps = ModalProps & {
  createPaymentMethod: ReturnType<
    typeof useCommerceCreatePaymentMethodMutation
  >[0];
  paymentMethod?: Partial<CommercePaymentMethod>;
  updatePaymentMethod: ReturnType<
    typeof useCommerceUpdatePaymentMethodMutation
  >[0];
};

const PaymentMethodModal = ({
  isOpen,
  onRequestClose,
  paymentMethod,
  updatePaymentMethod,
  createPaymentMethod,
}: PaymentMethodModalProps) => {
  const configuration = getInitialConfigValues(paymentMethod);
  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        enableReinitialize
        initialValues={{
          configuration,
          gateway:
            configuration?.type === externalPaymentMethods.complementary
              ? paymentGatewayIds.complementary
              : (paymentMethod?.gateway as PaymentGateway),
          name: paymentMethod?.name || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const gateway =
            values.gateway === externalPaymentMethods.complementary
              ? paymentGatewayIds.external
              : values.gateway;

          if (paymentMethod?.id) {
            await updatePaymentMethod({
              variables: {
                id: paymentMethod.id,
                paymentMethod: {
                  ...values,
                  configuration: trimConfiguration(
                    values.gateway,
                    values.configuration,
                  ),
                  gateway,
                },
              },
            });
          } else {
            await createPaymentMethod({
              variables: {
                paymentMethod: {
                  ...values,
                  configuration: trimConfiguration(
                    values.gateway,
                    values.configuration,
                  ),
                  gateway,
                },
              },
            });
          }

          onRequestClose();
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
                  {paymentMethod ? 'Edit' : 'Add'}&nbsp;payment method
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
              submitText={`${paymentMethod ? 'Edit' : 'Add'} payment method`}
              onCancelClick={onRequestClose}
            />
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PaymentMethodModal;
