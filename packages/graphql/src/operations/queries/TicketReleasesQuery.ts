import { gql } from '@apollo/client';

const TICKETS_QUERY = gql`
  query TicketReleases($releasePhaseIds: [ID!], $ticketTypeIds: [ID!]) {
    ticketReleases(
      releasePhaseIds: $releasePhaseIds
      ticketTypeIds: $ticketTypeIds
    ) {
      edges {
        node {
          ...DisplayRelease
        }
      }
    }
  }

  fragment DisplayRelease on TicketRelease {
    id
    name
    description
    active
    soldOut
    action {
      __typename
      ... on TicketReleaseActionsTitoCheckoutAction {
        quantity
      }
      ... on TicketReleaseActionsPriceEnquiryAction {
        emailAddress
      }
      ... on TicketReleaseActionsExpiredTicketAction {
        message
        suggestedRelease {
          id
        }
      }
      ... on TicketReleaseActionsPriceAlertAction {
        dynamicForm {
          id
          schema
          uiSchema
          mutation
          data
        }
      }
    }
    price {
      ...DisplayPrice
    }
    ticketType {
      id
      accessPermissions {
        edges {
          node {
            id
            title
            detail
          }
        }
      }
    }
    source {
      __typename
      ... on TitoTicketRelease {
        url
      }
    }
  }

  fragment DisplayPrice on Price {
    __typename
    exTax {
      ...DisplayMoney
    }
    totalTax {
      ...DisplayMoney
    }
    total {
      ...DisplayMoney
    }
    taxLines {
      name
      rate
    }
  }

  fragment DisplayMoney on Money {
    format(includeUnit: false, precision: 0)
    currency {
      code
      symbol
    }
  }
`;
export default TICKETS_QUERY;
