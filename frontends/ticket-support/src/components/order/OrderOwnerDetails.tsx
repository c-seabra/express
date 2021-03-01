import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Button, SecondaryButton } from '../../lib/components/atoms/Button';
import ContainerCard from '../../lib/components/atoms/ContainerCard';
import LabeledInput from '../../lib/components/molecules/LabeledInput';
import { Spacing } from '../../lib/components/templates/Spacing';

type OrderOwnerDetailsProps = {
  editModeOn?: boolean;
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

const StyledActions = styled(Spacing)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const OrderOwnerDetails = ({
  firstName,
  lastName,
  email,
  editModeOn = false,
}: OrderOwnerDetailsProps): ReactElement => {
  return (
    // <ContainerCard title="Owner details" renderActions={(props) => <Button {...props} />}>
    <ContainerCard title="Owner details">
      <>
        <OwnerDetails>
          <LabeledInput disabled={!editModeOn} label="First name" value={firstName} />
          <LabeledInput disabled={!editModeOn} label="Last name" value={lastName} />
          <LabeledInput disabled={!editModeOn} label="Email" value={email} />
        </OwnerDetails>

        {editModeOn && (
          <StyledActions top="32px">
            <Spacing right="16px">
              <SecondaryButton onClick={() => null}>Cancel</SecondaryButton>
            </Spacing>
            <Button onClick={() => null}>Save</Button>
          </StyledActions>
        )}
      </>
    </ContainerCard>
  );
};

export default OrderOwnerDetails;
