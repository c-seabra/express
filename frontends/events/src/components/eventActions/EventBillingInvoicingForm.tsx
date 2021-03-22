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
import {
  Event,
  EventConfigurationCountry,
  useCountriesQuery,
  useEventCreateMutation,
  useEventUpdateMutation,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import { Spacing } from '@websummit/components/src/templates/Spacing';
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

type EventBillingFormProps = {
  eventBilling?:
    | (Pick<
        Event,
        | 'id'
        | 'name'
        | 'description'
        | 'slug'
        | 'startDate'
        | 'endDate'
        | 'timezone'
        | 'baseUrl'
        | 'currency'
      > & {
        country: Pick<EventConfigurationCountry, 'id' | 'name'> | null;
      })
    | null;
};

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
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Event slug is required'),
});

const emptyCountryOption = {
  label: 'Select country',
  value: undefined,
};

const emptyRegionOption = {
  label: 'Select region',
  value: undefined,
};

const getCountryOptions = (
  countries: Pick<EventConfigurationCountry, 'name' | 'id'>[] = [],
) => [
  emptyCountryOption,
  ...countries.map((country) => ({ label: country?.name, value: country?.id })),
];

const getRegionOptions = (
  countries: Pick<EventConfigurationCountry, 'name' | 'id'>[] = [],
) => [
  emptyRegionOption,
  ...countries.map((country) => ({ label: country?.name, value: country?.id })),
];

const EventBillingForm = ({ eventBilling }: EventBillingFormProps) => {
  const { token } = useAppContext();
  const history = useHistory();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();
  const { data } = useCountriesQuery();

  const countryOptions = getCountryOptions(
    data?.countries?.edges?.map((edge) => edge.node),
  );

  const regionOptions = getRegionOptions(
    data?.countries?.edges?.map((edge) => edge.node),
  );

  const [createEvent] = useEventCreateMutation({
    context: { token },
    onCompleted: () => {
      success(`Event created`);
    },
    onError: (e) => error(e.message),
    refetchQueries: ['Event'],
  });

  const [updateEvent] = useEventUpdateMutation({
    context: { token },
    onCompleted: () => {
      success(`Event updated`);
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
        country: eventBilling?.country?.id,
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
        // if (eventBilling?.id) {
        //   await updateEvent({
        //     variables: { event: { ...eventBilling, ...values } },
        //   });
        // } else {
        //   const { data: mutationResult, errors } = await createEvent({
        //     variables: { event: values },
        //   });
        //
        //   if (!errors) {
        //     const newEventSlug = mutationResult?.eventCreate?.event?.slug;
        //     history.replace(`${newEventSlug || ''}/settings`);
        //   }
        // }
      }}
    >
      {({ resetForm }) => (
        <Form>
          <Spacing bottom="1.75rem">
            <FieldRow>
              <StyledInputField
                required
                label="Host company name"
                name="name"
                placeholder="Websummit"
                type="text"
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
                placeholder="1234"
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
