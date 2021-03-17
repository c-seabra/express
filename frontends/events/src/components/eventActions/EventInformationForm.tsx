import {
  Button,
  SecondaryButton,
  TextButton,
} from '@websummit/components/src/atoms/Button';
import SelectField from '@websummit/components/src/molecules/SelectField';
import {
  useErrorSnackbar,
  useSuccessSnackbar,
} from '@websummit/components/src/molecules/Snackbar';
import TextAreaField from '@websummit/components/src/molecules/TextAreaField';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import {
  CurrencyCode,
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

import { useAppContext } from '../app/AppContext';

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 48%;
  display: flex;
  margin-bottom: 2px;
`;

type EventInformationFormProps = {
  eventInfo?:
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

const eventInformationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Event slug is required'),
});

const emptyOption = {
  label: '',
  value: undefined,
};

const currencyOptions = [
  emptyOption,
  ...Object.values(CurrencyCode).map((code) => ({
    label: code,
    value: code,
  })),
];

const getCountryOptions = (
  countries: Pick<EventConfigurationCountry, 'name' | 'id'>[] = [],
) => [
  emptyOption,
  ...countries.map((country) => ({ label: country?.name, value: country?.id })),
];

const EventInformationForm = ({ eventInfo }: EventInformationFormProps) => {
  const { token } = useAppContext();
  const history = useHistory();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();
  const { data } = useCountriesQuery();

  const countryOptions = getCountryOptions(
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
        baseUrl: eventInfo?.baseUrl,
        country: eventInfo?.country?.id,
        currency: eventInfo?.currency,
        description: eventInfo?.description,
        endDate: eventInfo?.endDate,
        name: eventInfo?.name || '',
        slug: eventInfo?.slug || '',
        startDate: eventInfo?.startDate,
        timezone: eventInfo?.timezone,
      }}
      validationSchema={eventInformationSchema}
      onSubmit={async (values) => {
        if (eventInfo?.id) {
          await updateEvent({ variables: values });
        } else {
          const { data: mutationResult, errors } = await createEvent({
            variables: values,
          });

          if (!errors) {
            const newEventSlug = mutationResult?.eventCreate?.event?.slug;
            history.replace(`${newEventSlug || ''}/settings`);
          }
        }
      }}
    >
      {({ resetForm }) => (
        <Form>
          <TextInputField required label="Event name" name="name" />
          <TextAreaField label="Event description" name="description" />
          <FieldRow>
            <StyledInputField
              label="Event start date"
              name="startDate"
              type="date"
            />
            <StyledInputField
              label="Event end date"
              name="endDate"
              type="date"
            />
          </FieldRow>
          <FieldRow>
            <StyledSelectField
              label="Currency of event"
              name="currency"
              options={currencyOptions}
            />
            <StyledSelectField label="Timezone of event" name="timezone" />
          </FieldRow>
          <FieldRow>
            <StyledSelectField
              label="Company hosting the event"
              name="hostCompany"
            />
            <ButtonContainer>
              <TextButton>Add host company</TextButton>
            </ButtonContainer>
          </FieldRow>
          <FieldRow>
            <StyledSelectField
              label="Country of event"
              name="country"
              options={countryOptions}
            />
            <StyledInputField label="Base event URL" name="url" />
          </FieldRow>
          <TextInputField required label="Event slug" name="slug" />
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

export default EventInformationForm;
