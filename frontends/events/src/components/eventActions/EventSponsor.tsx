import {
  Button,
  SecondaryButton,
} from '@websummit/components/src/atoms/Button';
import SelectField from '@websummit/components/src/molecules/SelectField';
import { useSnackbars } from '@websummit/components/src/molecules/Snackbar';
import TextInputField from '@websummit/components/src/molecules/TextInputField';
import {
  Appearance,
  Company,
  useAppearanceUpdateMutation,
  useEventPartnersQuery,
  useEventQuery,
} from '@websummit/graphql/src/@types/operations';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
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

const Header = styled.div`
  color: #0c1439;
  font-weight: 500;
  font-size: 24px;
  padding: 1.2rem 0rem;
`;

const SubHeader = styled.div`
  color: #0c1439;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
`;

const PaddedContainer = styled.div`
  padding: 1.2rem 1.8rem;
`;

const EventSponsor = ({ eventSlug }: { eventSlug: string | undefined }) => {
  const { success, error } = useSnackbars();
  const { token } = useAppContext();

  const getSponsorOptions = (
    partners:
      | ({ __typename?: 'Appearance' } & Pick<Appearance, 'id'> & {
            company: Pick<Company, 'name'> | null;
          })[]
      | undefined = [],
  ) => [
    emptyOption,
    ...partners.map((partner) => ({
      label: partner?.company?.name,
      value: partner.id,
    })),
  ];

  const { data } = useEventQuery({
    context: { token },
    onError: (e) => error(e.message),
    variables: {
      slug: eventSlug,
    },
  });

  const { data: eventPartnersData } = useEventPartnersQuery({
    context: { token },
    onError: (e) => error(e.message),
    variables: {
      slug: eventSlug,
    },
  });
  const mappedSponsors = eventPartnersData?.event?.partners?.edges?.map(
    (edge) => edge.node,
  );
  const sponsorOptions = getSponsorOptions(mappedSponsors);

  const [updateEventSponsor] = useAppearanceUpdateMutation({
    context: { token },
    onCompleted: () => success('Event sponsor updated'),
    onError: (e: { message: string }) => error(e.message),
    refetchQueries: ['Event'],
  });

  const [sponsorId, setSponsorId] = useState(data?.event?.sponsor?.id);
  const [sponsorPrivacyPolicyURL, setSponsorPrivacyPolicyURL] = useState(
    data?.event?.sponsor?.company?.privacyPolicyUrl,
  );
  const updateSponsorPrivacyPolicyUrl = (event: any) => {
    const targetSponsorId = event.target.value;
    const sponsor = mappedSponsors?.filter(
      (element) => element.id === targetSponsorId,
    )[0];
    const privacyPolicyUrl = sponsor?.company?.privacyPolicyUrl;

    setSponsorId(sponsor?.id);
    setSponsorPrivacyPolicyURL(privacyPolicyUrl || '');
  };

  return (
    <EventSponsorContainer>
      <Formik
        enableReinitialize
        initialValues={{
          eventSponsor: sponsorId,
          privacyPolicyUrl: sponsorPrivacyPolicyURL,
        }}
        onSubmit={async (values) => {
          await updateEventSponsor({
            variables: {
              id: values.eventSponsor,
              isSponsor: true,
              privacyPolicyUrl: values.privacyPolicyUrl,
            },
          });
        }}
      >
        {({ resetForm }) => (
          <Form>
            <PaddedContainer>
              <Header>Event Sponsorship</Header>
              <SubHeader>
                This section is only applicable for partner sponsored events.
              </SubHeader>
            </PaddedContainer>
            <PaddedContainer>
              <SelectField
                label="Event sponsor name"
                name="eventSponsor"
                options={sponsorOptions}
                onChange={updateSponsorPrivacyPolicyUrl}
              />
              <TextInputField
                label="Sponsor privacy policy URL"
                name="privacyPolicyUrl"
              />
            </PaddedContainer>
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
