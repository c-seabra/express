import { Button } from '@websummit/components/src/atoms/Button';
import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import FormikForm from '@websummit/components/src/templates/FormikForm';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  EventConfigurationCountry,
  useCommerceUpdateCustomerMutation,
  useCountriesQuery,
} from '@websummit/graphql/src/@types/operations';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import STATIC_MESSAGES from '../../lib/constants/messages';
import { useRequestContext } from '../app/AppContext';

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
`;

const StyledInputField = styled(TextInputField)`
  width: 48%;
`;

const StyledSelectField = styled(SelectField)`
  width: 48%;
`;

type Props = {
  orderId: string;
  prefillData: any;
};

export type OrderInvoiceFormData = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  companyTaxNo: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  postalCode: string;
};

const validationSchema = Yup.object().shape({
  addressLine1: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  city: Yup.string(),
  companyTaxNo: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  country: Yup.string(),
  email: Yup.string().email().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  firstName: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  lastName: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  phoneNumber: Yup.string(),
  postalCode: Yup.string(),
});

const emptyCountryOption = {
  label: 'Select country',
  value: undefined,
};

const getCountryOptions = (
  countries: Pick<EventConfigurationCountry, 'name' | 'id' | 'code'>[] = [],
) => [
  emptyCountryOption,
  ...countries.map((country) => ({
    label: country?.name,
    value: country?.code,
  })),
];

const OrderInvoiceForm = ({ prefillData, orderId }: Props) => {
  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();

  const [updateCustomer] = useCommerceUpdateCustomerMutation({
    context,
    onCompleted: () => {
      snackbar('Customer data updated');
    },
    onError: (e) => errorSnackbar(e.message),
  });

  const { data } = useCountriesQuery();
  const mappedCountries = data?.countries?.edges?.map((edge) => edge.node);
  const sortedCountries = mappedCountries?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const countryOptions = getCountryOptions(sortedCountries);

  const initialValues = () => {
    return {
      addressLine1: prefillData.addressLine1,
      addressLine2: prefillData.addressLine2,
      city: prefillData.city,
      companyTaxNo: prefillData.companyTaxNo,
      country: prefillData.country,
      email: prefillData.email,
      firstName: prefillData.firstName,
      lastName: prefillData.lastName,
      phoneNumber: prefillData.phoneNumber,
      postalCode: prefillData.postalCode,
    };
  };

  const onSubmit = (formData: OrderInvoiceFormData) => {
    const input = {
      address: {
        city: formData.city.trim(),
        country: formData.country.trim(),
        line1: formData.addressLine1.trim(),
        line2: formData.addressLine2.trim(),
        postalCode: formData.postalCode.trim(),
        // state: String
      },
      // companyName: String
      email: formData.email.trim(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      vatNumber: formData.companyTaxNo.trim(),
    };

    return updateCustomer({
      variables: { commerceCustomerUpdate: input, id: prefillData.id, orderId },
    });
  };

  return (
    <FormikForm
      initialValues={initialValues()}
      submitCallback={onSubmit}
      validationSchema={validationSchema}
    >
      <Fieldset disabled={false}>
        <Spacing top="2rem">
          <FieldWrapper>
            <InlineWrapper>
              <StyledInputField
                required
                label="First name"
                name="firstName"
                placeholder="Jane"
                type="text"
              />

              <StyledInputField
                required
                label="Last name"
                name="lastName"
                placeholder="Doe"
                type="text"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <TextInputField
              required
              label="Email address"
              name="email"
              placeholder="jane.doe@company.com"
              type="text"
            />
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledInputField
                required
                label="Address line 1"
                name="addressLine1"
                placeholder="Road 1"
                type="text"
              />

              <StyledInputField
                label="Address line 2"
                name="addressLine2"
                placeholder="Green lane"
                type="text"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledSelectField
                required
                label="Country"
                name="country"
                options={countryOptions}
              />

              <StyledInputField
                label="City"
                name="city"
                placeholder="Dublin"
                type="text"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <InlineWrapper>
              <StyledInputField
                required
                label="Postal code"
                name="postalCode"
                placeholder="R12 AB12"
                type="text"
              />

              <StyledInputField
                required
                label="Company tax no."
                name="companyTaxNo"
                placeholder="IE 1234567"
                type="text"
              />
            </InlineWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <StyledInputField
              label="Company’s phone"
              name="phoneNumber"
              placeholder="+353 1 437 0969"
              type="text"
            />
          </FieldWrapper>

          <FlexEnd>
            <Button type="submit">Save</Button>
          </FlexEnd>
        </Spacing>
      </Fieldset>
    </FormikForm>
  );
};

export default OrderInvoiceForm;
