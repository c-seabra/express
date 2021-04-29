import Checkbox from '@websummit/components/src/atoms/Checkbox';
import Icon from '@websummit/components/src/atoms/Icon';
import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInput from '@websummit/components/src/molecules/TextInput';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  formatDisplayPriceWithCurrency,
  TotalInCents,
} from '@websummit/glue/src/lib/utils/price';
import { RecursivePartial } from '@websummit/glue/src/lib/utils/recursivePartial';
import {
  CommerceDeal,
  CommerceOrderStatus,
  CommercePaymentMethod,
  CommerceStore,
  CommerceTax,
  CommerceTaxRateType,
  CommerceTaxType,
  useCommerceCreateOrderMutation,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { externalPaymentMethods } from '../../lib/constants/paymentGateways';
import { useRequestContext } from '../app/AppContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0;
  font-size: 0.85rem;
  font-weight: 400;
  min-width: 480px;
`;

const HeaderText = styled.div`
  color: #0067e9;
  font-size: 32px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 40px;
`;

const IconWrapper = styled.div`
  > .material-icons {
    font-size: 40px;
    color: #0067e9;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const RadioGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;
const StyledTextInput = styled(TextInput)`
  width: 49%;
`;

const TicketType = styled(TextInput)`
  width: 49%;
`;

const TicketPrice = styled(TextInput)`
  width: 30%;
`;

const StyledTextInputField = styled(TextInputField)`
  width: 49%;
`;

const QuantityField = styled(TextInputField)`
  width: 80px;
`;

const getTaxDetails = (taxType?: RecursivePartial<CommerceTaxType>) => {
  const [tax] = taxType?.taxes || [];

  if (tax) {
    const taxAmountString = `${tax?.rateAmount || 0}${
      tax.rateType === CommerceTaxRateType.Percentage ? '%' : ''
    }`;

    return {
      tax,
      taxAmountString,
      taxName: tax.name,
    };
  }

  return { tax, taxAmountString: '', taxName: '' };
};

const getTotalWithTax = ({
  currency = '',
  netPrice,
  quantity = 0,
  tax,
}: {
  currency?: string;
  netPrice?: TotalInCents;
  quantity?: number;
  tax?: RecursivePartial<CommerceTax>;
}) => {
  if (netPrice) {
    const total = netPrice * quantity;
    if (tax?.rateType === CommerceTaxRateType.Percentage) {
      const totalWithTax = (total +
        total * ((tax?.rateAmount || 0) / 100)) as TotalInCents;
      return formatDisplayPriceWithCurrency(totalWithTax, currency);
    }

    return formatDisplayPriceWithCurrency();
  }

  return '';
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please input a valid email address')
    .required('Email is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
});

type InviteToPurchaseModalProps = Pick<
  ModalProps,
  'isOpen' | 'onRequestClose'
> & {
  activePaymentMethods?: Pick<
    CommercePaymentMethod,
    'id' | 'gateway' | 'configuration'
  >[];
  deal?: RecursivePartial<CommerceDeal> | null;
  store?: Pick<CommerceStore, 'currencySymbol'> | null;
};

const getDealPrice = (deal?: RecursivePartial<CommerceDeal> | null) => {
  if (deal) {
    const { dealItems } = deal;
    const totalPrice = dealItems?.reduce(
      (previous, current) => previous + (current?.product?.price || 0),
      0,
    );

    return totalPrice as TotalInCents;
  }

  return 0 as TotalInCents;
};

const InviteToPurhcasePackageModal = ({
  activePaymentMethods = [],
  deal,
  store,
  isOpen,
  onRequestClose,
}: InviteToPurchaseModalProps) => {
  const context = useRequestContext();
  const { success, error } = useSnackbars();

  const externalPaymentMethodId = activePaymentMethods?.find(
    (method) =>
      (method?.configuration as { type?: string })?.type ===
      externalPaymentMethods.external,
  )?.id;

  const complementaryPaymentMethodId = activePaymentMethods?.find(
    (method) =>
      (method?.configuration as { type?: string })?.type ===
      externalPaymentMethods.complementary,
  )?.id;

  const [createOrder] = useCommerceCreateOrderMutation({
    context: {
      ...context,
      headers: {
        owner: 'user',
      },
    },
    onCompleted: () => success('Order created'),
    onError: (e) => error(e.message),
  });

  const dealPrice = getDealPrice(deal);

  const dealItems = deal?.dealItems || [];

  // For now we are assuming the whole deal is taxed the same
  const dealProduct = dealItems[0]?.product;
  const dealTaxType = dealProduct?.taxType;

  const { tax, taxName, taxAmountString } = getTaxDetails(dealTaxType);

  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        enableReinitialize
        initialValues={{
          comments: '',
          complementary: false,
          email: '',
          external: false,
          firstName: '',
          lastName: '',
          paymentType: '',
          quantity: 1,
          taxApplied: '23%',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const isOrderPaidFor = values.external || values.complementary;

          await createOrder({
            variables: {
              commerceOrderCreate: {
                customer: {
                  email: values.email,
                  firstName: values.firstName,
                  lastName: values.lastName,
                },
                deal: deal?.id,
                items: dealItems.map((item) => ({
                  product: item?.product?.id,
                  quantity: (item?.step || 0) * values.quantity,
                })),
                locked: true,
                // If order was paid for by other means
                // we don't send an email with request for payment
                ...(isOrderPaidFor
                  ? {
                      metadata: { inviteToPurchase: false },
                      paymentMethod: values.external
                        ? externalPaymentMethodId
                        : complementaryPaymentMethodId,
                      status: CommerceOrderStatus.Complete,
                    }
                  : {
                      metadata: { inviteToPurchase: true },
                    }),
              },
            },
          });

          onRequestClose();
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>info</Icon>
                  </IconWrapper>
                </Spacing>

                <Spacing bottom="40px">
                  <HeaderText>Order summary</HeaderText>
                </Spacing>
              </Wrapper>
              <FormWrapper>
                <FieldRow>
                  <TicketType disabled label="Package" value={deal?.name} />
                  <TicketPrice
                    disabled
                    label="Package price"
                    value={formatDisplayPriceWithCurrency(
                      dealPrice,
                      store?.currencySymbol || '',
                    )}
                  />
                  <QuantityField
                    label="Quantity"
                    min={1}
                    name="quantity"
                    step={1}
                    type="number"
                  />
                </FieldRow>
                <FieldRow>
                  <StyledTextInput
                    disabled
                    label="Discount"
                    value="Not applicable"
                  />
                  <StyledTextInput
                    disabled
                    label="Net price"
                    value={formatDisplayPriceWithCurrency(
                      (dealPrice * values.quantity) as TotalInCents,
                      store?.currencySymbol || '',
                    )}
                  />
                </FieldRow>
                <FieldRow>
                  <StyledTextInput
                    disabled
                    label={`Tax amount - ${taxName || ''}`}
                    value={taxAmountString}
                  />
                  <StyledTextInput
                    disabled
                    label={`Total price (incl. ${taxName || ''})`}
                    name="totalPrice"
                    value={getTotalWithTax({
                      currency: store?.currencySymbol || '',
                      netPrice: dealPrice,
                      quantity: values.quantity,
                      tax,
                    })}
                  />
                </FieldRow>
                <RadioGroup>
                  {complementaryPaymentMethodId && (
                    <Checkbox
                      checked={values.complementary}
                      label="Complementary sale"
                      onChange={() => {
                        if (values.complementary) {
                          setFieldValue('complementary', false);
                        } else {
                          setFieldValue('complementary', true);
                          setFieldValue('external', false);
                        }
                      }}
                    />
                  )}
                  {externalPaymentMethodId && (
                    <Checkbox
                      checked={values.external}
                      label="Paid by external means"
                      onChange={() => {
                        if (values.external) {
                          setFieldValue('external', false);
                        } else {
                          setFieldValue('external', true);
                          setFieldValue('complementary', false);
                        }
                      }}
                    />
                  )}
                </RadioGroup>
                <TextAreaField
                  fieldHeight="100px"
                  label="Comments"
                  maxLength={100}
                  name="comments"
                  placeholder="Additional notes"
                />
                <Spacing bottom="1rem">Billing details</Spacing>
                <FieldRow>
                  <StyledTextInputField
                    required
                    label="First name"
                    name="firstName"
                    placeholder="John"
                  />
                  <StyledTextInputField
                    required
                    label="Last name"
                    name="lastName"
                    placeholder="Smith"
                  />
                </FieldRow>
                <TextInputField
                  required
                  label="Email"
                  name="email"
                  placeholder="john.smith@example.com"
                />
              </FormWrapper>
              <Modal.DefaultFooter
                submitText={
                  values.external || values.complementary
                    ? 'Generate and email order details'
                    : 'Create order'
                }
                onCancelClick={onRequestClose}
              />
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default InviteToPurhcasePackageModal;
