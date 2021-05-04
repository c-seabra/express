import { gql } from '@apollo/client';

export default gql`
  query EventTimeZone($slug: String) {
    event(slug: $slug) {
      timeZone {
        displayName
        ianaName
        utcOffset
      }
    }
  }
`;
