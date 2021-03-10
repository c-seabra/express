import { ApolloError, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Currency, Event, StatusType } from '../../lib/types';
import { EVENT_UPDATE_MUTATION } from '../../operations/mutations/EventUpdate';
import EVENT_QUERY from '../../operations/queries/Event';
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

const EventUpdate: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { token } = useAppContext();

  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [taxNumber, setTaxNumber] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [currency, setCurrency] = useState<Currency | undefined>();
  const [countryId, setCountryId] = useState<string | undefined>();
  const [updateError, setUpdateError] = useState<StatusType>();

  const {
    error,
    data,
  }: {
    data?: {
      event: Event;
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(EVENT_QUERY, {
    context: {
      slug,
      token,
    },
    variables: {
      slug,
    },
  });

  useEffect(() => {
    if (!error && data && data.event) {
      const { event } = data;
      setName(event?.name);
      setDescription(event?.description);
      setTaxNumber(event?.taxNumber);
      setStartDate(event?.startDate);
      setEndDate(event?.endDate);
      setCurrency(event?.currency);
      setCountryId(event?.country?.id);
    }
  }, [data, error]);

  const [eventUpdateMutation] = useMutation(EVENT_UPDATE_MUTATION, {
    context: {
      slug,
      token,
    },
    onCompleted: ({ eventUpdate }) => {
      if (eventUpdate?.userErrors.length === 0) {
        setUpdateError({
          message: `Event - ${slug} successfully updated`,
          type: 'SUCCESS',
        });
      }
      if (eventUpdate?.userErrors.length) {
        setUpdateError({
          message: eventUpdate.userErrors[0]?.message,
          type: 'ERROR',
        });
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

  const updateEvent = () => {
    if (slug) {
      eventUpdateMutation().catch(() => {
        setUpdateError({
          message: `Unable to update event - ${slug}`,
          type: 'ERROR',
        });
      });
    }
  };

  return (
    <div>
      {updateError && <Warning>{updateError.message}</Warning>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateEvent();
        }}
      >
        <Row>
          <Field
            readOnly
            fieldName="slug"
            label="Slug"
            value={slug}
            onChange={() => undefined}
          />
          <Field
            required
            fieldName="name"
            label="Name"
            value={name}
            onChange={setName}
          />
          <Field
            fieldName="description"
            label="Description"
            value={description}
            onChange={setDescription}
          />
          <Field
            fieldName="taxNumber"
            label="Tax number"
            value={taxNumber}
            onChange={setTaxNumber}
          />
        </Row>

        <Row>
          {/* <Field fieldName="currency" label="Currency" onChange={setCurrency} /> */}
          <Field
            fieldName="startDate"
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
          />
          <Field
            fieldName="endDate"
            label="End Date"
            value={endDate}
            onChange={setEndDate}
          />
          <Field
            fieldName="countryId"
            label="Country"
            value={countryId}
            onChange={setCountryId}
          />
        </Row>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </div>
  );
};

export default EventUpdate;
