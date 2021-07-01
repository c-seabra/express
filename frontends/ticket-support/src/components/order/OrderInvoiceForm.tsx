import { Button } from '@websummit/components/src/atoms/Button';
import { FieldWrapper } from '@websummit/components/src/molecules/FormikModal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  EventConfigurationCountry,
  useCommerceUpdateCustomerMutation,
  useCountriesQuery,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { SecondaryButton } from '../../lib/components/atoms/Button';
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
  addressId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  companyName: string;
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
  addressLine2: Yup.string(),
  city: Yup.string(),
  companyName: Yup.string().required(STATIC_MESSAGES.VALIDATION.REQUIRED),
  companyTaxNo: Yup.string(),
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
  const [isEditOn, setEditOn] = useState(false);
  const openEditMode = () => setEditOn(true);
  const closeEditMode = () => setEditOn(false);

  const context = useRequestContext();
  const snackbar = useSuccessSnackbar();
  const errorSnackbar = useErrorSnackbar();

  const [updateCustomer] = useCommerceUpdateCustomerMutation({
    context,
    onCompleted: () => {
      closeEditMode();
      snackbar('Customer data updated');
    },
    onError: (e) => {
      closeEditMode();
      errorSnackbar(e.message);
    },
  });

  const { data } = useCountriesQuery();
  const mappedCountries = data?.countries?.edges?.map((edge) => edge.node);
  const sortedCountries = mappedCountries?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const countryOptions = getCountryOptions(sortedCountries);

  const initialValues = () => {
    return {
      addressId: prefillData.addressId,
      addressLine1: prefillData.addressLine1,
      addressLine2: prefillData.addressLine2,
      city: prefillData.city,
      companyName: prefillData.companyName,
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
        city: formData?.city?.trim(),
        country: formData?.country?.trim(),
        id: formData?.addressId,
        line1: formData?.addressLine1?.trim(),
        line2: formData?.addressLine2?.trim(),
        postalCode: formData?.postalCode?.trim(),
      },
      companyName: formData?.companyName?.trim(),
      email: formData?.email?.trim(),
      firstName: formData?.firstName?.trim(),
      lastName: formData?.lastName?.trim(),
      phoneNumber: formData?.phoneNumber?.trim(),
      vatNumber: formData?.companyTaxNo?.trim(),
    };

    return updateCustomer({
      variables: { commerceCustomerUpdate: input, id: prefillData.id, orderId },
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues()}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ resetForm, isSubmitting }) => (
        <Form>
          <Fieldset disabled={!isEditOn}>
            <Spacing top="2rem">
              <FieldWrapper>
                <TextInputField
                  required
                  label="Company's name"
                  name="companyName"
                  placeholder="ABC Corp."
                  type="text"
                />
              </FieldWrapper>

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

              {isEditOn && (
                <FlexEnd>
                  <Spacing right="1rem">
                    <SecondaryButton
                      onClick={() => {
                        resetForm();
                        closeEditMode();
                      }}
                    >
                      Cancel
                    </SecondaryButton>
                  </Spacing>
                  <Button disabled={isSubmitting} type="submit">
                    Save
                  </Button>
                </FlexEnd>
              )}
            </Spacing>
          </Fieldset>

          {!isEditOn && (
            <FlexEnd>
              <SecondaryButton
                disabled={false}
                onClick={() => {
                  openEditMode();
                }}
              >
                Edit
              </SecondaryButton>
            </FlexEnd>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default OrderInvoiceForm;
