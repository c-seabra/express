import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import CheckboxField from '@websummit/components/src/molecules/CheckboxField';
import MoneyInputField from '@websummit/components/src/molecules/MoneyInputField';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInput from '@websummit/components/src/molecules/TextInput';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import {
  CommerceCategory,
  CommerceProduct,
  CommerceProductTaxMode,
  CommerceProductType,
  CommerceSearchTermOp,
  CommerceTax,
  CommerceTaxType,
  Maybe,
  useCommerceCreateProductMutation,
  useCommerceListTagsQuery,
  useCommerceUpdateProductMutation,
} from '@websummit/graphql/src/@types/operations';
import CommerceGetProduct from '@websummit/graphql/src/operations/queries/CommerceGetProduct';
import CommerceListProducts from '@websummit/graphql/src/operations/queries/CommerceListProducts';
import { switchCase } from '@websummit/tsutils/src/lib/utils/logic';
import {
  fromCents,
  toCents,
  Total,
} from '@websummit/tsutils/src/lib/utils/price';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useRequestContext } from '../app/AppContext';

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

const StyledTextInputField = styled(TextInputField)`
  width: 48%;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const useTicketTypeMutations = ({
  ticketTypeId,
}: {
  ticketTypeId?: string;
}) => {
  const context = useRequestContext();
  const { success, error } = useSnackbars();

  const refetchQueries = ticketTypeId
    ? [{ context, query: CommerceGetProduct, variables: { id: ticketTypeId } }]
    : [{ context, query: CommerceListProducts }];

  const [createTicketType] = useCommerceCreateProductMutation({
    context,
    onCompleted: () => success('Ticket type created'),
    onError: (e) => error(e.message),
    refetchQueries,
  });

  const [updateTicketType] = useCommerceUpdateProductMutation({
    context,
    onCompleted: () => success('Ticket type updated'),
    onError: (e) => error(e.message),
    refetchQueries,
  });

  return { createTicketType, updateTicketType };
};

const ticketPriceVariants = {
  free: 'free',
  paid: 'paid',
};

const validationSchema = Yup.object().shape({
  bookingRefSuffix: Yup.string()
    .max(5)
    .matches(
      /^[A-Z][A-Z0-9]{0,4}$/,
      'Only upper case letters and digits up to 5 chars starting with letter eg. GA123',
    )
    .required('Suffix is required'),
  name: Yup.string(),
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

const getBookingRefSuffix = (
  ticketType?: Partial<CommerceProduct> & {
    active: boolean;
    id: string;
    name?: string;
  },
) => {
  if (ticketType?.metadata) {
    const { bookingRefSuffix } = ticketType?.metadata as {
      bookingRefSuffix?: string;
    };

    return bookingRefSuffix;
  }

  return '';
};

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-right: 8px;
`;

const getTotalPrice = (rateAmount = 0, price: Total, currencySymbol = '') => {
  const taxPercentage = rateAmount / 100;
  const priceInCents = toCents(price);
  const totalPrice = +priceInCents + taxPercentage * priceInCents;
  return `${currencySymbol}${fromCents(totalPrice).toFixed(2)}`;
};

type TicketTypeFormProps = {
  country?: string;
  currencySymbol?: string;
  onCancelClick?: () => void;
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
  ticketCategories: Partial<CommerceCategory>[];
  ticketType?: Partial<CommerceProduct> & {
    active: boolean;
    id: string;
    name?: string;
  };
  type?: CommerceProductType;
};

// On ticket type (CommerceProduct) creation,
// we need always include the default 'ticket' tag
// The specific tag we are looking for is named 'ticket'
// This tag is created on store upsertion,
// before ticket type configuration takes place
const defaultTicketTagCode = 'ticket';

const useDefaultTicketTag = () => {
  const context = useRequestContext();

  const { data: ticketTagData } = useCommerceListTagsQuery({
    context,
    variables: {
      terms: [
        {
          field: 'code',
          op: CommerceSearchTermOp.Eq,
          value: defaultTicketTagCode,
        },
      ],
    },
  });

  return (ticketTagData?.commerceListTags?.hits || [])[0];
};

const TicketTypeForm = ({
  country = '',
  currencySymbol = '',
  taxTypes = [],
  ticketCategories = [],
  ticketType,
  onCancelClick = () => null,
}: TicketTypeFormProps) => {
  const { createTicketType, updateTicketType } = useTicketTypeMutations({
    ticketTypeId: ticketType?.id,
  });

  const defaultTag = useDefaultTicketTag();

  const ticketCategoriesOptions = [
    emptyOption,
    ...ticketCategories.map((group) => ({
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

  const mappedType = (type: boolean | undefined): CommerceProductType =>
    type ? CommerceProductType.Package : CommerceProductType.Simple;

  const suffix = getBookingRefSuffix(ticketType);
  const mapInitialType = (type: CommerceProductType): boolean => {
    return switchCase({
      [CommerceProductType.Simple]: false,
      [CommerceProductType.Package]: true,
    })(false)(type);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        active: ticketType?.active,
        bookingRefSuffix: suffix,
        category:
          (ticketType?.categories && ticketType?.categories[0]?.id) || '',
        description: ticketType?.description || '',
        name: ticketType?.name || '',
        price: fromCents(ticketType?.price),
        taxMode: ticketType?.taxMode || '',
        taxType: ticketType?.taxType?.id || '',
        ticketPriceVariant: getPriceVariant(ticketType),
        type: mapInitialType(ticketType?.type as CommerceProductType),
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const {
          type,
          active,
          name,
          description,
          price,
          taxType,
          taxMode,
          bookingRefSuffix,
        } = values;

        if (ticketType?.id) {
          await updateTicketType({
            variables: {
              id: ticketType?.id,
              input: {
                active,
                categories: values?.category ? [{ id: values.category }] : [],
                description,
                metadata: {
                  ...((ticketType?.metadata as Record<string, unknown>) || {}),
                  bookingRefSuffix,
                },
                name,
                price: toCents(price),
                taxMode:
                  taxMode === CommerceProductTaxMode.B2B
                    ? CommerceProductTaxMode.B2B
                    : CommerceProductTaxMode.B2C,
                taxType: {
                  id: taxType || '',
                },
                type: mappedType(!!type),
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
                metadata: {
                  bookingRefSuffix,
                },
                name,
                price: toCents(price),
                // when adding multiple tags on creation
                // we still need to include the default tag here
                tags: [{ id: defaultTag?.id }],

                taxMode:
                  taxMode === CommerceProductTaxMode.B2B
                    ? CommerceProductTaxMode.B2B
                    : CommerceProductTaxMode.B2C,
                taxType: {
                  id: taxType || '',
                },
                type: mappedType(!!type),
              },
            },
          });
        }

        onCancelClick();
      }}
    >
      {({ values, resetForm }) => {
        const taxRate = values?.taxType
          ? getTaxRateByStoreCountry(
              (taxTypes || []).find((type) => type.id === values?.taxType),
              country,
            )
          : undefined;

        return (
          <Form>
            <FormWrapper>
              <FieldRow>
                <StyledTextInputField
                  required
                  label="Ticket name"
                  name="name"
                  placeholder="General attendee"
                />
                <StyledTextInputField
                  required
                  label="Ticket type suffix (case sensitive)"
                  maxLength={5}
                  name="bookingRefSuffix"
                  placeholder="ABC12"
                />
              </FieldRow>
              <TextAreaField
                label="Ticket description"
                maxLength={100}
                name="description"
                placeholder="Specify ticket description"
              />
              <FieldRow>
                <CheckboxField label="Package of tickets" name="type" />
              </FieldRow>
              <FieldRow>
                <StyledSelectField
                  label="Ticket category"
                  name="category"
                  options={ticketCategoriesOptions}
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
            <ButtonsContainer>
              <StyledSecondaryButton
                type="button"
                onClick={() => {
                  resetForm();
                  onCancelClick();
                }}
              >
                Cancel
              </StyledSecondaryButton>
              <Button type="submit">Save</Button>
            </ButtonsContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default TicketTypeForm;
