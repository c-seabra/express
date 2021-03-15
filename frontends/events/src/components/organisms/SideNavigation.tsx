import ContainerCard from '@websummit/components/src/molecules/ContainerCard';
import React from 'react';
import styled from 'styled-components';

const StyledContainerCard = styled(ContainerCard)`
  width: 300px;
  max-width: 300px;
`;

const StyledList = styled.ul`
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

const ListText = styled.span`
  color: #0c1439;
  font-size: 16px;
  //font-weight: 600; // TODO add variant for selected
  letter-spacing: 0;
  line-height: 24px;
`;

const SideNavigation = () => {
  return (
    <>
      <StyledContainerCard noPadding>
        <StyledList>
          <li>
            <ListText>Event information</ListText>
          </li>
          <li>
            <ListText>Tax information</ListText>
          </li>
          <li>
            <ListText>Payment methods</ListText>
          </li>
          <li>
            <ListText>Billing & invoicing</ListText>
          </li>
        </StyledList>
      </StyledContainerCard>
    </>
  );
};

export default SideNavigation;
