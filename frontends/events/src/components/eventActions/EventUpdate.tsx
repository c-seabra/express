import { ApolloError, useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Event, StatusType } from '../../lib/types';
import { EVENT_UPDATE_MUTATION } from '../../operations/mutations/EventUpdate';
import EVENT_QUERY from '../../operations/queries/Event';
import { useAppContext } from '../app/AppContext';
import CountrySelect from '../countries/CountrySelect';
import Field from '../fields/Field';
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
  const history = useHistory();

  const [name, setName] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [taxNumber, setTaxNumber] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<string | undefined>();
  const [endDate, setEndDate] = useState<string | undefined>();
  const [currency, setCurrency] = useState<string | undefined>();
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
    if (data && !data.event) {
      history.push(`/new`);
    }
    if (!error && data && data.event) {
      const { event } = data;
      setName(event?.name);
      setDescription(event?.description);
      setTaxNumber(event?.taxNumber);
      setStartDate(event?.startDate);
      setEndDate(event?.endDate);
      if (event && event.currency) {
        setCurrency(event.currency.toString());
      }
      setCountryId(event?.country?.id);
    }
  }, [data, error, history]);

  const [eventUpdateMutation] = useMutation(EVENT_UPDATE_MUTATION, {
    context: {
      slug,
      token,
    },
    onCompleted: ({ eventUpdate }) => {
      if (eventUpdate?.userErrors.length === 0) {
        setUpdateError({
          message: `Event - ${slug.toString()} successfully updated`,
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
      <h4>Update event - {slug}</h4>
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
          <Field
            fieldName="currency"
            label="Currency"
            value={currency}
            onChange={setCurrency}
          />
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
          <CountrySelect value={countryId} onChange={setCountryId} />
        </Row>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </div>
  );
};

export default EventUpdate;
