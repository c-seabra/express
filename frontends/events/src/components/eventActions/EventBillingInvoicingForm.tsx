import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import { Spacing } from '@websummit/components/src/templates/Spacing';
import {
  EventConfigurationCountry,
  useCountriesQuery,
  useLegalEntityCreateMutation,
  useLegalEntityUpdateMutation,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import { LegalEntity } from '../../lib/types';
import { useAppContext } from '../app/AppContext';

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  color: #0c1439;
  font-weight: 500;
  font-size: 24px;
`;

const SubHeader = styled.div`
  color: #0c1439;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
`;

const StyledInputField = styled(TextInputField)`
  width: 48%;
`;

const StyledSelectField = styled(SelectField)`
  width: 48%;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 2rem;
  margin-top: 1rem;

  & > ${SecondaryButton} {
    margin-right: 1rem;
  }
`;

const eventBillingSchema = Yup.object().shape({
  address1: Yup.string().required('Address line 1 is required'),
  address2: Yup.string(),
  city: Yup.string().required('City is required'),
  companyEmail: Yup.string().email(),
  companyName: Yup.string().required('Host company name is required'),
  companyRegistrationNumber: Yup.string(),
  companyTaxNumber: Yup.string(),
  companyWebsite: Yup.string(),
  country: Yup.string().required('Country is required'),
  postalCode: Yup.string(),
  region: Yup.string().required('Region is required'),
});

const emptyCompanyNameOption = {
  label: 'Select company name',
  value: undefined,
};

const emptyCountryOption = {
  label: 'Select country',
  value: undefined,
};

const emptyRegionOption = {
  label: 'Select region',
  value: undefined,
};

const getCompanyNameOptions = (names: string[] = []) => [
  emptyCompanyNameOption,
  ...names.map((name) => ({ label: name, value: name })),
];

const getCountryOptions = (
  countries: Pick<EventConfigurationCountry, 'name' | 'id'>[] = [],
) => [
  emptyCountryOption,
  ...countries.map((country) => ({ label: country?.name, value: country?.id })),
];

const getRegionOptions = (regions: string[] = []) => [
  emptyRegionOption,
  ...regions.map((region) => ({ label: region, value: region })),
];

type EventBillingFormProps = {
  eventBilling?: LegalEntity | null;
};

const EventBillingForm = ({ eventBilling }: EventBillingFormProps) => {
  const { token } = useAppContext();
  const history = useHistory();
  const success = useSuccessSnackbar();
  const errSnackbar = useErrorSnackbar();
  const error = useErrorSnackbar();
  const { data } = useCountriesQuery();

  const companyNameOptions = getCompanyNameOptions(
    ['company1', 'company2'].map((edge) => edge),
  );

  const countryOptions = getCountryOptions(
    data?.countries?.edges?.map((edge) => edge.node),
  );

  const regionOptions = getRegionOptions(
    [
      'Asia',
      'Africa',
      'Europe',
      'Oceania',
      'North America',
      'South America',
    ].map((element) => element),
  );

  const [createLegalEntity] = useLegalEntityCreateMutation({
    context: { token },
    onCompleted: ({ legalEntityCreate }) => {
      if (legalEntityCreate?.userErrors && legalEntityCreate?.userErrors.length > 0) {
        errSnackbar(legalEntityCreate?.userErrors[0].message);
      } else {
        success(`Billing and invoice data created`);
      }
    },
    onError: (e) => error(e.message),
    refetchQueries: ['Event'],
  });

  const [updateLegalEntity] = useLegalEntityUpdateMutation({
    context: { token },
    onCompleted: ({ legalEntityUpdate }) => {
      if (legalEntityUpdate?.userErrors && legalEntityUpdate?.userErrors.length > 0) {
        errSnackbar(legalEntityUpdate?.userErrors[0].message);
      } else {
        success(`Billing and invoice data updated`);
      }
    },
    onError: (e) => error(e.message),
    refetchQueries: ['Event'],
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        address1: eventBilling?.name || '',
        address2: eventBilling?.name || '',
        city: eventBilling?.name || '',
        companyName: eventBilling?.name || '',
        country: eventBilling?.address?.id || '',
        email: eventBilling?.name || '',
        name: eventBilling?.name || '',
        postalCode: eventBilling?.name || '',
        region: eventBilling?.name || '',
        registrationNumber: eventBilling?.name || '',
        taxNumber: eventBilling?.name || '',
        website: eventBilling?.name || '',
      }}
      validationSchema={eventBillingSchema}
      onSubmit={async (values) => {
        console.log('billing values', values);

        if (eventBilling?.id) {
          await updateLegalEntity({
            variables: {
              input: {
                address: {
                  city: values.city,
                  countryId: values.country,
                  lineOne: values.address1,
                  lineTwo: values.address2,
                  postalCode: values.postalCode,
                  region: values.region,
                },
                email: values.email,
                id: eventBilling.id,
                name: values.companyName,
                regNumber: values.registrationNumber,
                taxNumber: values.taxNumber,
                website: values.website,
              },
            },
          });
        } else {
          const { data: mutationResult, errors } = await createLegalEntity({
            variables: { input: values },
          });

          if (!errors) {
            const newEventSlug =
              mutationResult?.legalEntityCreate?.legalEntity?.id;
            history.replace(`${newEventSlug || ''}/settings`);
          }
        }
      }}
    >
      {() => (
        <Form>
          <Spacing bottom="1.75rem">
            <FieldRow>
              <StyledSelectField
                required
                label="Host company name"
                name="companyName"
                options={companyNameOptions}
              />

              <StyledInputField
                label="Host company’s tax number"
                name="companyTaxNumber"
                placeholder="IE1234567AB"
                type="text"
              />
            </FieldRow>

            <FieldRow>
              <StyledInputField
                label="Company’s registration number"
                name="companyRegistrationNumber"
                placeholder="1234"
                type="text"
              />
              <StyledInputField
                label="Company’s email"
                name="companyEmail"
                placeholder="email@company.com"
                type="text"
              />
            </FieldRow>

            <FieldRow>
              <StyledInputField
                label="Company’s website"
                name="companyWebsite"
                placeholder="www.website.com"
                type="text"
              />
            </FieldRow>
          </Spacing>

          <FlexCol>
            <Header>Address on Invoice</Header>
            <SubHeader>
              Provide details of the company hosting the event that will appear
              on the invoice.
            </SubHeader>
          </FlexCol>

          <FieldRow>
            <StyledInputField
              required
              label="Address line 1"
              name="address1"
              placeholder="Street 1"
              type="text"
            />
            <StyledInputField
              label="Address line 2"
              name="address2"
              placeholder="ABC road"
              type="text"
            />
          </FieldRow>

          <FieldRow>
            <StyledInputField
              required
              label="City"
              name="city"
              placeholder="Dublin"
              type="text"
            />
            <StyledSelectField
              required
              label="Country"
              name="country"
              options={countryOptions}
            />
          </FieldRow>

          <FieldRow>
            <StyledSelectField
              required
              label="Region"
              name="region"
              options={regionOptions}
            />

            <StyledInputField
              label="Postal code"
              name="postalCode"
              placeholder="R12 AB12"
            />
          </FieldRow>

          <ButtonsContainer>
            <Button type="submit">Save changes</Button>
          </ButtonsContainer>
        </Form>
      )}
    </Formik>
  );
};

export default EventBillingForm;
