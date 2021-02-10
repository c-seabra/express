import styled from 'styled-components'

export const PageContainer = styled.section`
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  font-size: 16px;
`

export const PermissionForm = styled.form`
  input[type='number'] {
    width: 3em;
  }
  button {
    margin-right: 1rem;
  }
`

export const StripedTable = styled.table`
  --bs-table-bg: transparent;
  --bs-table-striped-color: #212529;
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-hover-color: #212529;
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  vertical-align: top;
  border-color: #dee2e6;
  border-collapse: collapse;
  caption-side: top;
  text-align: left;

  > caption {
    text-align: left;
    margin-top: 1em;
  }

  > td,
  tbody,
  th,
  td,
  thead,
  tr,
  caption {
    border-color: inherit;
    border-style: solid;
    border-width: 0;
  }

  > tbody > tr:nth-of-type(2n + 1) {
    background-color: var(--bs-table-striped-bg);
    color: var(--bs-table-striped-color);
  }

  > tbody > tr:hover {
    background-color: var(--bs-table-hover-bg);
    color: var(--bs-table-hover-color);
  }

  > :not(caption) > * > * {
    padding: 0.25rem 0.25rem;
    background-color: var(--bs-table-bg);
    background-image: linear-gradient(var(--bs-table-accent-bg), var(--bs-table-accent-bg));
    border-bottom-width: 1px;
  }
`

export const SpacingBottom = styled.div`
  margin-bottom: 2.5rem;
`
