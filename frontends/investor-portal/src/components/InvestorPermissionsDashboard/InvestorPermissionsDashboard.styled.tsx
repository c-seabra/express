import styled from 'styled-components';

export const BreadcrumbsContainer = styled.div`
  display: flex;
  margin: 20px 0 4px;
`;

export const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;

export const Column = styled(ColumnStyles)`
  width: 25%;
`;

export const PageContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`;

export const PermissionForm = styled.form`
  button {
    margin-right: 1rem;
  }
`;

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`;
