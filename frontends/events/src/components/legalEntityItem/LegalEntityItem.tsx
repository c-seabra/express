import React from 'react';
import styled from 'styled-components';

import { Address } from '../../lib/types';

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

export const LegalEntityListHeader = () => {
  return (
    <ListHeaderItem>
      <Column>Name</Column>
      <Column>Reg Number</Column>
      <Column>Website</Column>
      <Column>Tax number</Column>
      <Column>Email</Column>
      <Column>Address</Column>
    </ListHeaderItem>
  );
};

const LegalEntityItem = ({
  name,
  regNumber,
  website,
  taxNumber,
  email,
  address,
}: {
  address?: Address;
  email?: string;
  name: string;
  regNumber?: string;
  taxNumber?: string;
  website?: string;
}) => {
  return (
    <StyledListItem>
      <Column>{name}</Column>
      <Column>{regNumber}</Column>
      <Column>{website}</Column>
      <Column>{taxNumber}</Column>
      <Column>{email}</Column>
      <div>
        {address?.lineOne}, {address?.lineTwo}, {address?.region},{' '}
        {address?.city}, {address?.postalCode}, {address?.country?.name}
      </div>
    </StyledListItem>
  );
};

export default LegalEntityItem;
