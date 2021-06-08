import styled from 'styled-components';

export const AvatarListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;

  & li {
    margin-bottom: 1rem;
  }
`;

export const ListItem = styled.li`
  background: #fff;
  font-size: 0.9rem;
  list-style: none;
  overflow: hidden;
  padding: 0.5rem;
  margin: 1px;
  text-overflow: ellipsis;
  width: 17%;
  white-space: nowrap;

  & span {
    font-size: 0.8rem;
    font-style: italic;
  }
`;
