import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import React from 'react';
import styled from 'styled-components';

const StyledContainerCard = styled(ContainerCard)`
  width: 300px;
  max-width: 300px;
`;

const StyledListElement = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    padding: 14px 17px 13px 25px;
    cursor: pointer;
    border-bottom: 1px solid #dbdfe6;

    &:hover {
      background-color: #e9e6e6;
    }
  }

  li:last-child {
    border-bottom: transparent;
  }
`;

const SideNavigation = () => {
  return (
    <>
      <StyledContainerCard noPadding>
        <StyledListElement>
          <li>Event information</li>
          <li>Tax information</li>
          <li>Payment methods</li>
          <li>Billing & invoicing</li>
        </StyledListElement>
      </StyledContainerCard>
    </>
  );
};

export default SideNavigation;
