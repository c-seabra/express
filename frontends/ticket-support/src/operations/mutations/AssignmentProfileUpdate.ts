import { gql } from '@apollo/client'

const ASSIGNMENT_PROFILE_ADMIN_UPDATE = gql`
  mutation profileAdminUpdate($profile: AssignmentProfileAdminUpdateInput!) {
    assignmentProfileAdminUpdate(input: $profile) {
      successMessage
      userErrors {
        path
        message
      }
      profile {
        email
        firstName
        lastName
        jobTitle
        companyName
        companySizeId
        industryId
        phoneNumber
        city

        passportNumber
      }
    }
  }
`

export default ASSIGNMENT_PROFILE_ADMIN_UPDATE
