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
    RoomChatConfig: ['RoomChatConfigPubnub'],
    RoomModerationConfig: ['RoomModerationConfigPubnub'],
    RoomPubnubConfig: [
      'RoomChatConfigPubnub',
      'RoomModerationConfigPubnub',
      'RoomQuestionsConfigPubnub',
      'RoomReactionsConfigPubnub',
    ],
    RoomQuestionsConfig: ['RoomQuestionsConfigPubnub'],
    RoomReactionsConfig: ['RoomReactionsConfigPubnub'],
    RoomVideoCallConfig: ['RoomVideoCallConfigVonage'],
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
      'ComponentWebLayoutsStoresTicketSalesPage',
      'ComponentWebLayoutsStoresTicketApplicationsPage',
    ],
  },
};
export default result;
