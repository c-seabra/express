import React from 'react';
import styled from 'styled-components';

import { Currency } from '../../lib/types';

const ColumnStyles = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;
const Column = styled(ColumnStyles)`
  width: 10%;
`;

const StyledListItem = styled.li`
  font-size: 0.85rem;
  display: flex;
  padding: 1rem 1.5rem;
  background-color: white;
  color: #0c1439;

  border-bottom: 1px solid #dde0e5;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #dde0e5;
    cursor: pointer;
  }
`;

const ListHeaderItem = styled(StyledListItem)`
  font-weight: 600;
  text-align: center;

  &:hover {
    background-color: white;
    cursor: initial;
  }
`;

export const EventListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>Name</Column>
      <Column>Slug</Column>
      <Column>Description</Column>
      <Column>Start date</Column>
      <Column>End Date</Column>
      <Column>Country</Column>
      <Column>Currency</Column>
    </ListHeaderItem>
  );
};

const EventItem = ({
  name,
  description,
  slug,
  startDate,
  endDate,
  country,
  timezone,
  currency,
  baseUrl,
}: {
  baseUrl?: string;
  country?: {
    name: string;
  };
  currency?: Currency;
  description?: string;
  endDate?: string;
  name: string;
  slug?: string;
  startDate?: string;
  timezone?: string;
}) => {
  return (
    <StyledListItem>
      <Column>{name}</Column>
      <Column>{slug}</Column>
      <Column>{description}</Column>
      <Column>{startDate}</Column>
      <Column>{endDate}</Column>
      <Column>{country?.name}</Column>
      <Column>{currency}</Column>
      <Column>{baseUrl}</Column>
    </StyledListItem>
  );
};

export default EventItem;
