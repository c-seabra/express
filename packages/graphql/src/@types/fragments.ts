export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    ConnectionEntity: ['Appearance', 'Attendee'],
    MenuItemLinkDynamicZone: [
      'ComponentWebLinksPageLink',
      'ComponentWebLinksUrlLink',
      'ComponentWebLinksSubMenu',
    ],
    SourceTicketReleaseUnion: ['TitoTicketRelease'],
    TicketReleaseAction: [
      'TicketReleaseActionsExpiredTicketAction',
      'TicketReleaseActionsPriceAlertAction',
      'TicketReleaseActionsPriceEnquiryAction',
      'TicketReleaseActionsTitoCheckoutAction',
    ],
    WebPageContentDynamicZone: [
      'ComponentWebLayoutsTicketSalesPage',
      'ComponentWebLayoutsTicketApplicationsPage',
      'ComponentWebElementsShowcaseGrid',
      'ComponentWebElementsScheduleSearchSidebarFilters',
      'ComponentWebElementsCompanySearchSidebarFilters',
      'ComponentWebElementsAttendeeSearchSidebarFilters',
      'ComponentWebElementsHeroSection',
      'ComponentWebElementsFreshchat',
    ],
  },
};
export default result;
