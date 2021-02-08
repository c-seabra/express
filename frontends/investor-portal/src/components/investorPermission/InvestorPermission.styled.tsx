import styled from 'styled-components'

export const PermissionForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  & > div {
    width: 100%;
    margin-bottom: 10px;
  }
`

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
  > button {
    margin-right: 6px;
  }
  > ul {
    list-style: none;
  }
  > li {
    line-height: 1.5em;
  }
  .valid::before {
    content: '✅ ';
  }
  .invalid:before {
    content: '🔴 ';
  }
`
