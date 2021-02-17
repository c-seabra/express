import { gql } from '@apollo/client';

const EVENT_DATA = gql`
  query taEventData($slug: String!) {
    taEvent(slug: $slug) {
      id
      slug
      name
      industries
      companySizes
      passportRequired
    }
  }
`;

export default EVENT_DATA;
