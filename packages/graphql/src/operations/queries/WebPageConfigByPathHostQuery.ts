import { gql } from '@apollo/client';

const WEBPAGE_CONFIG_QUERY = gql`
  query webPageConfigByPathHost($path: String!, $host: String!) {
    webPageConfigByPathHost(path: $path, host: $host) {
      site {
        title
      }
      config {
        baseGoogleAnalyticsTrackingId
        googleAnalyticsTrackingId
        googleTagManagerId
        googleAnalyticsLinkerDomains {
          domain
        }
        metaData {
          image {
            url: absoluteUrl
          }
          siteTitle
          siteDescription
          facebookId
          facebookPublisher
          twitterId
          twitterCreator
        }
      }
      branding {
        googleFontsUrl
        theme
        logo {
          id
          absoluteUrl
          alternativeText
        }
        headerBranding {
          id
          absoluteUrl
          alternativeText
        }
        favicon {
          id
          absoluteUrl
        }
        ticketLogo {
          id
          absoluteUrl
          alternativeText
        }
      }
    }
  }
`;
export default WEBPAGE_CONFIG_QUERY;
