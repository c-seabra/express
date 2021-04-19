import Icon from '@websummit/components/src/atoms/Icon';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import Modal, { ModalProps } from '@websummit/components/src/molecules/Modal';
import MoneyInputField from '@websummit/components/src/molecules/MoneyInputField';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInput from '@websummit/components/src/molecules/TextInput';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import { fromCents, toCents, Total } from '@websummit/glue/src/lib/utils/price';
import {
  CommerceCategory,
  CommerceProduct,
  CommerceProductTaxMode,
  CommerceTax,
  CommerceTaxType,
  Maybe,
  useCommerceCreateProductMutation,
  useCommerceUpdateProductMutation,
} from '@websummit/graphql/src/@types/operations';
import CommerceListProducts from '@websummit/graphql/src/operations/queries/CommerceListProducts';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useAppContext } from '../app/AppContext';

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

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  width: 48%;
`;

const StyledSelectField = styled(SelectField)`
  width: 48%;
`;

const StyledMoneyField = styled(MoneyInputField)`
  width: 48%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const useTicketTypeMutations = () => {
  const { token } = useAppContext();
  const { success, error } = useSnackbars();

  const [createTicketType] = useCommerceCreateProductMutation({
    context: { token },
    onCompleted: () => success('Ticket type created'),
    onError: (e) => error(e.message),
    refetchQueries: [{ context: { token }, query: CommerceListProducts }],
  });

  const [updateTicketType] = useCommerceUpdateProductMutation({
    context: { token },
    onCompleted: () => success('Ticket type updated'),
    onError: (e) => error(e.message),
    refetchQueries: [{ context: { token }, query: CommerceListProducts }],
  });

  return { createTicketType, updateTicketType };
};

const ticketPriceVariants = {
  free: 'free',
  paid: 'paid',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number().when('ticketPriceVariant', {
    is: (ticketPrice: string) =>
      ticketPrice && ticketPrice === ticketPriceVariants.paid,
    then: Yup.number()
      .required('Price is mandatory if ticket is not free')
      .moreThan(0, 'Price must be greater than zero'),
  }),
  taxType: Yup.string().required('Tax type is required'),
  ticketPriceVariant: Yup.string().required('Ticket price is required'),
});

const emptyOption = { label: '', value: undefined };

const taxModeOptions = [
  emptyOption,
  { label: CommerceProductTaxMode.B2B, value: CommerceProductTaxMode.B2B },
  { label: CommerceProductTaxMode.B2C, value: CommerceProductTaxMode.B2C },
];

const ticketPriceOptions = [
  {
    label: 'Free',
    value: ticketPriceVariants.free,
  },
  {
    label: 'Paid',
    value: ticketPriceVariants.paid,
  },
];

const getTaxRateByStoreCountry = (
  taxType?: { __typename?: 'CommerceTaxType' } & Pick<
    CommerceTaxType,
    'id' | 'name' | 'description'
  > & {
      taxes: Maybe<
        Array<
          { __typename?: 'CommerceTax' } & Pick<
            CommerceTax,
            'id' | 'country' | 'name' | 'rateAmount' | 'rateType'
          >
        >
      >;
    },
  country?: string,
) => {
  return taxType?.taxes?.find((tax) => tax?.country === country);
};

type TicketGroupModalProps = Pick<ModalProps, 'isOpen' | 'onRequestClose'> & {
  country?: string;
  currencySymbol?: string;
  taxTypes: Maybe<
    Array<
      { __typename?: 'CommerceTaxType' } & Pick<
        CommerceTaxType,
        'id' | 'name' | 'description'
      > & {
          taxes: Maybe<
            Array<
              { __typename?: 'CommerceTax' } & Pick<
                CommerceTax,
                'id' | 'country' | 'name' | 'rateAmount' | 'rateType'
              >
            >
          >;
        }
    >
  >;
  ticketGroups: Partial<CommerceCategory>[];
  ticketType?: Partial<CommerceProduct> & {
    active: boolean;
    id: string;
    name?: string;
  };
};

const getPriceVariant = (
  ticketType?: Partial<CommerceProduct> & {
    active: boolean;
    id: string;
    name?: string;
  },
) => {
  if (ticketType?.id) {
    if (ticketType?.price && ticketType.price > 0) {
      return ticketPriceVariants.paid;
    }

    return ticketPriceVariants.free;
  }

  return ticketPriceVariants.free;
};

const getTotalPrice = (rateAmount = 0, price: Total, currencySymbol = '') => {
  const taxPercentage = rateAmount / 100;
  const priceInCents = toCents(price);
  const totalPrice = +priceInCents + taxPercentage * priceInCents;
  return `${currencySymbol}${fromCents(totalPrice)}`;
};

const TicketTypeModal = ({
  country = '',
  currencySymbol = '',
  isOpen,
  onRequestClose,
  taxTypes = [],
  ticketGroups = [],
  ticketType,
}: TicketGroupModalProps) => {
  const { createTicketType, updateTicketType } = useTicketTypeMutations();

  const ticketGroupOptions = [
    emptyOption,
    ...ticketGroups.map((group) => ({
      label: group.name,
      value: group.id || '',
    })),
  ];

  const taxTypesOptions = [
    emptyOption,
    ...(taxTypes || []).map((type) => ({
      label: type.name,
      value: type.id || '',
    })),
  ];

  return (
    <Modal withDefaultFooter isOpen={isOpen} onRequestClose={onRequestClose}>
      <Formik
        enableReinitialize
        initialValues={{
          active: ticketType?.active,
          category:
            (ticketType?.categories && ticketType?.categories[0]?.id) || '',
          description: ticketType?.description,
          name: ticketType?.name || '',
          price: fromCents(ticketType?.price),
          taxMode: ticketType?.taxMode || '',
          taxType: ticketType?.taxType?.id || '',
          ticketPriceVariant: getPriceVariant(ticketType),
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { active, name, description, price, taxType, taxMode } = values;

          if (ticketType?.id) {
            await updateTicketType({
              variables: {
                id: ticketType?.id,
                input: {
                  active,
                  categories: values?.category ? [{ id: values.category }] : [],
                  description,
                  name,
                  price: toCents(price),
                  taxMode:
                    taxMode === CommerceProductTaxMode.B2B
                      ? CommerceProductTaxMode.B2B
                      : CommerceProductTaxMode.B2C,
                  taxType: {
                    id: taxType || '',
                  },
                },
              },
            });
          } else {
            await createTicketType({
              variables: {
                input: {
                  active,
                  categories: values?.category ? [{ id: values.category }] : [],
                  description,
                  name,
                  price: toCents(price),
                  taxMode:
                    taxMode === CommerceProductTaxMode.B2B
                      ? CommerceProductTaxMode.B2B
                      : CommerceProductTaxMode.B2C,
                  taxType: {
                    id: taxType || '',
                  },
                },
              },
            });
          }

          onRequestClose();
        }}
      >
        {({ values }) => {
          const taxRate = values?.taxType
            ? getTaxRateByStoreCountry(
                (taxTypes || []).find((type) => type.id === values?.taxType),
                country,
              )
            : undefined;

          return (
            <Form>
              <Wrapper>
                <Spacing bottom="10px">
                  <IconWrapper>
                    <Icon>info</Icon>
                  </IconWrapper>
                </Spacing>

                <Spacing bottom="40px">
                  <HeaderText>
                    {ticketType?.id ? 'Edit' : 'Add'}&nbsp;ticket type
                  </HeaderText>
                </Spacing>
              </Wrapper>
              <FormWrapper>
                <TextInputField
                  required
                  label="Ticket name"
                  name="name"
                  placeholder="General attendee"
                />
                <TextAreaField
                  label="Ticket description"
                  maxLength={100}
                  name="description"
                  placeholder="This ticket shall be given to GA"
                />
                <FieldRow>
                  <StyledSelectField
                    label="Ticket category"
                    name="categories"
                    options={ticketGroupOptions}
                    placeholder="GA"
                  />
                  <CheckboxField label="Ticket sale on" name="active" />
                </FieldRow>
                <FieldRow>
                  <StyledSelectField
                    required
                    label="Tax type"
                    name="taxType"
                    options={taxTypesOptions}
                    placeholder="Reduced"
                  />
                  <StyledSelectField
                    label="Product taxation"
                    name="taxMode"
                    options={taxModeOptions}
                    placeholder="B2C"
                  />
                </FieldRow>
                <FieldRow>
                  <StyledSelectField
                    required
                    label="Ticket price"
                    name="ticketPriceVariant"
                    options={ticketPriceOptions}
                  />
                  <StyledMoneyField
                    currencySymbol={currencySymbol}
                    disabled={
                      values.ticketPriceVariant === ticketPriceVariants.free
                    }
                    label="Net ticket price (excl. tax)"
                    name="price"
                    required={
                      values.ticketPriceVariant === ticketPriceVariants.paid
                    }
                  />
                </FieldRow>
                <FieldRow>
                  <StyledTextInput
                    disabled
                    label="Tax percentage"
                    value={taxRate?.rateAmount ? `${taxRate?.rateAmount}%` : ''}
                  />
                  <StyledTextInput
                    disabled
                    label={`Total price (incl. ${taxRate?.name || 'tax'})`}
                    value={
                      values?.ticketPriceVariant === ticketPriceVariants.paid
                        ? getTotalPrice(
                            taxRate?.rateAmount,
                            values.price,
                            currencySymbol,
                          )
                        : ''
                    }
                  />
                </FieldRow>
              </FormWrapper>
              <Modal.DefaultFooter
                submitText="Save"
                onCancelClick={onRequestClose}
              />
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default TicketTypeModal;
