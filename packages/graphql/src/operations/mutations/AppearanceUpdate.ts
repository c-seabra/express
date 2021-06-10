import { gql } from '@apollo/client';

export const APPEARANCE_UPDATE_MUTATION = gql`
  mutation AppearanceUpdate(
    $id: UUID!
    $isSponsor: Boolean!
    $privacyPolicyUrl: String
  ) {
    appearanceUpdate(
      input: {
        id: $id
        isSponsor: $isSponsor
        privacyPolicyUrl: $privacyPolicyUrl
      }
    ) {
      appearance {
        id
        company {
          name
          privacyPolicyUrl
        }
      }
      errors {
        message
        path
      }
    }
  }
`;

export default APPEARANCE_UPDATE_MUTATION;
