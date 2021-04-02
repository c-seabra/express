import { Button } from '@websummit/components/src/atoms/Button';
import SearchInput from '@websummit/components/src/molecules/SearchInput';
import React from 'react';
import styled from 'styled-components';

import PageContainer from '../../lib/components/templates/PageContainer';
import NoTicketGroupsPlaceholder from '../../lib/images/no-ticket-groups-placeholder.png';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #0c1439;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSearchInput = styled(SearchInput)`
  width: 400px;
  margin-right: 3rem;
`;

const Placeholder = styled.img`
  max-width: 1440px;
`;

const TicketGroupsPage = () => {
  return (
    <PageContainer>
      <HeaderContainer>
        <Title>Ticket groups</Title>
        <SearchBar>
          <StyledSearchInput placeholder="Search ticket groups" />
          <Button>Create new ticket group</Button>
        </SearchBar>
      </HeaderContainer>

      <Placeholder
        alt="no ticket types placeholder"
        src={NoTicketGroupsPlaceholder}
      />
    </PageContainer>
  );
};

export default TicketGroupsPage;
