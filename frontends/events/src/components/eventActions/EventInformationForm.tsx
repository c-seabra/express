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
  LegalEntity,
  TimeZone,
  useCountriesQuery,
  useEventCreateMutation,
  useEventLazyQuery,
  useEventUpdateMutation,
  useLegalEntitiesQuery,
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
        | 'timeZone'
        | 'baseUrl'
        | 'currency'
        | 'taxNumber'
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
  label: 'Please select',
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

const getLegalEntityOptions = (
  legalEntites: Pick<LegalEntity, 'name' | 'id'>[] = [],
) => [
  emptyOption,
  ...legalEntites.map((legalEntity) => ({
    label: legalEntity.name,
    value: legalEntity.id,
  })),
];

const getTimeZoneOptions = (timeZones: TimeZone[] = []) => [
  emptyOption,
  ...timeZones.map((timeZone) => ({
    label: timeZone.displayName,
    value: timeZone.ianaName,
  })),
];

const ExistingSlugErrorMessage = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: -1.2rem;
`;

const EventInformationForm = ({ eventInfo }: EventInformationFormProps) => {
  const { token } = useAppContext();
  const history = useHistory();
  const success = useSuccessSnackbar();
  const error = useErrorSnackbar();
  const { data } = useCountriesQuery();
  const { data: legalEntitiesData } = useLegalEntitiesQuery({
    context: { token },
  });

  const [getExistingEvent, { data: existingEventData }] = useEventLazyQuery({
    context: { token },
  });

  const countryOptions = getCountryOptions(
    data?.countries?.edges?.map((edge) => edge.node),
  );

  const legalEntityOptions = getLegalEntityOptions(
    legalEntitiesData?.legalEntities?.edges?.map((edge) => edge.node),
  );

  // TODO: Add timezone query and pass fetched timezones to this function (akin to useCountriesQuery above)
  const timeZoneOptions = getTimeZoneOptions();

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
        countryId: eventInfo?.country?.id,
        currency: eventInfo?.currency,
        description: eventInfo?.description,
        endDate: eventInfo?.endDate,
        name: eventInfo?.name || '',
        slug: eventInfo?.slug || '',
        startDate: eventInfo?.startDate,
        taxNumber: eventInfo?.taxNumber,
        timeZone: eventInfo?.timeZone?.ianaName,
      }}
      validationSchema={eventInformationSchema}
      onSubmit={async (values) => {
        if (eventInfo?.id) {
          await updateEvent({
            variables: { event: values },
          });
        } else {
          const { data: mutationResult, errors } = await createEvent({
            variables: { event: values },
          });

          if (!errors) {
            const newEventSlug = mutationResult?.eventCreate?.event?.slug;
            history.replace(`${newEventSlug || ''}/settings`);
          }
        }
      }}
    >
      {({ resetForm, values }) => (
        <Form>
          <TextInputField required label="Event name" name="name" />
          <FieldRow>
            <StyledInputField
              required
              label="Event start date"
              name="startDate"
              type="date"
            />
            <StyledInputField
              required
              label="Event end date"
              name="endDate"
              type="date"
            />
          </FieldRow>
          <TextAreaField label="Event description" name="description" />
          <FieldRow>
            <StyledSelectField
              required
              label="Currency of event"
              name="currency"
              options={currencyOptions}
            />
            <StyledSelectField
              label="Timezone of event"
              name="timeZone"
              options={timeZoneOptions}
            />
          </FieldRow>
          <FieldRow>
            <StyledSelectField
              required
              label="Company hosting the event"
              name="hostCompany"
              options={legalEntityOptions}
            />
            <ButtonContainer>
              <TextButton type="button">Add host company</TextButton>
            </ButtonContainer>
          </FieldRow>
          <FieldRow>
            <StyledSelectField
              label="Country of event"
              name="countryId"
              options={countryOptions}
            />
            <StyledInputField label="Tax number" name="taxNumber" />
          </FieldRow>
          <FieldRow>
            <StyledInputField
              label="Base event URL"
              name="baseUrl"
              placeholder="https://example.com"
            />
            <StyledInputField
              required
              label="Event slug"
              name="slug"
              placeholder="example-slug"
              validate={(slug) => {
                if (slug !== eventInfo?.slug) {
                  getExistingEvent({
                    variables: { slug },
                  });
                }
              }}
            />
          </FieldRow>
          {existingEventData?.event && (
            <ExistingSlugErrorMessage>
              Chosen slug already exists
            </ExistingSlugErrorMessage>
          )}
          <ButtonsContainer>
            <SecondaryButton type="button" onClick={() => resetForm()}>
              Cancel
            </SecondaryButton>
            <Button disabled={!values.name || !values.slug} type="submit">
              Save changes
            </Button>
          </ButtonsContainer>
        </Form>
      )}
    </Formik>
  );
};

export default EventInformationForm;
