import styled from 'styled-components';

export const PageContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`;

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`;

export const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`;

export const StyledNoticeContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 1rem;
`;

export const ParticipationCreatePanel = styled.form`
  width: 100%;
`;

export const FormArea = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    width: 33.3%
  }

  & .full-width {
    margin-top: 10px;
    width: 100%;
  }
`;

export const StyledHeading = styled.h5`
  font-size: 1rem;
  margin: 0 0 0.25rem;
`;

export const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledListItem = styled.li`
  align-items: center;
  font-size: 1rem;
  display: flex;
  padding: 0.35rem 0;
`;

export const StyledSpan = styled.span`
  font-size: 0.75rem;
  font-style: italic;
  padding-left: 0.5rem;
`;
