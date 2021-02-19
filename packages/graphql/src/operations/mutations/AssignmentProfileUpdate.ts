import { gql } from '@apollo/client';

export const ASSIGNMENT_PROFILE_UPDATE = gql`
  mutation profileUpdate($profile: AssignmentProfileUpdateInput!) {
    assignmentProfileUpdate(input: $profile) {
      successMessage
      userErrors {
        path
        message
      }
      assignee {
        email
        firstName
        lastName
        jobTitle
        companyName
        companySizeId
        industryId
        phoneNumber
        city
        marketingConsent
        personalisationConsent
        passportNumber
      }
    }
  }
`;

export default ASSIGNMENT_PROFILE_UPDATE;
