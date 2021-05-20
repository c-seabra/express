import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import {
  Appearance,
  Company,
  useAppearanceUpdateMutation,
  useEventAppearancesQuery,
  useEventQuery,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';

import { useAppContext } from '../app/AppContext';
import { emptyOption } from './EventInformationForm';

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;

  & > ${SecondaryButton} {
    margin-right: 1rem;
  }
`;

const EventSponsorContainer = styled.div`
  margin: 2rem -1.8rem -2.8rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  border-top: 3px solid #f1f1f1;
`;

const PaddedContainer = styled.div`
  padding: 1.2rem 1.8rem;
`;

const EventSponsor = ({ eventSlug }: { eventSlug: string | undefined }) => {
  const { success, error } = useSnackbars();
  const { token } = useAppContext();

  const getSponsorOptions = (
    appearances:
      | ({ __typename?: 'Appearance' } & Pick<Appearance, 'id'> & {
            company: Pick<Company, 'name'> | null;
          })[]
      | undefined = [],
  ) => [
    emptyOption,
    ...appearances.map((appearance) => ({
      label: appearance?.company?.name,
      value: appearance.id,
    })),
  ];

  const { data } = useEventQuery({
    context: { token },
    onError: (e) => error(e.message),
    variables: {
      slug: eventSlug,
    },
  });

  const { data: eventAppearancesData } = useEventAppearancesQuery({
    context: { token },
    onError: (e) => error(e.message),
    variables: {
      slug: eventSlug,
    },
  });

  const mappedSponsors = eventAppearancesData?.event?.appearances?.edges?.map(
    (edge) => edge.node,
  );
  const sponsorOptions = getSponsorOptions(mappedSponsors);

  const [updateEventSponsor] = useAppearanceUpdateMutation({
    context: { token },
    onCompleted: () => success('Event sponsor updated'),
    onError: (e: { message: string }) => error(e.message),
    refetchQueries: ['Event'],
  });

  return (
    <EventSponsorContainer>
      <Formik
        enableReinitialize
        initialValues={{ eventSponsor: data?.event?.sponsor?.id }}
        onSubmit={async (values) => {
          await updateEventSponsor({
            variables: { id: values.eventSponsor, isSponsor: true },
          });
        }}
      >
        {({ resetForm }) => (
          <Form>
            <PaddedContainer>
              <SelectField
                label="Event Sponsor"
                name="eventSponsor"
                options={sponsorOptions}
              />
            </PaddedContainer>
            <Separator />
            <PaddedContainer>
              <ButtonsContainer>
                <SecondaryButton type="button" onClick={() => resetForm()}>
                  Cancel
                </SecondaryButton>
                <Button type="submit">Save changes</Button>
              </ButtonsContainer>
            </PaddedContainer>
          </Form>
        )}
      </Formik>
    </EventSponsorContainer>
  );
};

export default EventSponsor;
