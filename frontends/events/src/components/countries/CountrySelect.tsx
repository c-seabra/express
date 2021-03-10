import { ApolloError, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Country } from '../../lib/types';
import COUNTRIES_LIST_QUERY from '../../operations/queries/CountriesList';
import { useAppContext } from '../app/AppContext';

const StyledField = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-right: 1rem;
  margin-bottom: 0.5rem;
  input {
    cursor: pointer;
  }
  span {
    margin-bottom: 0.5rem;
  }
`;

const CountrySelect = ({
  onChange,
  required = false,
  value = undefined,
}: {
  onChange: (val: string) => void;
  required?: boolean;
  value?: string | undefined;
}) => {
  const { slug } = useParams<{ slug: string }>();
  const { token } = useAppContext();

  const {
    data,
  }: {
    data?: {
      countries: {
        edges: [
          {
            node: Country;
          },
        ];
      };
    };
    error?: ApolloError;
    loading?: boolean;
  } = useQuery(COUNTRIES_LIST_QUERY, {
    context: {
      slug,
      token,
    },
  });

  const countries = data?.countries.edges.map((node) => node.node);

  if (!countries) return null;

  return (
    <StyledField>
      <span>
        Country
        {required && '*'}
      </span>
      <select onChange={(e) => onChange(e.target.value)}>
        <option defaultChecked>Select country</option>
        {countries?.map((item, i) => (
          <option key={i} selected={item.id === value} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </StyledField>
  );
};

export default CountrySelect;
