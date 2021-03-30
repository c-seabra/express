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
  useEventUpdateMutation,
  useLegalEntityLazyQuery,
  useLegalEntityUpdateMutation,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';

import { REGION_LIST } from '../../lib/constants/location';
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
  companyName: Yup.string().required('Host company name is required'),
  companyRegistrationNumber: Yup.string(),
  companyTaxNumber: Yup.string(),
  companyWebsite: Yup.string(),
  country: Yup.string().required('Country is required'),
  email: Yup.string().email('Invalid email'),
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

const getCompanyNameOptions = (companies: LegalEntity[] = []) => [
  emptyCompanyNameOption,
  ...companies.map((entity) => ({
    id: entity.id,
    label: entity.name,
    value: entity.name,
  })),
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
  legalEntities?: LegalEntity[] | null;
};

const EventBillingForm = ({
  eventBilling,
  legalEntities,
}: EventBillingFormProps) => {
  const { token, conferenceSlug } = useAppContext();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();
  const { data } = useCountriesQuery();

  const sortedCompanies = legalEntities?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const companyNameOptions = getCompanyNameOptions(sortedCompanies);

  const mappedCountries = data?.countries?.edges?.map((edge) => edge.node);
  const sortedCountries = mappedCountries?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const countryOptions = getCountryOptions(sortedCountries);

  const regionOptions = getRegionOptions(REGION_LIST);

  const [updateEvent] = useEventUpdateMutation({
    awaitRefetchQueries: true,
    context: { token },
    onCompleted: () => {
      success(`Event updated`);
    },
    onError: (e) => error(e.message),
    refetchQueries: ['Event'],
  });

  const [updateLegalEntity] = useLegalEntityUpdateMutation({
    awaitRefetchQueries: true,
    context: { token },
    onCompleted: async ({ legalEntityUpdate }) => {
      if (
        legalEntityUpdate?.userErrors &&
        legalEntityUpdate?.userErrors.length > 0
      ) {
        error(legalEntityUpdate?.userErrors[0].message);
      } else {
        await updateEvent({
          variables: {
            input: {
              legalEntityId: legalEntityUpdate?.legalEntity?.id,
              slug: conferenceSlug as string,
            },
          },
        });
        success(`Billing and invoice data updated`);
      }
    },
    onError: (e) => error(e.message),
    refetchQueries: ['Event'],
  });

  const [legalEntityResult] = useLegalEntityLazyQuery({
    context: { token },
    onCompleted: async ({ legalEntity }) => {
      if (legalEntity) {
        await updateEvent({
          variables: {
            input: {
              legalEntityId: legalEntity?.id,
              slug: conferenceSlug as string,
            },
          },
        });

        success(`Billing and invoice data switched to ${legalEntity.name}`);
      }
    },
    onError: (e) => error(e.message),
  });

  const fillCompanyInfo = (event: any) => {
    const name = event.target.value;
    const legalEntity = legalEntities?.filter(
      (element) => element.name === name,
    )[0];
    const legalEntityId = legalEntity?.id;
    legalEntityResult({
      variables: {
        id: legalEntityId || '',
      },
    });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        address1: eventBilling?.address?.lineOne || '',
        address2: eventBilling?.address?.lineTwo || '',
        city: eventBilling?.address?.city || '',
        companyName: eventBilling?.name || '',
        country: eventBilling?.address?.country.id || '',
        email: eventBilling?.email || '',
        name: eventBilling?.name || '',
        postalCode: eventBilling?.address?.postalCode || '',
        region: eventBilling?.address?.region || '',
        registrationNumber: eventBilling?.regNumber || '',
        taxNumber: eventBilling?.taxNumber || '',
        website: eventBilling?.website || '',
      }}
      validationSchema={eventBillingSchema}
      onSubmit={async (values) => {
        if (eventBilling?.id) {
          await updateLegalEntity({
            variables: {
              input: {
                address: {
                  city: values.city.trim(),
                  countryId: values.country,
                  lineOne: values.address1.trim(),
                  lineTwo: values.address2.trim(),
                  postalCode: values.postalCode.trim(),
                  region: values.region,
                },
                email: values.email.trim(),
                id: eventBilling.id,
                name: values.companyName.trim(),
                regNumber: values.registrationNumber.trim(),
                taxNumber: values.taxNumber.trim(),
                website: values.website.trim(),
              },
            },
          });
        }
      }}
    >
      {({ resetForm }) => (
        <Form>
          <Spacing bottom="1.75rem">
            <FieldRow>
              <StyledSelectField
                required
                label="Host company name"
                name="companyName"
                options={companyNameOptions}
                onChange={fillCompanyInfo}
              />

              <StyledInputField
                label="Host company’s tax number"
                name="taxNumber"
                placeholder="IE1234567AB"
                type="text"
              />
            </FieldRow>

            <FieldRow>
              <StyledInputField
                label="Company’s registration number"
                name="registrationNumber"
                placeholder="01234567"
                type="text"
              />
              <StyledInputField
                label="Company’s email"
                name="email"
                placeholder="email@company.com"
                type="text"
              />
            </FieldRow>

            <FieldRow>
              <StyledInputField
                label="Company’s website"
                name="website"
                placeholder="https://example.com"
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
              required
              label="Postal code"
              name="postalCode"
              placeholder="R12 AB12"
            />
          </FieldRow>

          <ButtonsContainer>
            <SecondaryButton type="button" onClick={() => resetForm()}>
              Cancel
            </SecondaryButton>

            <Button type="submit">Save changes</Button>
          </ButtonsContainer>
        </Form>
      )}
    </Formik>
  );
};

export default EventBillingForm;
