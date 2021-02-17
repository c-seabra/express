import styled from 'styled-components';

const ColumnStyles = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  word-break: break-word;
`;

const Column = styled(ColumnStyles)`
  width: 25%;
`;

export default Column;
