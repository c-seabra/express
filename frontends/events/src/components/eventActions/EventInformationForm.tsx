import {
  Button,
  SecondaryButton,
  TextButton,
} from '@websummit/components/src/atoms/Button';
import { useModalState } from '@websummit/components/src/molecules/Modal';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
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
  useTimeZonesQuery,
} from '@websummit/graphql/src/@types/operations';
import EVENT from '@websummit/graphql/src/operations/queries/Event';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import * as Yup from 'yup';

import { useAppContext } from '../app/AppContext';
import LegalEntityCreateModalWrapper from '../modals/LegalEntityCreateModalWrapper';

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

const EventInfoContainer = styled.div`
  margin: -1rem -1.8rem -2.8rem;
`;

const PaddedContainer = styled.div`
  padding: 1.2rem 1.8rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 3px solid #f1f1f1;
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
  margin-top: 1rem;

  & > ${SecondaryButton} {
    margin-right: 1rem;
  }
`;

const ExistingSlugErrorMessage = styled.div`
  color: #e15554;
  font-size: 12px;
  margin-top: -1.2rem;
`;

const SLUG_CHAR_LIMIT = 12;
const eventInformationSchema = Yup.object().shape({
  baseUrl: Yup.string().url('URL must be valid'),
  endDate: Yup.date().when('startDate', (st: any, schema: any) => {
    return schema.min(st);
  }),
  name: Yup.string().required('Name is required'),
  slug: Yup.string().max(SLUG_CHAR_LIMIT).required('Event slug is required'),

  // TODO: fix cyclical dependency of start and end fields
  // startDate: Yup.date().when('endDate', (st: any, schema: any) => {
  //   return schema.max(st);
  // }),
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
  legalEntities: Pick<LegalEntity, 'name' | 'id'>[] = [],
) => [
  emptyOption,
  ...legalEntities.map((legalEntity) => ({
    label: legalEntity.name,
    value: legalEntity.id,
  })),
];

const getTimeZoneOptions = (
  timeZones:
    | ({ __typename?: 'TimeZone' } & Pick<
        TimeZone,
        'displayName' | 'ianaName' | 'utcOffset'
      >)[]
    | undefined = [],
) => [
  emptyOption,
  ...timeZones.map((timeZone) => ({
    label: `UTC${timeZone.utcOffset} - ${timeZone.displayName}`,
    value: timeZone.ianaName,
  })),
];

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
        | 'baseUrl'
        | 'currency'
        | 'taxNumber'
      > & {
        country: Pick<EventConfigurationCountry, 'id' | 'name'> | null;
      } & {
        legalEntity: Pick<LegalEntity, 'id' | 'name'> | null;
      } & {
        timeZone: Pick<TimeZone, 'ianaName' | 'displayName'> | null;
      })
    | null;
  refetch: () => void;
  slugParam: string;
};

const EventInformationForm = ({
  eventInfo,
  refetch,
  slugParam,
}: EventInformationFormProps) => {
  const { token } = useAppContext();
  const context = { token };
  const history = useHistory();
  const {
    openModal: openAddHostModal,
    isOpen: isAddHostModalOpen,
    closeModal: closeAddHostModal,
  } = useModalState();

  const { success, error } = useSnackbars();

  const { data: countriesData } = useCountriesQuery();
  const { data: legalEntitiesData } = useLegalEntitiesQuery({
    context,
  });
  const { data: timeZonesData } = useTimeZonesQuery({ context });

  const [getExistingEvent, { data: existingEventData }] = useEventLazyQuery({
    context,
  });

  const mappedCountries = countriesData?.countries?.edges?.map(
    (edge) => edge.node,
  );
  const sortedCountries = mappedCountries?.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  const countryOptions = getCountryOptions(sortedCountries);

  const legalEntityOptions = getLegalEntityOptions(
    legalEntitiesData?.legalEntities?.edges?.map((edge) => edge.node),
  );

  const mappedTimeZones = timeZonesData?.timeZones?.edges?.map(
    (edge) => edge.node,
  );
  const sortedTimeZones = mappedTimeZones?.sort((a, b) => {
    return a.utcOffset.localeCompare(b.utcOffset);
  });
  const timeZoneOptions = getTimeZoneOptions(sortedTimeZones);

  const [createEvent] = useEventCreateMutation({
    context: { token },
    onCompleted: ({ eventCreate }) => {
      if (eventCreate?.userErrors && eventCreate?.userErrors.length > 0) {
        error(eventCreate?.userErrors[0].message);
      } else {
        success(`Event created`);
      }
    },
    onError: (e) => error(e.message),
  });

  const [updateEvent] = useEventUpdateMutation({
    context,
    onCompleted: ({ eventUpdate }) => {
      if (eventUpdate?.userErrors && eventUpdate?.userErrors.length > 0) {
        error(eventUpdate?.userErrors[0].message);
      } else {
        success(`Event updated`);
      }
    },
    onError: (e) => error(e.message),
    refetchQueries: [
      {
        context,
        query: EVENT,
        variables: { slug: eventInfo?.slug },
      },
    ],
  });

  return (
    <EventInfoContainer>
      <Formik
        enableReinitialize
        initialValues={{
          baseUrl: eventInfo?.baseUrl,
          countryId: eventInfo?.country?.id,
          currency: eventInfo?.currency,
          description: eventInfo?.description,
          endDate: eventInfo?.endDate,
          legalEntityId: eventInfo?.legalEntity?.id,
          name: eventInfo?.name || '',
          slug: eventInfo?.slug || '',
          startDate: eventInfo?.startDate,
          taxNumber: eventInfo?.taxNumber,
          timezone: eventInfo?.timeZone?.ianaName,
        }}
        validationSchema={eventInformationSchema}
        onSubmit={async (values) => {
          if (eventInfo?.id) {
            await updateEvent({
              variables: { input: { ...values } },
            });
          } else {
            const { data: mutationResult, errors } = await createEvent({
              variables: { event: values },
            });

            if (!errors) {
              const newEventSlug = mutationResult?.eventCreate?.event?.slug;
              history.replace(`${newEventSlug || ''}/settings`);
              refetch();
            }
          }
        }}
      >
        {({ resetForm, values }) => (
          <Form>
            <LegalEntityCreateModalWrapper
              closeModal={closeAddHostModal}
              isOpen={isAddHostModalOpen}
            />
            <PaddedContainer>
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
            </PaddedContainer>
            <Separator />
            <PaddedContainer>
              <TextAreaField
                fieldHeight="80px"
                label="Event description"
                name="description"
              />
              <FieldRow>
                <StyledSelectField
                  required
                  label="Currency of event"
                  name="currency"
                  options={currencyOptions}
                />
                <StyledSelectField
                  label="Timezone of event"
                  name="timezone"
                  options={timeZoneOptions}
                />
              </FieldRow>
              <FieldRow>
                <StyledSelectField
                  required
                  label="Company hosting the event"
                  name="legalEntityId"
                  options={legalEntityOptions}
                />
                <ButtonContainer>
                  <TextButton type="button" onClick={openAddHostModal}>
                    Add host company
                  </TextButton>
                </ButtonContainer>
              </FieldRow>
              <FieldRow>
                <StyledSelectField
                  label="Country of event (leave blank for online events)"
                  name="countryId"
                  options={countryOptions}
                />
                <StyledInputField label="Tax number" name="taxNumber" />
              </FieldRow>
              <FieldRow>
                <StyledInputField
                  required
                  label="Event slug"
                  name="slug"
                  placeholder="example-slug"
                  validate={(slug) => {
                    // We are checking whether the entered slug is
                    // different from the one in params
                    if (slug && !slugParam && slug !== slugParam) {
                      getExistingEvent({
                        variables: { slug },
                      });
                    }
                  }}
                />
                <StyledInputField
                  label="Base event URL"
                  name="baseUrl"
                  placeholder="https://example.com"
                />
              </FieldRow>
              {existingEventData?.event &&
                existingEventData?.event?.slug !== slugParam && (
                  <ExistingSlugErrorMessage>
                    Chosen slug already exists
                  </ExistingSlugErrorMessage>
                )}
            </PaddedContainer>
            <Separator />
            <PaddedContainer>
              <ButtonsContainer>
                <SecondaryButton type="button" onClick={() => resetForm()}>
                  Cancel
                </SecondaryButton>
                <Button disabled={!values.name || !values.slug} type="submit">
                  Save changes
                </Button>
              </ButtonsContainer>
            </PaddedContainer>
          </Form>
        )}
      </Formik>
    </EventInfoContainer>
  );
};

export default EventInformationForm;
