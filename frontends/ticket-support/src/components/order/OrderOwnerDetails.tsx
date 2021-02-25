import React, { ReactElement } from 'react';
import styled from 'styled-components';

import ContainerCard from '../../lib/components/atoms/ContainerCard';
import LabeledInput from '../../lib/components/molecules/LabeledInput';

type OrderOwnerDetailsProps = {
  email?: string;
  firstName?: string;
  lastName?: string;
};

const OwnerDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  & > div {
    min-width: 30%;
    margin-bottom: 8px;
  }
`;

const OrderOwnerDetails = ({
  firstName,
  lastName,
  email,
}: OrderOwnerDetailsProps): ReactElement => {
  return (
    <ContainerCard title="Owner details">
      <OwnerDetails>
        <LabeledInput disabled label="First name" value={firstName} />
        <LabeledInput disabled label="Last name" value={lastName} />
        <LabeledInput disabled label="Email" value={email} />
      </OwnerDetails>
    </ContainerCard>
  );
};

export default OrderOwnerDetails;
