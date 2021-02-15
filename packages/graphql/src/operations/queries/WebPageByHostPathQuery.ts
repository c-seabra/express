import { gql } from '@apollo/client';

const WEBPAGE_HOST_PATH_QUERY = gql`
  query WebPageByHostPath($host: String!, $path: String!) {
    webPageByHostPath(path: $path, host: $host) {
      id
      title
      seoTags {
        defaultImage {
          id
          url
        }
        title
        slug
        description
        twitterTitle
        twitterDescription
        twitterImage {
          id
          url
        }
        facebookTitle
        facebookImage {
          id
          url
        }
        facebookDescription
      }
      content {
        __typename
        ... on ComponentWebLayoutsTicketSalesPage {
          ...TicketSalesPageLayout
        }
        ... on ComponentWebLayoutsTicketApplicationsPage {
          ...TicketApplicationsPageLayout
        }
        ... on ComponentWebElementsShowcaseGrid {
          ...ShowcaseGrid
        }
        ... on ComponentWebElementsScheduleSearchSidebarFilters {
          ...ScheduleSearchSidebarFilters
        }
        ... on ComponentWebElementsAttendeeSearchSidebarFilters {
          ...AttendeeSearchSidebarFilters
        }
        ... on ComponentWebElementsCompanySearchSidebarFilters {
          ...CompanySearchSidebarFilters
        }
        ... on ComponentWebElementsHeroSection {
          ...HeroSection
        }
      }
    }
  }

  fragment TicketSalesPageLayout on ComponentWebLayoutsTicketSalesPage {
    id
    ticketCategory {
      id
      name
    }
    ticketReleasesPanel {
      ...TicketReleasesPanel
    }
    priceIncreaseCountdownTimer {
      ticketType {
        id
      }
    }
    releasePhaseStepper {
      ticketType {
        id
      }
    }
    categoriesMenu {
      ...TabularMenu
    }
    promotions {
      id
      label
      color
      ticketType {
        id
      }
      type
    }
  }

  fragment TicketApplicationsPageLayout on ComponentWebLayoutsTicketApplicationsPage {
    id
    title
    description
    applicationForm {
      ...ApplicationForm
    }
    applicationOverviewPanel {
      ...ApplicationOverviewPanel
    }
    ticketInfoPanel {
      ...TicketInfoPanel
    }
    categoriesMenu {
      ...TabularMenu
    }
    priceIncreaseCountdownTimer {
      ticketType {
        id
      }
    }
    releasePhaseStepper {
      ticketType {
        id
      }
    }
  }

  fragment TicketInfoPanel on ComponentWebElementsTicketTypeInformation {
    ticketType {
      ...TicketType
    }
    heading
    showBenefits
    displayPriceIncludingTax
  }

  fragment TicketReleasesPanel on ComponentWebElementsTicketReleasesPanel {
    displayPriceIncludingTax
  }

  fragment TicketType on TicketType {
    id
    name
  }

  fragment TabularMenu on Menu {
    menuItems {
      label
      link {
        __typename
        ... on ComponentWebLinksUrlLink {
          ...UrlLink
        }
        ... on ComponentWebLinksPageLink {
          ...PageLink
        }
      }
    }
  }

  fragment UrlLink on ComponentWebLinksUrlLink {
    target
    url
  }

  fragment PageLink on ComponentWebLinksPageLink {
    page {
      path
    }
  }

  fragment ApplicationForm on Form {
    id
    dynamicForm {
      id
      schema
      uiSchema
      data
      mutation
    }
    contentBefore
  }

  fragment ApplicationOverviewPanel on ComponentWebElementsTicketApplicationOverviewPanel {
    id
    title
    description
    imageUrl
    altImageText
  }

  fragment ShowcaseGrid on ComponentWebElementsShowcaseGrid {
    id
    contentBefore
    backgroundColor
    collection {
      elements {
        id
        title
        image {
          absoluteUrl
        }
      }
    }
  }

  fragment ScheduleSearchSidebarFilters on ComponentWebElementsScheduleSearchSidebarFilters {
    id
    apiKey
    indexName
    refinements {
      attribute
      defaults
      variant
      title
      refinementItemsLimit
    }
  }

  fragment AttendeeSearchSidebarFilters on ComponentWebElementsAttendeeSearchSidebarFilters {
    id
    apiKey
    indexName
    refinements {
      attribute
      defaults
      variant
      title
      refinementItemsLimit
    }
  }

  fragment CompanySearchSidebarFilters on ComponentWebElementsCompanySearchSidebarFilters {
    id
    apiKey
    indexName
    refinements {
      attribute
      defaults
      variant
      title
      refinementItemsLimit
    }
  }

  fragment HeroSection on ComponentWebElementsHeroSection {
    id
    variant
    backgroundImage {
      url: absoluteUrl
    }
    ctaLink {
      text
      url
    }
    backgroundImageAlt
    backgroundImageDescription
    brandImage {
      url: absoluteUrl
    }
    subtitle
    title
  }
`;
export default WEBPAGE_HOST_PATH_QUERY;
