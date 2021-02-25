import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';

import { EVENT_CREATE_MUTATION } from '../../operations/mutations/EventCreate';
import { useAppContext } from '../app/AppContext';
import Field from './Field';
import Warning from './Warning';

const Row = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  margin: 0.5rem 0 0.5rem 0;
  border-radius: 8px;
  border: none;
  border: 1px solid grey;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const EventCreate: React.FC<{}> = () => {
  const { conferenceSlug, token } = useAppContext();
  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [taxNumber, setTaxNumber] = useState<string | undefined>();
  const [slug, setSlug] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [currency, setCurrency] = useState<string | undefined>();
  const [countryId, setCountryId] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const createEvent = () => {
    if (name) {
      eventCreateMutation();
    }
  };

  const [eventCreateMutation] = useMutation(EVENT_CREATE_MUTATION, {
    context: {
      slug: conferenceSlug,
      token,
    },
    onCompleted: ({ eventCreate }) => {
      if (eventCreate?.event?.id) {
        setError('');
      }
      if (eventCreate?.userErrors.length) {
        setError(eventCreate.userErrors[0]?.message);
      }
    },
    refetchQueries: ['EventListQuery'],
    variables: {
      countryId,
      currency,
      description,
      endDate,
      name,
      slug,
      startDate,
      taxNumber,
    },
  });

  return (
    <div>
      {error && <Warning>{error}</Warning>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createEvent();
        }}
      >
        <Row>
          <Field required fieldName="name" label="Name" onChange={setName} />
          <Field
            fieldName="description"
            label="Description"
            onChange={setDescription}
          />
          <Field fieldName="slug" label="Slug" onChange={setSlug} />
          <Field
            fieldName="taxNumber"
            label="Tax number"
            onChange={setTaxNumber}
          />
        </Row>

        <Row>
          <Field fieldName="currency" label="Currency" onChange={setCurrency} />
          <Field
            fieldName="startDate"
            label="Start Date"
            onChange={setStartDate}
          />
          <Field fieldName="endDate" label="End Date" onChange={setEndDate} />
          <Field
            fieldName="countryId"
            label="Country"
            onChange={setCountryId}
          />
        </Row>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </div>
  );
};

export default EventCreate;
