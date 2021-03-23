import { gql } from '@apollo/client';

const TIME_ZONES = gql`
  query TimeZones {
    timeZones {
      edges {
        node {
          displayName
          ianaName
        }
      }
    }
  }
`;

export default TIME_ZONES;
