import { gql } from '@apollo/client';

export const APPEARANCE_UPDATE_MUTATION = gql`
  mutation AppearanceUpdate($id: UUID!, $isSponsor: Boolean!) {
    appearanceUpdate(input: { id: $id, isSponsor: $isSponsor }) {
      appearance {
        id
        company {
          name
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
