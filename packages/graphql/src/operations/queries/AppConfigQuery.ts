import { gql } from '@apollo/client';

export const APP_CONFIG_QUERY = gql`
  query AppConfig {
    appConfig {
      googleAnalyticsTrackingId
      googleTagManagerId
      googleAnalyticsLinkerDomains {
        domain
      }
      googleFontsUrl
      theme
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
  }
`;

export default APP_CONFIG_QUERY;
