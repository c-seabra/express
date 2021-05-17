import * as Apollo from '@apollo/client';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { OperationVariables as QueryVariables } from 'apollo-client';

import { AnyJson, JsonObject } from './json';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
   */
  DateTime: string;
  JSON: AnyJson;
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
  /** A valid JSON schema for building HTML forms, see: https://react-jsonschema-form.readthedocs.io/en/latest */
  JSONSchemaForm: JsonObject;
  /** A valid email address */
  EmailAddress: string;
  /** A valid decimal */
  Decimal: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: string;
  /** A valid URL, transported as a string */
  URL: string;
  /** Valid markdown, ready for translation to HTML, JSX, etc. */
  Markdown: string;
  Date: string;
  Object: any;
  /** Input type for dynamic zone link of MenuItem */
  MenuItemLinkDynamicZoneInput: JsonObject;
  /** Input type for dynamic zone content of WebPage */
  WebPageContentDynamicZoneInput: JsonObject;
  /** The `Long` scalar type represents 52-bit integers */
  Long: number;
  /** A time string with format: HH:mm:ss.SSS */
  Time: string;
  /** The `Upload` scalar type represents a file upload. */
  Upload: JsonObject;
};

export type Query = {
  __typename?: 'Query';
  appConfig: Maybe<AppConfig>;
  branding: Maybe<Branding>;
  brandings: Maybe<Array<Maybe<Branding>>>;
  brandingsConnection: Maybe<BrandingConnection>;
  site: Maybe<Site>;
  sites: Maybe<Array<Maybe<Site>>>;
  sitesConnection: Maybe<SiteConnection>;
  webPageConfig: Maybe<WebPageConfig>;
  webPageConfigs: Maybe<Array<Maybe<WebPageConfig>>>;
  webPageConfigsConnection: Maybe<WebPageConfigConnection>;
  brandingBySlug: Maybe<Branding>;
  webPageByPath: Maybe<WebPage>;
  webPageByHostPath: Maybe<WebPage>;
  webPageConfigByPathHost: Maybe<WebPageConfig>;
  accessPermissions: AccessPermissionConnection;
  ticketCategories: TicketCategoryConnection;
  ticketRelease: Maybe<TicketRelease>;
  ticketReleasePhase: Maybe<TicketReleasePhase>;
  ticketReleasePhases: TicketReleasePhaseConnection;
  ticketReleases: TicketReleaseConnection;
  adminAttendeeProfile: Maybe<Attendee>;
  admins: AdminConnection;
  appearances: AppearanceConnection;
  attendance: Maybe<Attendee>;
  attendanceAppearanceSelection: AttendanceAppearanceSelection;
  attendances: AttendeeConnection;
  chatChannel: Maybe<ChatChannel>;
  chatChannels: Maybe<ChatChannelConnection>;
  /** @deprecated As we consider more to develop more generic APIs, the term "event" is preferrable to "conference". */
  conference: Maybe<Conference>;
  formAttendeeProfileUpdate: Maybe<DynamicForm>;
  investorSession: Maybe<InvestorSession>;
  investorSessions: Maybe<InvestorSessionConnection>;
  me: Maybe<User>;
  scheduleTimeslot: Maybe<ScheduleTimeslot>;
  topics: TopicConnection;
  userRoles: UserRoleConnection;
  /** Returns the attendee's profile */
  assignmentProfile: Maybe<AssignmentUser>;
  /** Retrieves the current users details */
  assignmentUser: Maybe<AssignmentUser>;
  /** Retrieves an order by the booking reference. ex: "xdbaWXXtqN" */
  order: Maybe<Order>;
  /**
   * Retrieves all orders.
   * Can be filtered by:
   *   - `filter`
   *   - `search_query`
   */
  orders: OrderConnection;
  /** Retrieves an event */
  taEvent: Maybe<TaEvent>;
  /** Retrieves a ticket by the booking reference. ex: "MVSD-1" */
  ticket: Maybe<Ticket>;
  ticketType: Maybe<TicketType>;
  ticketTypes: TicketTypeConnection;
  /**
   * Retrieves all the tickets.
   * Can be filtered by:
   *   - `order_id`
   *   - `filter`
   *   - `search_query`
   */
  tickets: TicketConnection;
  /** *Equivalent to GET /commerce/audit/{entity}/{id}* */
  commerceGetAuditForTypeAndTargetAuditEntry: Maybe<
    Array<Maybe<CommerceAuditEntry>>
  >;
  /** *Equivalent to GET /commerce/audit/{entity}* */
  commerceGetAuditForTypeAuditEntry: Maybe<Array<Maybe<CommerceAuditEntry>>>;
  /** *Equivalent to GET /commerce/stores/{storeId}/categories/{id}* */
  commerceGetCategory: Maybe<CommerceCategory>;
  /** *Equivalent to GET /commerce/stores/{storeId}/orders/{orderId}/customers/{id}* */
  commerceGetCustomer: Maybe<CommerceCustomer>;
  /** *Equivalent to GET /commerce/stores/{storeId}/deals/{id}* */
  commerceGetDeal: Maybe<CommerceDeal>;
  /** *Equivalent to GET /commerce/stores/{storeId}/deals/{dealId}/dealItems/{id}* */
  commerceGetDealItem: Maybe<CommerceDealItem>;
  /** *Equivalent to GET /commerce/stores/{storeId}/orders/{id}* */
  commerceGetOrder: Maybe<CommerceOrder>;
  /** *Equivalent to GET /commerce/paymentGateways/{id}* */
  commerceGetPaymentGateway: Maybe<CommercePaymentGateway>;
  /** *Equivalent to GET /commerce/stores/{storeId}/paymentMethods/{id}* */
  commerceGetPaymentMethod: Maybe<CommercePaymentMethod>;
  /** *Equivalent to GET /commerce/stores/{storeId}/products/{id}* */
  commerceGetProduct: Maybe<CommerceProduct>;
  /** *Equivalent to GET /commerce/stores/{storeId}/sales/{id}* */
  commerceGetSale: Maybe<CommerceSale>;
  /** *Equivalent to GET /commerce/stores/{storeId}/sales/{saleId}/saleProducts/{id}* */
  commerceGetSaleProduct: Maybe<CommerceSaleProduct>;
  /** *Equivalent to GET /commerce/stores/{id}* */
  commerceGetStore: Maybe<CommerceStore>;
  /** *Equivalent to GET /commerce/stores/{storeId}/tags/{id}* */
  commerceGetTag: Maybe<CommerceTag>;
  /** *Equivalent to GET /commerce/stores/{storeId}/taxes/{id}* */
  commerceGetTax: Maybe<CommerceTax>;
  /** *Equivalent to GET /commerce/stores/{storeId}/taxTypes/{id}* */
  commerceGetTaxType: Maybe<CommerceTaxType>;
  /** *Equivalent to GET /commerce/stores/{storeId}/vouchers/{id}* */
  commerceGetVoucher: Maybe<CommerceVoucher>;
  /** *Equivalent to GET /commerce/stores/{storeId}/categories* */
  commerceListCategories: Maybe<CommerceSearchResponseCategory>;
  /** *Equivalent to GET /commerce/stores/{storeId}/orders/{orderId}/customers* */
  commerceListCustomers: Maybe<CommerceSearchResponseCustomer>;
  /** *Equivalent to GET /commerce/stores/{storeId}/deals/{dealId}/dealItems* */
  commerceListDealItems: Maybe<CommerceSearchResponseDealItem>;
  /** *Equivalent to GET /commerce/stores/{storeId}/deals* */
  commerceListDeals: Maybe<CommerceSearchResponseDeal>;
  /** *Equivalent to GET /commerce/stores/{storeId}/orders* */
  commerceListOrders: Maybe<CommerceSearchResponseOrder>;
  /** *Equivalent to GET /commerce/paymentGateways* */
  commerceListPaymentGateways: Maybe<CommerceSearchResponsePaymentGateway>;
  /** *Equivalent to GET /commerce/stores/{storeId}/paymentMethods* */
  commerceListPaymentMethods: Maybe<CommerceSearchResponsePaymentMethod>;
  /** *Equivalent to GET /commerce/stores/{storeId}/products* */
  commerceListProducts: Maybe<CommerceSearchResponseProduct>;
  /** *Equivalent to GET /commerce/stores/{storeId}/sales/{saleId}/saleProducts* */
  commerceListSaleProducts: Maybe<CommerceSearchResponseSaleProduct>;
  /** *Equivalent to GET /commerce/stores/{storeId}/sales* */
  commerceListSales: Maybe<CommerceSearchResponseSale>;
  /**
   * *Equivalent to GET /commerce/stores*
   * # List Stores
   *
   * ...
   */
  commerceListStores: Maybe<CommerceSearchResponseStore>;
  /** *Equivalent to GET /commerce/stores/{storeId}/tags* */
  commerceListTags: Maybe<CommerceSearchResponseTag>;
  /** *Equivalent to GET /commerce/stores/{storeId}/taxTypes* */
  commerceListTaxTypes: Maybe<CommerceSearchResponseTaxType>;
  /** *Equivalent to GET /commerce/stores/{storeId}/taxes* */
  commerceListTaxes: Maybe<CommerceSearchResponseTax>;
  /** *Equivalent to GET /commerce/stores/{storeId}/vouchers* */
  commerceListVouchers: Maybe<CommerceSearchResponseVoucher>;
  /** Retrieves all countries. */
  countries: EventConfigurationCountryConnection;
  /**
   * Returns an event by slug.
   * X-EVENT-ID http header is used when the slug argument is not provided on the query.
   */
  event: Maybe<Event>;
  /**
   * Retrieves events sorted by start_date in descending order.
   * All events are returned unless the filter is applied.
   */
  events: EventConnection;
  /** Retrieves all legal_entities. */
  legalEntities: LegalEntityConnection;
  /** Returns a legal_entity by id. */
  legalEntity: LegalEntity;
  /** Retrieves all tax rates. */
  taxRates: TaxRateConnection;
  /** Retrieves all time zones */
  timeZones: TimeZoneConnection;
};

export type QueryBrandingArgs = {
  id: Scalars['ID'];
};

export type QueryBrandingsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type QueryBrandingsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type QuerySiteArgs = {
  id: Scalars['ID'];
};

export type QuerySitesArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type QuerySitesConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type QueryWebPageConfigArgs = {
  id: Scalars['ID'];
};

export type QueryWebPageConfigsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type QueryWebPageConfigsConnectionArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type QueryBrandingBySlugArgs = {
  slug: Scalars['String'];
};

export type QueryWebPageByPathArgs = {
  path: Scalars['String'];
};

export type QueryWebPageByHostPathArgs = {
  host: Scalars['String'];
  path: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};

export type QueryWebPageConfigByPathHostArgs = {
  path: Scalars['String'];
  host: Scalars['String'];
  slug?: Maybe<Scalars['String']>;
};

export type QueryAccessPermissionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  ticketTypeIds?: Maybe<Array<Scalars['ID']>>;
};

export type QueryTicketCategoriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryTicketReleaseArgs = {
  id: Scalars['ID'];
};

export type QueryTicketReleasePhaseArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryTicketReleasePhasesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryTicketReleasesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  releasePhaseIds?: Maybe<Array<Scalars['ID']>>;
  showBenefits?: Maybe<Scalars['Boolean']>;
  ticketCategoryIds?: Maybe<Array<Scalars['ID']>>;
  ticketTypeIds?: Maybe<Array<Scalars['ID']>>;
};

export type QueryAdminAttendeeProfileArgs = {
  email: Scalars['String'];
};

export type QueryAdminsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryAppearancesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryAttendanceArgs = {
  id: Scalars['ID'];
};

export type QueryAttendanceAppearanceSelectionArgs = {
  id: Scalars['ID'];
};

export type QueryAttendancesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<AttendanceFilter>;
  first?: Maybe<Scalars['Int']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  last?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};

export type QueryChatChannelArgs = {
  id?: Maybe<Scalars['ID']>;
  providerId?: Maybe<Scalars['ID']>;
};

export type QueryChatChannelsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  includeEmpty?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Int']>;
  provider: ChatProvider;
  providerIds?: Maybe<Array<Scalars['ID']>>;
};

export type QueryConferenceArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['ID']>;
};

export type QueryInvestorSessionArgs = {
  id: Scalars['ID'];
};

export type QueryInvestorSessionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryScheduleTimeslotArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};

export type QueryTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryUserRolesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryAssignmentProfileArgs = {
  ticketId: Scalars['ID'];
};

export type QueryAssignmentUserArgs = {
  email?: Maybe<Scalars['String']>;
};

export type QueryOrderArgs = {
  reference: Scalars['String'];
};

export type QueryOrdersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<OrderFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  searchQuery?: Maybe<Scalars['String']>;
};

export type QueryTaEventArgs = {
  slug: Scalars['String'];
};

export type QueryTicketArgs = {
  reference: Scalars['String'];
};

export type QueryTicketTypeArgs = {
  id: Scalars['ID'];
};

export type QueryTicketTypesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryTicketsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<TicketFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['ID']>;
  searchQuery?: Maybe<Scalars['String']>;
};

export type QueryCommerceGetAuditForTypeAndTargetAuditEntryArgs = {
  entity: Scalars['String'];
  id: Scalars['ID'];
  storeId: Scalars['ID'];
};

export type QueryCommerceGetAuditForTypeAuditEntryArgs = {
  entity: Scalars['String'];
  storeId: Scalars['ID'];
};

export type QueryCommerceGetCategoryArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetCustomerArgs = {
  id: Scalars['ID'];
  orderId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetDealArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetDealItemArgs = {
  dealId: Scalars['ID'];
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetOrderArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetPaymentGatewayArgs = {
  id: Scalars['ID'];
};

export type QueryCommerceGetPaymentMethodArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetProductArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetSaleArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetSaleProductArgs = {
  id: Scalars['ID'];
  saleId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetStoreArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetTagArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetTaxArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetTaxTypeArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceGetVoucherArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type QueryCommerceListCategoriesArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListCustomersArgs = {
  orderId: Scalars['ID'];
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListDealItemsArgs = {
  dealId: Scalars['ID'];
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListDealsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListOrdersArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListPaymentGatewaysArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListPaymentMethodsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListProductsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListSaleProductsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  saleId: Scalars['ID'];
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListSalesArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListStoresArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListTagsArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListTaxTypesArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListTaxesArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCommerceListVouchersArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm>>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm>>;
};

export type QueryCountriesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryEventArgs = {
  slug?: Maybe<Scalars['String']>;
};

export type QueryEventsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<EventFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryLegalEntitiesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryLegalEntityArgs = {
  id: Scalars['ID'];
};

export type QueryTaxRatesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QueryTimeZonesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AppConfig = {
  __typename?: 'AppConfig';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  googleAnalyticsTrackingId: Maybe<Scalars['String']>;
  googleTagManagerId: Maybe<Scalars['String']>;
  googleAnalyticsLinkerDomains: Array<ComponentSiteConfigGoogleAnalyticsLinkerDomainList>;
  googleFontsUrl: Maybe<Scalars['String']>;
  theme: Maybe<Scalars['JSON']>;
  metaData: ComponentSiteConfigMetaData;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
};

export type ComponentSiteConfigGoogleAnalyticsLinkerDomainList = {
  __typename?: 'ComponentSiteConfigGoogleAnalyticsLinkerDomainList';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  domain: Maybe<Scalars['String']>;
};

export type ComponentSiteConfigMetaData = {
  __typename?: 'ComponentSiteConfigMetaData';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  image: Maybe<UploadFile>;
  siteTitle: Scalars['String'];
  siteDescription: Scalars['String'];
  facebookId: Maybe<Scalars['String']>;
  facebookPublisher: Maybe<Scalars['String']>;
  twitterId: Maybe<Scalars['String']>;
  twitterCreator: Maybe<Scalars['String']>;
};

export type UploadFile = {
  __typename?: 'UploadFile';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  alternativeText: Maybe<Scalars['String']>;
  caption: Maybe<Scalars['String']>;
  width: Maybe<Scalars['Int']>;
  height: Maybe<Scalars['Int']>;
  formats: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata: Maybe<Scalars['JSON']>;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
  absoluteUrl: Scalars['String'];
};

export type AdminUser = {
  __typename?: 'AdminUser';
  id: Scalars['ID'];
  username: Maybe<Scalars['String']>;
};

export type Branding = {
  __typename?: 'Branding';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Maybe<Scalars['String']>;
  googleFontsUrl: Maybe<Scalars['String']>;
  typekitFontsUrl: Maybe<Scalars['String']>;
  theme: Maybe<Scalars['JSON']>;
  logo: Maybe<UploadFile>;
  headerBranding: Maybe<UploadFile>;
  favicon: Maybe<UploadFile>;
  ticketLogo: Maybe<UploadFile>;
  invoiceHeader: Maybe<UploadFile>;
  invoiceFooter: Maybe<UploadFile>;
  invoiceStamp: Maybe<UploadFile>;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
};

export type BrandingConnection = {
  __typename?: 'BrandingConnection';
  values: Maybe<Array<Maybe<Branding>>>;
  groupBy: Maybe<BrandingGroupBy>;
  aggregate: Maybe<BrandingAggregator>;
};

export type BrandingGroupBy = {
  __typename?: 'BrandingGroupBy';
  id: Maybe<Array<Maybe<BrandingConnectionId>>>;
  _id: Maybe<Array<Maybe<BrandingConnection_Id>>>;
  createdAt: Maybe<Array<Maybe<BrandingConnectionCreatedAt>>>;
  updatedAt: Maybe<Array<Maybe<BrandingConnectionUpdatedAt>>>;
  title: Maybe<Array<Maybe<BrandingConnectionTitle>>>;
  googleFontsUrl: Maybe<Array<Maybe<BrandingConnectionGoogleFontsUrl>>>;
  typekitFontsUrl: Maybe<Array<Maybe<BrandingConnectionTypekitFontsUrl>>>;
  theme: Maybe<Array<Maybe<BrandingConnectionTheme>>>;
  logo: Maybe<Array<Maybe<BrandingConnectionLogo>>>;
  headerBranding: Maybe<Array<Maybe<BrandingConnectionHeaderBranding>>>;
  favicon: Maybe<Array<Maybe<BrandingConnectionFavicon>>>;
  ticketLogo: Maybe<Array<Maybe<BrandingConnectionTicketLogo>>>;
  invoiceHeader: Maybe<Array<Maybe<BrandingConnectionInvoiceHeader>>>;
  invoiceFooter: Maybe<Array<Maybe<BrandingConnectionInvoiceFooter>>>;
  invoiceStamp: Maybe<Array<Maybe<BrandingConnectionInvoiceStamp>>>;
  created_by: Maybe<Array<Maybe<BrandingConnectionCreated_By>>>;
  updated_by: Maybe<Array<Maybe<BrandingConnectionUpdated_By>>>;
};

export type BrandingConnectionId = {
  __typename?: 'BrandingConnectionId';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnection_Id = {
  __typename?: 'BrandingConnection_id';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionCreatedAt = {
  __typename?: 'BrandingConnectionCreatedAt';
  key: Maybe<Scalars['DateTime']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionUpdatedAt = {
  __typename?: 'BrandingConnectionUpdatedAt';
  key: Maybe<Scalars['DateTime']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionTitle = {
  __typename?: 'BrandingConnectionTitle';
  key: Maybe<Scalars['String']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionGoogleFontsUrl = {
  __typename?: 'BrandingConnectionGoogleFontsUrl';
  key: Maybe<Scalars['String']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionTypekitFontsUrl = {
  __typename?: 'BrandingConnectionTypekitFontsUrl';
  key: Maybe<Scalars['String']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionTheme = {
  __typename?: 'BrandingConnectionTheme';
  key: Maybe<Scalars['JSON']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionLogo = {
  __typename?: 'BrandingConnectionLogo';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionHeaderBranding = {
  __typename?: 'BrandingConnectionHeaderBranding';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionFavicon = {
  __typename?: 'BrandingConnectionFavicon';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionTicketLogo = {
  __typename?: 'BrandingConnectionTicketLogo';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionInvoiceHeader = {
  __typename?: 'BrandingConnectionInvoiceHeader';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionInvoiceFooter = {
  __typename?: 'BrandingConnectionInvoiceFooter';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionInvoiceStamp = {
  __typename?: 'BrandingConnectionInvoiceStamp';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionCreated_By = {
  __typename?: 'BrandingConnectionCreated_by';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingConnectionUpdated_By = {
  __typename?: 'BrandingConnectionUpdated_by';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<BrandingConnection>;
};

export type BrandingAggregator = {
  __typename?: 'BrandingAggregator';
  count: Maybe<Scalars['Int']>;
  totalCount: Maybe<Scalars['Int']>;
};

export type Site = {
  __typename?: 'Site';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Maybe<Scalars['String']>;
  host: Scalars['String'];
};

export type SiteConnection = {
  __typename?: 'SiteConnection';
  values: Maybe<Array<Maybe<Site>>>;
  groupBy: Maybe<SiteGroupBy>;
  aggregate: Maybe<SiteAggregator>;
};

export type SiteGroupBy = {
  __typename?: 'SiteGroupBy';
  id: Maybe<Array<Maybe<SiteConnectionId>>>;
  _id: Maybe<Array<Maybe<SiteConnection_Id>>>;
  createdAt: Maybe<Array<Maybe<SiteConnectionCreatedAt>>>;
  updatedAt: Maybe<Array<Maybe<SiteConnectionUpdatedAt>>>;
  title: Maybe<Array<Maybe<SiteConnectionTitle>>>;
  host: Maybe<Array<Maybe<SiteConnectionHost>>>;
  activeEvent: Maybe<Array<Maybe<SiteConnectionActiveEvent>>>;
  created_by: Maybe<Array<Maybe<SiteConnectionCreated_By>>>;
  updated_by: Maybe<Array<Maybe<SiteConnectionUpdated_By>>>;
};

export type SiteConnectionId = {
  __typename?: 'SiteConnectionId';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnection_Id = {
  __typename?: 'SiteConnection_id';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnectionCreatedAt = {
  __typename?: 'SiteConnectionCreatedAt';
  key: Maybe<Scalars['DateTime']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnectionUpdatedAt = {
  __typename?: 'SiteConnectionUpdatedAt';
  key: Maybe<Scalars['DateTime']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnectionTitle = {
  __typename?: 'SiteConnectionTitle';
  key: Maybe<Scalars['String']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnectionHost = {
  __typename?: 'SiteConnectionHost';
  key: Maybe<Scalars['String']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnectionActiveEvent = {
  __typename?: 'SiteConnectionActiveEvent';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnectionCreated_By = {
  __typename?: 'SiteConnectionCreated_by';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<SiteConnection>;
};

export type SiteConnectionUpdated_By = {
  __typename?: 'SiteConnectionUpdated_by';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<SiteConnection>;
};

export type SiteAggregator = {
  __typename?: 'SiteAggregator';
  count: Maybe<Scalars['Int']>;
  totalCount: Maybe<Scalars['Int']>;
};

export type WebPageConfig = {
  __typename?: 'WebPageConfig';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Maybe<Scalars['String']>;
  googleTagManagerId: Maybe<Scalars['String']>;
  googleAnalyticsTrackingId: Maybe<Scalars['String']>;
  baseGoogleAnalyticsTrackingId: Maybe<Scalars['String']>;
  googleOptimizeId: Maybe<Scalars['String']>;
  googleAnalyticsLinkerDomains: Array<ComponentSiteConfigGoogleAnalyticsLinkerDomainList>;
  metaData: Maybe<ComponentSiteConfigMetaData>;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
  site: Maybe<Site>;
  branding: Maybe<Branding>;
  config: Maybe<WebPageConfig>;
  event: Maybe<WebPageEvent>;
};

export type WebPageEvent = {
  __typename?: 'WebPageEvent';
  slug: Maybe<Scalars['String']>;
};

export type WebPageConfigConnection = {
  __typename?: 'WebPageConfigConnection';
  values: Maybe<Array<Maybe<WebPageConfig>>>;
  groupBy: Maybe<WebPageConfigGroupBy>;
  aggregate: Maybe<WebPageConfigAggregator>;
};

export type WebPageConfigGroupBy = {
  __typename?: 'WebPageConfigGroupBy';
  id: Maybe<Array<Maybe<WebPageConfigConnectionId>>>;
  _id: Maybe<Array<Maybe<WebPageConfigConnection_Id>>>;
  createdAt: Maybe<Array<Maybe<WebPageConfigConnectionCreatedAt>>>;
  updatedAt: Maybe<Array<Maybe<WebPageConfigConnectionUpdatedAt>>>;
  title: Maybe<Array<Maybe<WebPageConfigConnectionTitle>>>;
  googleTagManagerId: Maybe<
    Array<Maybe<WebPageConfigConnectionGoogleTagManagerId>>
  >;
  googleAnalyticsTrackingId: Maybe<
    Array<Maybe<WebPageConfigConnectionGoogleAnalyticsTrackingId>>
  >;
  baseGoogleAnalyticsTrackingId: Maybe<
    Array<Maybe<WebPageConfigConnectionBaseGoogleAnalyticsTrackingId>>
  >;
  googleOptimizeId: Maybe<
    Array<Maybe<WebPageConfigConnectionGoogleOptimizeId>>
  >;
  metaData: Maybe<Array<Maybe<WebPageConfigConnectionMetaData>>>;
  created_by: Maybe<Array<Maybe<WebPageConfigConnectionCreated_By>>>;
  updated_by: Maybe<Array<Maybe<WebPageConfigConnectionUpdated_By>>>;
};

export type WebPageConfigConnectionId = {
  __typename?: 'WebPageConfigConnectionId';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnection_Id = {
  __typename?: 'WebPageConfigConnection_id';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionCreatedAt = {
  __typename?: 'WebPageConfigConnectionCreatedAt';
  key: Maybe<Scalars['DateTime']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionUpdatedAt = {
  __typename?: 'WebPageConfigConnectionUpdatedAt';
  key: Maybe<Scalars['DateTime']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionTitle = {
  __typename?: 'WebPageConfigConnectionTitle';
  key: Maybe<Scalars['String']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionGoogleTagManagerId = {
  __typename?: 'WebPageConfigConnectionGoogleTagManagerId';
  key: Maybe<Scalars['String']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionGoogleAnalyticsTrackingId = {
  __typename?: 'WebPageConfigConnectionGoogleAnalyticsTrackingId';
  key: Maybe<Scalars['String']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionBaseGoogleAnalyticsTrackingId = {
  __typename?: 'WebPageConfigConnectionBaseGoogleAnalyticsTrackingId';
  key: Maybe<Scalars['String']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionGoogleOptimizeId = {
  __typename?: 'WebPageConfigConnectionGoogleOptimizeId';
  key: Maybe<Scalars['String']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionMetaData = {
  __typename?: 'WebPageConfigConnectionMetaData';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionCreated_By = {
  __typename?: 'WebPageConfigConnectionCreated_by';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigConnectionUpdated_By = {
  __typename?: 'WebPageConfigConnectionUpdated_by';
  key: Maybe<Scalars['ID']>;
  connection: Maybe<WebPageConfigConnection>;
};

export type WebPageConfigAggregator = {
  __typename?: 'WebPageConfigAggregator';
  count: Maybe<Scalars['Int']>;
  totalCount: Maybe<Scalars['Int']>;
};

export type WebPage = {
  __typename?: 'WebPage';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  path: Maybe<Scalars['String']>;
  content: Array<WebPageContentDynamicZone>;
  seoTags: Maybe<ComponentWebElementsSeoMetaData>;
};

export type WebPageContentDynamicZone =
  | ComponentWebLayoutsTicketSalesPage
  | ComponentWebLayoutsTicketApplicationsPage
  | ComponentWebElementsShowcaseGrid
  | ComponentWebElementsScheduleSearchSidebarFilters
  | ComponentWebElementsCompanySearchSidebarFilters
  | ComponentWebElementsAttendeeSearchSidebarFilters
  | ComponentWebElementsHeroSection
  | ComponentWebElementsFreshchat
  | ComponentWebLayoutsStoresTicketSalesPage
  | ComponentWebLayoutsStoresTicketApplicationsPage;

export type ComponentWebLayoutsTicketSalesPage = {
  __typename?: 'ComponentWebLayoutsTicketSalesPage';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  ticketReleasesPanel: Maybe<ComponentWebElementsTicketReleasesPanel>;
  categoriesMenu: Maybe<Menu>;
  priceIncreaseCountdownTimer: Maybe<ComponentWebElementsPriceIncreaseCountdownTimer>;
  promotions: Array<ComponentWebElementsTicketPromotion>;
  releasePhaseStepper: Maybe<ComponentWebElementsReleasePhaseStepper>;
  ticketCategory: Maybe<TicketCategory>;
};

export type ComponentWebElementsTicketReleasesPanel = {
  __typename?: 'ComponentWebElementsTicketReleasesPanel';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  displayPriceIncludingTax: Maybe<Scalars['Boolean']>;
};

export type Menu = {
  __typename?: 'Menu';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  label: Maybe<Scalars['String']>;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
  menuItems: Array<MenuItem>;
};

export type MenuMenuItemsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type MenuItem = {
  __typename?: 'MenuItem';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  label: Scalars['String'];
  link: MenuItemLinkDynamicZone;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
};

export type MenuItemLinkDynamicZone =
  | ComponentWebLinksPageLink
  | ComponentWebLinksUrlLink
  | ComponentWebLinksSubMenu;

export type ComponentWebLinksPageLink = {
  __typename?: 'ComponentWebLinksPageLink';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  page: Maybe<WebPage>;
};

export type ComponentWebLinksUrlLink = {
  __typename?: 'ComponentWebLinksUrlLink';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
  target: Maybe<Scalars['String']>;
};

export type ComponentWebLinksSubMenu = {
  __typename?: 'ComponentWebLinksSubMenu';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  menu: Maybe<Menu>;
};

export type ComponentWebElementsPriceIncreaseCountdownTimer = {
  __typename?: 'ComponentWebElementsPriceIncreaseCountdownTimer';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  ticketType: TicketType;
};

export type TicketType = {
  __typename?: 'TicketType';
  accessPermissions: AccessPermissionConnection;
  category: Maybe<TicketCategory>;
  id: Scalars['ID'];
  /** If no arguments given, it returns current release */
  release: Maybe<TicketRelease>;
  releasePhases: TicketReleasePhaseConnection;
  /**
   * The same ticket type may be released over several release phases at incrementally increasing prices.
   * The combination of ticket type and release phase is captured in the concept of a "TicketRelease".
   */
  releases: TicketReleaseConnection;
  assignmentProperties: Maybe<AssignmentProperties>;
  description: Maybe<Scalars['String']>;
  name: Scalars['String'];
  versions: Maybe<Array<PaperTrailVersion>>;
};

export type TicketTypeAccessPermissionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TicketTypeReleaseArgs = {
  id?: Maybe<Scalars['ID']>;
  releasePhaseId?: Maybe<Scalars['ID']>;
};

export type TicketTypeReleasePhasesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TicketTypeReleasesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for AccessPermission. */
export type AccessPermissionConnection = {
  __typename?: 'AccessPermissionConnection';
  /** A list of edges. */
  edges: Array<AccessPermissionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AccessPermissionEdge = {
  __typename?: 'AccessPermissionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AccessPermission;
};

/** An access permission denotes what ticket types receive a certain benefit */
export type AccessPermission = {
  __typename?: 'AccessPermission';
  /** Detailed description of what this permission entails, to be shown to customers */
  detail: Maybe<Scalars['String']>;
  /** Unique id of this access permission */
  id: Scalars['ID'];
  /** The list of ticket types that receive this access permission */
  ticketTypes: TicketTypeConnection;
  /** Human readable title to be shown to customers */
  title: Scalars['String'];
};

/** An access permission denotes what ticket types receive a certain benefit */
export type AccessPermissionTicketTypesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  ids?: Maybe<Array<Scalars['ID']>>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for TicketType. */
export type TicketTypeConnection = {
  __typename?: 'TicketTypeConnection';
  /** A list of edges. */
  edges: Array<TicketTypeEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TicketTypeEdge = {
  __typename?: 'TicketTypeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TicketType;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor: Maybe<Scalars['String']>;
};

/** A ticket category groups ticket types by their common denominator */
export type TicketCategory = {
  __typename?: 'TicketCategory';
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Must be unique in the scope of the event */
  name: Scalars['String'];
  ticketTypes: TicketTypeConnection;
  versions: Maybe<Array<PaperTrailVersion>>;
};

/** A ticket category groups ticket types by their common denominator */
export type TicketCategoryTicketTypesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type PaperTrailVersion = {
  __typename?: 'PaperTrailVersion';
  command: Maybe<Scalars['String']>;
  context: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['ISO8601Date']>;
  event: Scalars['String'];
  id: Scalars['Int'];
  itemId: Scalars['ID'];
  itemType: Scalars['String'];
  object: Maybe<Scalars['String']>;
  objectChanges: Maybe<Scalars['String']>;
  reason: Maybe<Scalars['String']>;
  sourceLocation: Maybe<Scalars['String']>;
  whodunnit: Maybe<Scalars['String']>;
};

/** A ticket release combines a ticket type and a release phase, e.g. Early-Bird General Attendee */
export type TicketRelease = {
  __typename?: 'TicketRelease';
  /** The action available to the user, inferred from a combination of factors */
  action: Maybe<TicketReleaseAction>;
  /** Returns true when the release phase is active */
  active: Scalars['Boolean'];
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The next release, after this release phase has elapsed */
  nextRelease: Maybe<TicketRelease>;
  /** The previous release, before this one began */
  previousRelease: Maybe<TicketRelease>;
  price: Maybe<Price>;
  releasePhase: TicketReleasePhase;
  soldOut: Scalars['Boolean'];
  /** The corresponding source entity from third-party provider, e.g. from Tito */
  source: Maybe<SourceTicketReleaseUnion>;
  ticketType: TicketType;
  versions: Maybe<Array<PaperTrailVersion>>;
};

export type TicketReleaseAction =
  | TicketReleaseActionsExpiredTicketAction
  | TicketReleaseActionsPriceAlertAction
  | TicketReleaseActionsPriceEnquiryAction
  | TicketReleaseActionsTitoCheckoutAction;

export type TicketReleaseActionsExpiredTicketAction = {
  __typename?: 'TicketReleaseActionsExpiredTicketAction';
  message: Scalars['String'];
  suggestedRelease: Maybe<TicketRelease>;
};

export type TicketReleaseActionsPriceAlertAction = {
  __typename?: 'TicketReleaseActionsPriceAlertAction';
  dynamicForm: DynamicForm;
};

export type DynamicForm = {
  __typename?: 'DynamicForm';
  id: Scalars['ID'];
  data: Scalars['JSON'];
  schema: Scalars['JSONSchemaForm'];
  mutation: Scalars['String'];
  uiSchema: Scalars['JSONSchemaForm'];
};

export type TicketReleaseActionsPriceEnquiryAction = {
  __typename?: 'TicketReleaseActionsPriceEnquiryAction';
  emailAddress: Maybe<Scalars['EmailAddress']>;
};

export type TicketReleaseActionsTitoCheckoutAction = {
  __typename?: 'TicketReleaseActionsTitoCheckoutAction';
  quantity: Scalars['Int'];
};

export type Price = {
  __typename?: 'Price';
  /** Price without a tax */
  exTax: Money;
  /** @deprecated This field is only here for compatibility reasons.You should not use it because we no longer support tax lines, the returned value is hardcoded to an empty array. */
  taxLines: Array<TaxLine>;
  /** Total price including taxes */
  total: Money;
  /** Total tax value */
  totalTax: Money;
};

export type Money = {
  __typename?: 'Money';
  amount: Scalars['Decimal'];
  currency: Currency;
  format: Scalars['String'];
};

export type MoneyFormatArgs = {
  includeUnit?: Maybe<Scalars['Boolean']>;
  locale?: Maybe<Scalars['String']>;
  precision?: Maybe<Scalars['Int']>;
};

export type Currency = {
  __typename?: 'Currency';
  code: CurrencyCode;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export enum CurrencyCode {
  Aed = 'AED',
  Aud = 'AUD',
  Brl = 'BRL',
  Cad = 'CAD',
  Chf = 'CHF',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Czk = 'CZK',
  Dkk = 'DKK',
  Eur = 'EUR',
  Gbp = 'GBP',
  Hkd = 'HKD',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Jpy = 'JPY',
  Krw = 'KRW',
  Mxn = 'MXN',
  Myr = 'MYR',
  Nok = 'NOK',
  Nzd = 'NZD',
  Php = 'PHP',
  Pln = 'PLN',
  Ron = 'RON',
  Rub = 'RUB',
  Sar = 'SAR',
  Sek = 'SEK',
  Sgd = 'SGD',
  Thb = 'THB',
  Try = 'TRY',
  Twd = 'TWD',
  Usd = 'USD',
  Zar = 'ZAR',
}

export type TaxLine = {
  __typename?: 'TaxLine';
  amount: Money;
  name: Scalars['String'];
  rate: Scalars['Decimal'];
};

/** Tickets are often released in phased batches, e.g. Early-Bird or Late-Late Booker */
export type TicketReleasePhase = {
  __typename?: 'TicketReleasePhase';
  active: Scalars['Boolean'];
  description: Maybe<Scalars['String']>;
  endsAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  /** A link to the phase that follows this phase, if there is one */
  nextPhase: Maybe<TicketReleasePhase>;
  /** A link to the phase that predated this phase, if there is one */
  previousPhase: Maybe<TicketReleasePhase>;
  startsAt: Scalars['ISO8601DateTime'];
  status: TicketReleasePhaseStatus;
  versions: Maybe<Array<PaperTrailVersion>>;
};

/** Possible release phase states */
export enum TicketReleasePhaseStatus {
  Active = 'ACTIVE',
  InTheFuture = 'IN_THE_FUTURE',
  InThePast = 'IN_THE_PAST',
}

/**
 * A union abstraction over source ticket types.
 *
 * Currently only contains Tito releases but is open for extension once we have other types.
 */
export type SourceTicketReleaseUnion = TitoTicketRelease;

/** Tito linked ticket release */
export type TitoTicketRelease = {
  __typename?: 'TitoTicketRelease';
  /** The unique event slug of the event this release is for */
  eventSlug: Scalars['String'];
  slug: Scalars['String'];
  /** The ti.to url that links to this release */
  url: Maybe<Scalars['URL']>;
};

/** The connection type for TicketReleasePhase. */
export type TicketReleasePhaseConnection = {
  __typename?: 'TicketReleasePhaseConnection';
  /** A list of edges. */
  edges: Array<TicketReleasePhaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TicketReleasePhaseEdge = {
  __typename?: 'TicketReleasePhaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TicketReleasePhase;
};

/** The connection type for TicketRelease. */
export type TicketReleaseConnection = {
  __typename?: 'TicketReleaseConnection';
  /** A list of edges. */
  edges: Array<TicketReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TicketReleaseEdge = {
  __typename?: 'TicketReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TicketRelease;
};

export type AssignmentProperties = {
  __typename?: 'AssignmentProperties';
  bookingRefSuffix: Maybe<Scalars['String']>;
  cycleable: Scalars['Boolean'];
  orderOwnerEditable: Scalars['Boolean'];
  reassignable: Scalars['Boolean'];
  rejectable: Scalars['Boolean'];
};

export type ComponentWebElementsTicketPromotion = {
  __typename?: 'ComponentWebElementsTicketPromotion';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  type: TicketPromotionType;
  label: Maybe<Scalars['String']>;
  color: Maybe<Scalars['String']>;
  ticketType: TicketType;
};

export enum TicketPromotionType {
  Annotation = 'ANNOTATION',
  Highlight = 'HIGHLIGHT',
}

export type ComponentWebElementsReleasePhaseStepper = {
  __typename?: 'ComponentWebElementsReleasePhaseStepper';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  ticketType: TicketType;
};

export type ComponentWebLayoutsTicketApplicationsPage = {
  __typename?: 'ComponentWebLayoutsTicketApplicationsPage';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['Markdown']>;
  categoriesMenu: Maybe<Menu>;
  applicationForm: Maybe<Form>;
  ticketInfoPanel: Maybe<ComponentWebElementsTicketTypeInformation>;
  priceIncreaseCountdownTimer: Maybe<ComponentWebElementsPriceIncreaseCountdownTimer>;
  applicationOverviewPanel: Maybe<ComponentWebElementsTicketApplicationOverviewPanel>;
  releasePhaseStepper: Maybe<ComponentWebElementsReleasePhaseStepper>;
};

export type Form = {
  __typename?: 'Form';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  contentBefore: Maybe<Scalars['Markdown']>;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
  dynamicForm: DynamicForm;
};

export type ComponentWebElementsTicketTypeInformation = {
  __typename?: 'ComponentWebElementsTicketTypeInformation';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  showBenefits: Scalars['Boolean'];
  displayPriceIncludingTax: Maybe<Scalars['Boolean']>;
  heading: Maybe<Scalars['String']>;
  ticketType: TicketType;
};

export type ComponentWebElementsTicketApplicationOverviewPanel = {
  __typename?: 'ComponentWebElementsTicketApplicationOverviewPanel';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  imageUrl: Maybe<Scalars['String']>;
  altImageText: Maybe<Scalars['String']>;
};

export type ComponentWebElementsShowcaseGrid = {
  __typename?: 'ComponentWebElementsShowcaseGrid';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  contentBefore: Maybe<Scalars['Markdown']>;
  backgroundColor: Maybe<Scalars['String']>;
  collection: ContentCollection;
};

export type ContentCollection = {
  __typename?: 'ContentCollection';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
  elements: Array<ContentElement>;
};

export type ContentCollectionElementsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ContentElement = {
  __typename?: 'ContentElement';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Maybe<Scalars['String']>;
  image: Maybe<UploadFile>;
  link: Maybe<ComponentWebLinksUrlLink>;
  created_by: Maybe<AdminUser>;
  updated_by: Maybe<AdminUser>;
  collections: Array<ContentCollection>;
};

export type ContentElementCollectionsArgs = {
  sort?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['Int']>;
  where?: Maybe<Scalars['JSON']>;
};

export type ComponentWebElementsScheduleSearchSidebarFilters = {
  __typename?: 'ComponentWebElementsScheduleSearchSidebarFilters';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  apiKey: Scalars['String'];
  indexName: Scalars['String'];
  refinements: Array<ComponentSearchAlgoliaRefinement>;
};

export type ComponentSearchAlgoliaRefinement = {
  __typename?: 'ComponentSearchAlgoliaRefinement';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  attribute: Scalars['String'];
  defaults: Maybe<Scalars['JSON']>;
  variant: SearchRefinementWidgetType;
  refinementItemsLimit: Maybe<Scalars['Int']>;
};

export enum SearchRefinementWidgetType {
  DropdownMulti = 'DROPDOWN_MULTI',
  DropdownSingle = 'DROPDOWN_SINGLE',
  Hidden = 'HIDDEN',
  LiveTalksOnly = 'LIVE_TALKS_ONLY',
  NumericSlider = 'NUMERIC_SLIDER',
  TagsMulti = 'TAGS_MULTI',
}

export type ComponentWebElementsCompanySearchSidebarFilters = {
  __typename?: 'ComponentWebElementsCompanySearchSidebarFilters';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  apiKey: Scalars['String'];
  indexName: Scalars['String'];
  refinements: Array<ComponentSearchAlgoliaRefinement>;
};

export type ComponentWebElementsAttendeeSearchSidebarFilters = {
  __typename?: 'ComponentWebElementsAttendeeSearchSidebarFilters';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  apiKey: Scalars['String'];
  indexName: Scalars['String'];
  refinements: Array<ComponentSearchAlgoliaRefinement>;
};

export type ComponentWebElementsHeroSection = {
  __typename?: 'ComponentWebElementsHeroSection';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  backgroundImage: Maybe<UploadFile>;
  backgroundImageAlt: Maybe<Scalars['String']>;
  backgroundImageDescription: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  subtitle: Maybe<Scalars['Markdown']>;
  brandImage: Maybe<UploadFile>;
  variant: Enum_Componentwebelementsherosection_Variant;
  ctaLink: Maybe<ComponentWebElementsCtaLink>;
};

export enum Enum_Componentwebelementsherosection_Variant {
  Compact = 'COMPACT',
  Regular = 'REGULAR',
}

export type ComponentWebElementsCtaLink = {
  __typename?: 'ComponentWebElementsCtaLink';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  text: Scalars['String'];
  url: Scalars['String'];
  openInNewTab: Scalars['Boolean'];
};

export type ComponentWebElementsFreshchat = {
  __typename?: 'ComponentWebElementsFreshchat';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  OnMobile: Maybe<Scalars['Boolean']>;
  OnDesktop: Maybe<Scalars['Boolean']>;
};

export type ComponentWebLayoutsStoresTicketSalesPage = {
  __typename?: 'ComponentWebLayoutsStoresTicketSalesPage';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productIds: Maybe<Scalars['JSON']>;
  ticketReleasesPanel: Maybe<ComponentWebElementsTicketReleasesPanel>;
  categoriesMenu: Maybe<Menu>;
  priceIncreaseCountdownTimer: Maybe<ComponentWebElementsPriceIncreaseCountdownTimer>;
  promotions: Array<ComponentWebElementsTicketPromotion>;
  releasePhaseStepper: Maybe<ComponentWebElementsReleasePhaseStepper>;
};

export type ComponentWebLayoutsStoresTicketApplicationsPage = {
  __typename?: 'ComponentWebLayoutsStoresTicketApplicationsPage';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Maybe<Scalars['String']>;
  description: Maybe<Scalars['Markdown']>;
  categoriesMenu: Maybe<Menu>;
  applicationForm: Maybe<Form>;
  ticketInfoPanel: Maybe<ComponentWebElementsTicketTypeInformation>;
  applicationOverviewPanel: Maybe<ComponentWebElementsTicketApplicationOverviewPanel>;
  releasePhaseStepper: Maybe<ComponentWebElementsReleasePhaseStepper>;
  priceIncreaseCountdownTimer: Maybe<ComponentWebElementsPriceIncreaseCountdownTimer>;
};

export type ComponentWebElementsSeoMetaData = {
  __typename?: 'ComponentWebElementsSeoMetaData';
  id: Scalars['ID'];
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  defaultImage: Maybe<UploadFile>;
  description: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  slug: Maybe<Scalars['String']>;
  twitterImage: Maybe<UploadFile>;
  facebookImage: Maybe<UploadFile>;
  twitterTitle: Maybe<Scalars['String']>;
  facebookTitle: Maybe<Scalars['String']>;
  twitterDescription: Maybe<Scalars['String']>;
  facebookDescription: Maybe<Scalars['String']>;
};

/** The connection type for TicketCategory. */
export type TicketCategoryConnection = {
  __typename?: 'TicketCategoryConnection';
  /** A list of edges. */
  edges: Array<TicketCategoryEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TicketCategoryEdge = {
  __typename?: 'TicketCategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TicketCategory;
};

export type Attendee = {
  __typename?: 'Attendee';
  attendanceAppearanceSelectionsDetails: Maybe<AttendanceAppearanceSelectionsDetails>;
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  bookingRef: Maybe<Scalars['String']>;
  chatAvailable: Scalars['Boolean'];
  city: Maybe<Scalars['String']>;
  companyName: Maybe<Scalars['String']>;
  companySize: Maybe<CompanySize>;
  country: Maybe<Country>;
  email: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  gender: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  industry: Maybe<Industry>;
  investorGdprConsent: Scalars['Boolean'];
  investorSession: Maybe<InvestorSession>;
  jobTitle: Maybe<Scalars['String']>;
  lastName: Maybe<Scalars['String']>;
  marketingConsent: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  offeringTopics: TopicConnection;
  passportNumber: Maybe<Scalars['String']>;
  pendingSelectionCount: Scalars['Int'];
  personalisationConsent: Maybe<Scalars['Boolean']>;
  phoneNumber: Maybe<Scalars['String']>;
  role: Maybe<Scalars['String']>;
  seekingTopics: TopicConnection;
  similarAttendees: AttendeeConnection;
  talks: ScheduleTimeslotConnection;
};

export type AttendeeOfferingTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AttendeeSeekingTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AttendeeSimilarAttendeesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AttendeeTalksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AttendanceAppearanceSelectionsDetails = {
  __typename?: 'AttendanceAppearanceSelectionsDetails';
  acceptedSelectionCount: Scalars['Int'];
  attendanceAppearanceSelections: Maybe<AttendanceAppearanceSelectionConnection>;
  pendingSelectionCount: Scalars['Int'];
  rejectedSelectionCount: Scalars['Int'];
  submittedSelectionCount: Scalars['Int'];
};

export type AttendanceAppearanceSelectionsDetailsAttendanceAppearanceSelectionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for AttendanceAppearanceSelection. */
export type AttendanceAppearanceSelectionConnection = {
  __typename?: 'AttendanceAppearanceSelectionConnection';
  /** A list of edges. */
  edges: Array<AttendanceAppearanceSelectionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AttendanceAppearanceSelectionEdge = {
  __typename?: 'AttendanceAppearanceSelectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AttendanceAppearanceSelection;
};

export type AttendanceAppearanceSelection = {
  __typename?: 'AttendanceAppearanceSelection';
  appearance: Appearance;
  attendance: Attendee;
  createdAt: Scalars['String'];
  endsAt: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  participations: Maybe<Array<Attendee>>;
  priority: Maybe<Scalars['Int']>;
  sessionTimeslotId: Maybe<Scalars['ID']>;
  startsAt: Maybe<Scalars['String']>;
  status: Scalars['String'];
  submittedAt: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type AttendanceAppearanceSelectionCreatedAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type AttendanceAppearanceSelectionEndsAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type AttendanceAppearanceSelectionStartsAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type AttendanceAppearanceSelectionSubmittedAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type AttendanceAppearanceSelectionUpdatedAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type Appearance = {
  __typename?: 'Appearance';
  attendanceConnections: AttendanceAppearanceConnectionLinkConnection;
  company: Company;
  id: Scalars['ID'];
};

export type AppearanceAttendanceConnectionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for AttendanceAppearanceConnectionLink. */
export type AttendanceAppearanceConnectionLinkConnection = {
  __typename?: 'AttendanceAppearanceConnectionLinkConnection';
  /** A list of edges. */
  edges: Array<AttendanceAppearanceConnectionLinkEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AttendanceAppearanceConnectionLinkEdge = {
  __typename?: 'AttendanceAppearanceConnectionLinkEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: AttendanceAppearanceConnectionLink;
};

export type AttendanceAppearanceConnectionLink = {
  __typename?: 'AttendanceAppearanceConnectionLink';
  createdAt: Scalars['ISO8601DateTime'];
  entity: Attendee;
  id: Scalars['ID'];
  source: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  logoUrl: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CompanySize = {
  __typename?: 'CompanySize';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  callingCode: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Industry = {
  __typename?: 'Industry';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type InvestorSession = {
  __typename?: 'InvestorSession';
  attendanceId: Maybe<Scalars['ID']>;
  endsAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  startsAt: Scalars['ISO8601DateTime'];
  tableNumber: Scalars['Int'];
};

/** The connection type for Topic. */
export type TopicConnection = {
  __typename?: 'TopicConnection';
  /** A list of edges. */
  edges: Array<TopicEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TopicEdge = {
  __typename?: 'TopicEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Topic;
};

export type Topic = {
  __typename?: 'Topic';
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** The connection type for Attendee. */
export type AttendeeConnection = {
  __typename?: 'AttendeeConnection';
  /** A list of edges. */
  edges: Array<AttendeeEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AttendeeEdge = {
  __typename?: 'AttendeeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Attendee;
};

/** The connection type for ScheduleTimeslot. */
export type ScheduleTimeslotConnection = {
  __typename?: 'ScheduleTimeslotConnection';
  /** A list of edges. */
  edges: Array<ScheduleTimeslotEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ScheduleTimeslotEdge = {
  __typename?: 'ScheduleTimeslotEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduleTimeslot;
};

export type ScheduleTimeslot = {
  __typename?: 'ScheduleTimeslot';
  calendarEventId: Maybe<Scalars['String']>;
  channelUrl: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  endsAt: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  location: Maybe<Location>;
  participants: AttendeeConnection;
  slug: Maybe<Scalars['String']>;
  startsAt: Maybe<Scalars['ISO8601DateTime']>;
  title: Scalars['String'];
  topics: Array<Topic>;
};

export type ScheduleTimeslotParticipantsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID'];
  livestreamUrl: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** The connection type for Admin. */
export type AdminConnection = {
  __typename?: 'AdminConnection';
  /** A list of edges. */
  edges: Array<AdminEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AdminEdge = {
  __typename?: 'AdminEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Admin;
};

export type Admin = {
  __typename?: 'Admin';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
  userRoles: Array<UserRole>;
};

export type UserRole = {
  __typename?: 'UserRole';
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
};

/** The connection type for Appearance. */
export type AppearanceConnection = {
  __typename?: 'AppearanceConnection';
  /** A list of edges. */
  edges: Array<AppearanceEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AppearanceEdge = {
  __typename?: 'AppearanceEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Appearance;
};

export type AttendanceFilter = {
  attendanceAppearanceSelectionsStatus?: Maybe<
    Array<AttendanceAppearanceSelectionsStatus>
  >;
  type?: Maybe<Attendance>;
};

export enum AttendanceAppearanceSelectionsStatus {
  /** Accepted */
  Accepted = 'ACCEPTED',
  /** Pending */
  Pending = 'PENDING',
  /** Rejected */
  Rejected = 'REJECTED',
  /** Submitted */
  Submitted = 'SUBMITTED',
}

export enum Attendance {
  /** Investor */
  Investor = 'INVESTOR',
  /** Speaker */
  Speaker = 'SPEAKER',
}

export type ChatChannel = {
  __typename?: 'ChatChannel';
  id: Scalars['ID'];
  lastMessage: Maybe<ChatMessage>;
  members: ChatUserConnection;
  name: Maybe<Scalars['String']>;
  provider: ChatProvider;
  providerId: Maybe<Scalars['String']>;
};

export type ChatChannelMembersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  body: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  providerId: Scalars['ID'];
  sender: ChatUser;
  sentAt: Scalars['ISO8601DateTime'];
};

export type ChatUser = {
  __typename?: 'ChatUser';
  avatarUrl: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identity: Scalars['ID'];
  name: Scalars['String'];
  profile: Attendee;
};

/** The connection type for ChatUser. */
export type ChatUserConnection = {
  __typename?: 'ChatUserConnection';
  /** A list of edges. */
  edges: Array<ChatUserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ChatUserEdge = {
  __typename?: 'ChatUserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ChatUser;
};

export enum ChatProvider {
  Pubnub = 'PUBNUB',
  Twilio = 'TWILIO',
}

/** The connection type for ChatChannel. */
export type ChatChannelConnection = {
  __typename?: 'ChatChannelConnection';
  /** A list of edges. */
  edges: Array<ChatChannelEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ChatChannelEdge = {
  __typename?: 'ChatChannelEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ChatChannel;
};

export type Conference = {
  __typename?: 'Conference';
  deepLinkBaseUrl: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  endDate: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  schedule: Maybe<ConferenceSchedule>;
  slug: Scalars['String'];
  startDate: Maybe<Scalars['String']>;
  timezone: Maybe<Scalars['String']>;
};

export type ConferenceEndDateArgs = {
  format?: Maybe<Scalars['String']>;
};

export type ConferenceStartDateArgs = {
  format?: Maybe<Scalars['String']>;
};

export type ConferenceSchedule = {
  __typename?: 'ConferenceSchedule';
  day: Maybe<ConferenceScheduleDay>;
  days: Array<ConferenceScheduleDay>;
  topics: TopicConnection;
  track: Maybe<ConferenceScheduleTrack>;
  tracks: ConferenceScheduleTrackConnection;
};

export type ConferenceScheduleDayArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type ConferenceScheduleTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ConferenceScheduleTrackArgs = {
  id: Scalars['ID'];
};

export type ConferenceScheduleTracksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ConferenceScheduleDay = {
  __typename?: 'ConferenceScheduleDay';
  date: Scalars['String'];
  dayId: Scalars['ID'];
  endsAt: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  next: Maybe<ConferenceScheduleDay>;
  number: Maybe<Scalars['Int']>;
  prev: Maybe<ConferenceScheduleDay>;
  startsAt: Maybe<Scalars['String']>;
  timeslots: ConferenceScheduleTimeslotConnection;
  tracks: ConferenceScheduleTrackConnection;
};

export type ConferenceScheduleDayDateArgs = {
  format?: Maybe<Scalars['String']>;
};

export type ConferenceScheduleDayEndsAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type ConferenceScheduleDayStartsAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type ConferenceScheduleDayTimeslotsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ConferenceScheduleDayTracksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for ConferenceScheduleTimeslot. */
export type ConferenceScheduleTimeslotConnection = {
  __typename?: 'ConferenceScheduleTimeslotConnection';
  /** A list of edges. */
  edges: Array<ConferenceScheduleTimeslotEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ConferenceScheduleTimeslotEdge = {
  __typename?: 'ConferenceScheduleTimeslotEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ConferenceScheduleTimeslot;
};

export type ConferenceScheduleTimeslot = {
  __typename?: 'ConferenceScheduleTimeslot';
  description: Maybe<Scalars['String']>;
  duration: Maybe<Scalars['Float']>;
  endsAt: Maybe<Scalars['String']>;
  facebookUrl: Maybe<Scalars['URL']>;
  id: Scalars['ID'];
  location: Maybe<Location>;
  participants: ScheduleTimeslotParticipantConnection;
  startsAt: Maybe<Scalars['String']>;
  title: Scalars['String'];
  topics: TopicConnection;
  tracks: ConferenceScheduleTrackConnection;
  vimeoUrl: Maybe<Scalars['URL']>;
  youtubeUrl: Maybe<Scalars['URL']>;
};

export type ConferenceScheduleTimeslotDurationArgs = {
  unit?: Maybe<TimeUnit>;
};

export type ConferenceScheduleTimeslotEndsAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type ConferenceScheduleTimeslotParticipantsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ConferenceScheduleTimeslotStartsAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type ConferenceScheduleTimeslotTopicsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ConferenceScheduleTimeslotTracksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum TimeUnit {
  Days = 'DAYS',
  Hours = 'HOURS',
  Minutes = 'MINUTES',
  Months = 'MONTHS',
  Seconds = 'SECONDS',
  Weeks = 'WEEKS',
  Years = 'YEARS',
}

/** The connection type for ScheduleTimeslotParticipant. */
export type ScheduleTimeslotParticipantConnection = {
  __typename?: 'ScheduleTimeslotParticipantConnection';
  /** A list of edges. */
  edges: Array<ScheduleTimeslotParticipantEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ScheduleTimeslotParticipantEdge = {
  __typename?: 'ScheduleTimeslotParticipantEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduleTimeslotParticipant;
};

export type ScheduleTimeslotParticipant = {
  __typename?: 'ScheduleTimeslotParticipant';
  attendee: Attendee;
  id: Scalars['ID'];
};

/** The connection type for ConferenceScheduleTrack. */
export type ConferenceScheduleTrackConnection = {
  __typename?: 'ConferenceScheduleTrackConnection';
  /** A list of edges. */
  edges: Array<ConferenceScheduleTrackEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ConferenceScheduleTrackEdge = {
  __typename?: 'ConferenceScheduleTrackEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ConferenceScheduleTrack;
};

export type ConferenceScheduleTrack = {
  __typename?: 'ConferenceScheduleTrack';
  curated: Scalars['Boolean'];
  day: Maybe<ConferenceScheduleDay>;
  days: Array<ConferenceScheduleDay>;
  description: Maybe<Scalars['String']>;
  iconCharacter: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  timeslots: ConferenceScheduleTimeslotConnection;
  trackId: Scalars['ID'];
};

export type ConferenceScheduleTrackDayArgs = {
  id?: Maybe<Scalars['ID']>;
};

export type ConferenceScheduleTrackTimeslotsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for InvestorSession. */
export type InvestorSessionConnection = {
  __typename?: 'InvestorSessionConnection';
  /** A list of edges. */
  edges: Array<InvestorSessionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type InvestorSessionEdge = {
  __typename?: 'InvestorSessionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: InvestorSession;
};

export type User = {
  __typename?: 'User';
  connectionLinks: ConnectionLinkConnection;
  connectionRequests: ConnectionRequestConnection;
  email: Scalars['String'];
  id: Scalars['ID'];
  profile: Maybe<Attendee>;
};

export type UserConnectionLinksArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  entityIds?: Maybe<Array<Scalars['ID']>>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  type: ConnectionLinkTarget;
};

export type UserConnectionRequestsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  fromIds?: Maybe<Array<Scalars['ID']>>;
  last?: Maybe<Scalars['Int']>;
  status?: Maybe<ConnectionRequestStatus>;
  toIds?: Maybe<Array<Scalars['ID']>>;
};

export enum ConnectionLinkTarget {
  /** Connection to appearance */
  Appearance = 'Appearance',
  /** Connection to attendance */
  Attendee = 'Attendee',
}

/** The connection type for ConnectionLink. */
export type ConnectionLinkConnection = {
  __typename?: 'ConnectionLinkConnection';
  /** A list of edges. */
  edges: Array<ConnectionLinkEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ConnectionLinkEdge = {
  __typename?: 'ConnectionLinkEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ConnectionLink;
};

export type ConnectionLink = {
  __typename?: 'ConnectionLink';
  createdAt: Scalars['ISO8601DateTime'];
  entity: ConnectionEntity;
  id: Scalars['ID'];
};

export type ConnectionEntity = Appearance | Attendee;

export enum ConnectionRequestStatus {
  /** Accepted request */
  Accepted = 'ACCEPTED',
  /** Pending request */
  Pending = 'PENDING',
  /** Rejected request */
  Rejected = 'REJECTED',
}

/** The connection type for ConnectionRequest. */
export type ConnectionRequestConnection = {
  __typename?: 'ConnectionRequestConnection';
  /** A list of edges. */
  edges: Array<ConnectionRequestEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ConnectionRequestEdge = {
  __typename?: 'ConnectionRequestEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ConnectionRequest;
};

export type ConnectionRequest = {
  __typename?: 'ConnectionRequest';
  acceptedAt: Maybe<Scalars['ISO8601DateTime']>;
  createdAt: Scalars['ISO8601DateTime'];
  from: Maybe<ConnectionEntity>;
  id: Scalars['ID'];
  rejectedAt: Maybe<Scalars['ISO8601DateTime']>;
  status: Scalars['String'];
  to: Maybe<ConnectionEntity>;
};

/** The connection type for UserRole. */
export type UserRoleConnection = {
  __typename?: 'UserRoleConnection';
  /** A list of edges. */
  edges: Array<UserRoleEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type UserRoleEdge = {
  __typename?: 'UserRoleEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: UserRole;
};

export type AssignmentUser = {
  __typename?: 'AssignmentUser';
  assigneeAssignments: Maybe<AssignmentConnection>;
  bio: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  companyName: Maybe<Scalars['String']>;
  companySizeId: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  gender: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  industryId: Maybe<Scalars['String']>;
  jobTitle: Maybe<Scalars['String']>;
  lastLoginTokenCreatedAt: Maybe<Scalars['ISO8601Date']>;
  lastName: Maybe<Scalars['String']>;
  marketingConsent: Maybe<Scalars['String']>;
  me: Scalars['Boolean'];
  passportNumber: Maybe<Scalars['String']>;
  personalisationConsent: Maybe<Scalars['String']>;
  phoneNumber: Maybe<Scalars['String']>;
  versions: Maybe<Array<PaperTrailVersion>>;
};

export type AssignmentUserAssigneeAssignmentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Assignment. */
export type AssignmentConnection = {
  __typename?: 'AssignmentConnection';
  /** A list of edges. */
  edges: Array<AssignmentEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AssignmentEdge = {
  __typename?: 'AssignmentEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Assignment;
};

export type Assignment = {
  __typename?: 'Assignment';
  appLoginEmail: Maybe<Scalars['String']>;
  assignee: Maybe<AssignmentUser>;
  assigner: Maybe<AssignmentUser>;
  id: Scalars['ID'];
  state: AssignmentState;
  versions: Maybe<Array<PaperTrailVersion>>;
};

export enum AssignmentState {
  Accepted = 'ACCEPTED',
  Duplicate = 'DUPLICATE',
  Pending = 'PENDING',
}

export type Order = {
  __typename?: 'Order';
  /** @deprecated No longer used. Will always return 0 to maintain backwards compatiability. */
  amount: Scalars['Float'];
  completedAt: Scalars['ISO8601DateTime'];
  currency: Scalars['String'];
  id: Scalars['ID'];
  invoiceUrl: Maybe<Scalars['String']>;
  lastUpdatedAt: Scalars['ISO8601DateTime'];
  owner: AssignmentUser;
  reference: Scalars['String'];
  source: Maybe<OrderSource>;
  sourceId: Maybe<Scalars['ID']>;
  state: OrderFilterStatus;
  summary: OrderSummary;
  tickets: TicketConnection;
  ticketsSummary: TicketsSummary;
  versions: Maybe<Array<PaperTrailVersion>>;
};

export type OrderTicketsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  filter?: Maybe<TicketFilter>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export enum OrderSource {
  TicketMachine = 'TICKET_MACHINE',
  Tito = 'TITO',
}

export enum OrderFilterStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
}

export type OrderSummary = {
  __typename?: 'OrderSummary';
  ticketType: Maybe<TicketType>;
  /** @deprecated Use `order.ticketsSummary.all` instead. */
  tickets: Scalars['Int'];
};

export type TicketFilter = {
  assignment?: Maybe<TicketFilterAssignment>;
  status?: Maybe<TicketFilterStatus>;
  ticketTypeIds?: Maybe<Array<Scalars['ID']>>;
};

export enum TicketFilterAssignment {
  Assigned = 'ASSIGNED',
  Unassigned = 'UNASSIGNED',
}

export enum TicketFilterStatus {
  Accepted = 'ACCEPTED',
  Assigned = 'ASSIGNED',
  CheckedIn = 'CHECKED_IN',
  Duplicate = 'DUPLICATE',
  Locked = 'LOCKED',
  Rejected = 'REJECTED',
  Unassigned = 'UNASSIGNED',
  Void = 'VOID',
}

/** The connection type for Ticket. */
export type TicketConnection = {
  __typename?: 'TicketConnection';
  /** A list of edges. */
  edges: Array<TicketEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TicketEdge = {
  __typename?: 'TicketEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Ticket;
};

export type Ticket = {
  __typename?: 'Ticket';
  assignment: Maybe<Assignment>;
  assignments: Maybe<AssignmentConnection>;
  bookingRef: Scalars['String'];
  context: TicketContext;
  id: Scalars['ID'];
  order: Order;
  state: TicketState;
  ticketType: Maybe<TicketType>;
  versions: Maybe<Array<PaperTrailVersion>>;
};

export type TicketAssignmentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TicketContext = {
  __typename?: 'TicketContext';
  acceptable: Scalars['Boolean'];
  assignable: Scalars['Boolean'];
  editable: Scalars['Boolean'];
  rejectable: Scalars['Boolean'];
};

export enum TicketState {
  Accepted = 'ACCEPTED',
  CheckedIn = 'CHECKED_IN',
  Duplicate = 'DUPLICATE',
  Locked = 'LOCKED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Unassigned = 'UNASSIGNED',
  Void = 'VOID',
}

export type TicketsSummary = {
  __typename?: 'TicketsSummary';
  all: All;
};

export type All = {
  __typename?: 'All';
  active: Active;
  count: Scalars['Int'];
  void: Void;
};

export type Active = {
  __typename?: 'Active';
  assigned: Assigned;
  count: Scalars['Int'];
  unassigned: Unassigned;
};

export type Assigned = {
  __typename?: 'Assigned';
  accepted: Accepted;
  checkedIn: CheckedIn;
  count: Scalars['Int'];
  duplicate: Duplicate;
  locked: Locked;
  pending: Pending;
};

export type Accepted = {
  __typename?: 'Accepted';
  count: Scalars['Int'];
};

export type CheckedIn = {
  __typename?: 'CheckedIn';
  count: Scalars['Int'];
};

export type Duplicate = {
  __typename?: 'Duplicate';
  count: Scalars['Int'];
};

export type Locked = {
  __typename?: 'Locked';
  count: Scalars['Int'];
};

export type Pending = {
  __typename?: 'Pending';
  count: Scalars['Int'];
};

export type Unassigned = {
  __typename?: 'Unassigned';
  count: Scalars['Int'];
  neverAssigned: NeverAssigned;
  rejected: Rejected;
};

export type NeverAssigned = {
  __typename?: 'NeverAssigned';
  count: Scalars['Int'];
};

export type Rejected = {
  __typename?: 'Rejected';
  count: Scalars['Int'];
};

export type Void = {
  __typename?: 'Void';
  count: Scalars['Int'];
};

export type OrderFilter = {
  createdAtFrom?: Maybe<Scalars['ISO8601Date']>;
  createdAtTo?: Maybe<Scalars['ISO8601Date']>;
  status?: Maybe<OrderFilterStatus>;
  ticketTypeIds?: Maybe<Array<Scalars['ID']>>;
};

/** The connection type for Order. */
export type OrderConnection = {
  __typename?: 'OrderConnection';
  /** A list of edges. */
  edges: Array<OrderEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type OrderEdge = {
  __typename?: 'OrderEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Order;
};

export type TaEvent = {
  __typename?: 'TAEvent';
  companySizes: Scalars['JSONSchemaForm'];
  id: Scalars['ID'];
  industries: Scalars['JSONSchemaForm'];
  name: Maybe<Scalars['String']>;
  passportRequired: Scalars['Boolean'];
  slug: Scalars['String'];
};

export type CommerceAuditEntry = {
  __typename?: 'CommerceAuditEntry';
  action: Maybe<CommerceAuditEntryAction>;
  payload: Maybe<Scalars['JSON']>;
  reason: Maybe<Scalars['String']>;
  scopeId: Maybe<Scalars['ID']>;
  scopeType: Maybe<Scalars['String']>;
  target: Maybe<Scalars['ID']>;
  timestamp: Maybe<Scalars['Date']>;
  transactionId: Maybe<Scalars['ID']>;
  type: Maybe<Scalars['String']>;
  userData: Maybe<Scalars['JSON']>;
};

export enum CommerceAuditEntryAction {
  Create = 'CREATE',
  Delete = 'DELETE',
  Get = 'GET',
  List = 'LIST',
  NoOp = 'NO_OP',
  Update = 'UPDATE',
}

export type CommerceCategory = {
  __typename?: 'CommerceCategory';
  active: Maybe<Scalars['Boolean']>;
  children: Maybe<Array<CommerceCategory>>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  parent: Maybe<CommerceCategory>;
  products: Maybe<Array<CommerceProduct>>;
};

export type CommerceUser = {
  __typename?: 'CommerceUser';
  email: Scalars['String'];
  id: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type CommerceProduct = {
  __typename?: 'CommerceProduct';
  active: Maybe<Scalars['Boolean']>;
  categories: Maybe<Array<CommerceCategory>>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  defaultPrice: Maybe<Scalars['Int']>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  tags: Maybe<Array<CommerceTag>>;
  taxMode: Maybe<CommerceProductTaxMode>;
  taxType: CommerceTaxType;
};

export type CommerceTag = {
  __typename?: 'CommerceTag';
  code: Scalars['String'];
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
};

export enum CommerceProductTaxMode {
  B2B = 'B2B',
  B2C = 'B2C',
}

export type CommerceTaxType = {
  __typename?: 'CommerceTaxType';
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  name: Scalars['String'];
  taxes: Maybe<Array<CommerceTax>>;
};

export type CommerceTax = {
  __typename?: 'CommerceTax';
  country: Scalars['String'];
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  rateAmount: Scalars['Int'];
  rateType: CommerceTaxRateType;
  taxType: CommerceTaxType;
};

export enum CommerceTaxRateType {
  Absolute = 'ABSOLUTE',
  Percentage = 'PERCENTAGE',
}

export type CommerceCustomer = {
  __typename?: 'CommerceCustomer';
  address: Maybe<CommerceAddress>;
  companyName: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Maybe<Scalars['ID']>;
  lastName: Scalars['String'];
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  owner: Maybe<CommerceUser>;
  phoneNumber: Maybe<Scalars['String']>;
  vatNumber: Maybe<Scalars['String']>;
  vatVerified: Maybe<Scalars['Boolean']>;
};

export type CommerceAddress = {
  __typename?: 'CommerceAddress';
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  line1: Scalars['String'];
  line2: Maybe<Scalars['String']>;
  owner: Maybe<CommerceUser>;
  postalCode: Scalars['String'];
  state: Maybe<Scalars['String']>;
};

export type CommerceDeal = {
  __typename?: 'CommerceDeal';
  active: Maybe<Scalars['Boolean']>;
  code: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  dealItems: Maybe<Array<CommerceDealItem>>;
  description: Maybe<Scalars['String']>;
  endDate: Scalars['Date'];
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  startDate: Scalars['Date'];
  usages: Maybe<Scalars['Int']>;
};

export type CommerceDealItem = {
  __typename?: 'CommerceDealItem';
  amount: Scalars['Int'];
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  max: Scalars['Int'];
  metadata: Maybe<Scalars['JSON']>;
  min: Scalars['Int'];
  name: Maybe<Scalars['String']>;
  product: Maybe<CommerceProduct>;
  step: Scalars['Int'];
  type: CommerceDealItemType;
};

export enum CommerceDealItemType {
  AbsoluteDiscount = 'ABSOLUTE_DISCOUNT',
  AbsolutePrice = 'ABSOLUTE_PRICE',
  PercentageDiscount = 'PERCENTAGE_DISCOUNT',
}

export type CommerceOrder = {
  __typename?: 'CommerceOrder';
  applicableDeals: Maybe<Array<CommerceDeal>>;
  billed: Maybe<Scalars['Int']>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  currency: Maybe<Scalars['String']>;
  currencySymbol: Maybe<Scalars['String']>;
  customer: Maybe<CommerceCustomer>;
  deal: Maybe<CommerceDeal>;
  dealDiscount: Maybe<Scalars['Int']>;
  discountTotal: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['ID']>;
  invoiceUrl: Maybe<Scalars['String']>;
  itemSubtotal: Maybe<Scalars['Int']>;
  items: Array<CommerceOrderItem>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  locked: Maybe<Scalars['Boolean']>;
  metadata: Maybe<Scalars['JSON']>;
  owner: Maybe<CommerceUser>;
  paid: Maybe<Scalars['Int']>;
  paymentMethod: Maybe<CommercePaymentMethod>;
  paymentStatus: Maybe<CommerceOrderPaymentStatus>;
  reference: Maybe<Scalars['String']>;
  refundReceiptUrl: Maybe<Scalars['String']>;
  status: Maybe<CommerceOrderStatus>;
  subTotal: Maybe<Scalars['Int']>;
  taxTotal: Maybe<Scalars['Int']>;
  taxes: Maybe<Array<CommerceTaxSummary>>;
  total: Maybe<Scalars['Int']>;
  transactions: Maybe<Array<Maybe<CommerceTransaction>>>;
  url: Maybe<Scalars['String']>;
  valueTotal: Maybe<Scalars['Int']>;
  voucher: Maybe<CommerceVoucher>;
  voucherDiscount: Maybe<Scalars['Int']>;
};

export type CommerceOrderItem = {
  __typename?: 'CommerceOrderItem';
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  dealDiscount: Maybe<Scalars['Int']>;
  discountTotal: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['ID']>;
  itemName: Maybe<Scalars['String']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  price: Maybe<Scalars['Int']>;
  product: Maybe<CommerceProduct>;
  productMetadata: Maybe<Scalars['JSON']>;
  quantity: Scalars['Int'];
  subTotal: Maybe<Scalars['Int']>;
  tax: Maybe<CommerceTax>;
  taxTotal: Maybe<Scalars['Int']>;
  total: Maybe<Scalars['Int']>;
  valueTotal: Maybe<Scalars['Int']>;
  voucherDiscount: Maybe<Scalars['Int']>;
};

export type CommercePaymentMethod = {
  __typename?: 'CommercePaymentMethod';
  active: Maybe<Scalars['Boolean']>;
  configuration: Maybe<Scalars['JSON']>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  gateway: Scalars['ID'];
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  name: Scalars['String'];
};

export enum CommerceOrderPaymentStatus {
  Overpaid = 'OVERPAID',
  Paid = 'PAID',
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  Pending = 'PENDING',
  Refunded = 'REFUNDED',
}

export enum CommerceOrderStatus {
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  Pending = 'PENDING',
  Reinstated = 'REINSTATED',
}

export type CommerceTaxSummary = {
  __typename?: 'CommerceTaxSummary';
  name: Maybe<Scalars['String']>;
  netTotal: Maybe<Scalars['Int']>;
  rateAmount: Maybe<Scalars['Int']>;
  rateType: Maybe<CommerceTaxSummaryRateType>;
  taxId: Scalars['ID'];
  taxType: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export enum CommerceTaxSummaryRateType {
  Absolute = 'ABSOLUTE',
  Percentage = 'PERCENTAGE',
}

export type CommerceTransaction = {
  __typename?: 'CommerceTransaction';
  amount: Maybe<Scalars['Int']>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  currency: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  paymentMethod: Maybe<CommercePaymentMethod>;
  refundedTransaction: Maybe<Scalars['ID']>;
  status: Maybe<CommerceTransactionStatus>;
  taxDetails: Maybe<Array<CommerceTaxDetail>>;
  timestamp: Maybe<Scalars['Date']>;
  type: Maybe<CommerceTransactionType>;
};

export enum CommerceTransactionStatus {
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  Pending = 'PENDING',
}

export type CommerceTaxDetail = {
  __typename?: 'CommerceTaxDetail';
  taxId: Scalars['ID'];
  total: Scalars['Int'];
};

export enum CommerceTransactionType {
  Payment = 'PAYMENT',
  Refund = 'REFUND',
}

export type CommerceVoucher = {
  __typename?: 'CommerceVoucher';
  active: Maybe<Scalars['Boolean']>;
  amount: Scalars['Int'];
  code: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  type: CommerceVoucherType;
  usages: Maybe<Scalars['Int']>;
};

export enum CommerceVoucherType {
  Absolute = 'ABSOLUTE',
  Percentage = 'PERCENTAGE',
}

export type CommercePaymentGateway = {
  __typename?: 'CommercePaymentGateway';
  configKeys: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Maybe<Scalars['ID']>;
  name: Maybe<Scalars['String']>;
  sensitiveKeys: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CommerceSale = {
  __typename?: 'CommerceSale';
  active: Maybe<Scalars['Boolean']>;
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  description: Maybe<Scalars['String']>;
  endDate: Scalars['Date'];
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  saleProducts: Maybe<Array<CommerceSaleProduct>>;
  startDate: Scalars['Date'];
};

export type CommerceSaleProduct = {
  __typename?: 'CommerceSaleProduct';
  active: Maybe<Scalars['Boolean']>;
  amount: Scalars['Int'];
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  description: Maybe<Scalars['String']>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Maybe<Scalars['String']>;
  price: Maybe<Scalars['Int']>;
  product: Maybe<CommerceProduct>;
  type: CommerceSaleProductType;
};

export enum CommerceSaleProductType {
  AbsoluteDiscount = 'ABSOLUTE_DISCOUNT',
  AbsolutePrice = 'ABSOLUTE_PRICE',
  PercentageDiscount = 'PERCENTAGE_DISCOUNT',
}

export type CommerceStore = {
  __typename?: 'CommerceStore';
  active: Maybe<Scalars['Boolean']>;
  baseUrl: Scalars['String'];
  categories: Maybe<Array<CommerceCategory>>;
  country: Scalars['String'];
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  currency: Scalars['String'];
  currencySymbol: Maybe<Scalars['String']>;
  currentSales: Maybe<Array<CommerceSale>>;
  deals: Maybe<Array<CommerceDeal>>;
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  metadata: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  paymentMethods: Maybe<Array<CommercePaymentMethod>>;
  products: Maybe<Array<CommerceProduct>>;
  sales: Maybe<Array<CommerceSale>>;
  slug: Scalars['String'];
  stockMode: CommerceStoreStockMode;
  storeBilling: CommerceStoreBilling;
  tags: Maybe<Array<CommerceTag>>;
  taxErrors: Maybe<Array<Maybe<Scalars['String']>>>;
  taxTypes: Maybe<Array<CommerceTaxType>>;
  taxes: Maybe<Array<CommerceTax>>;
  vatNumber: Scalars['String'];
  vouchers: Maybe<Array<CommerceVoucher>>;
};

export enum CommerceStoreStockMode {
  None = 'NONE',
  Sale = 'SALE',
}

export type CommerceStoreBilling = {
  __typename?: 'CommerceStoreBilling';
  city: Scalars['String'];
  companyName: Scalars['String'];
  companyRegNumber: Maybe<Scalars['String']>;
  country: Scalars['String'];
  createdAt: Maybe<Scalars['Date']>;
  createdBy: Maybe<CommerceUser>;
  email: Scalars['String'];
  id: Maybe<Scalars['ID']>;
  lastUpdatedAt: Maybe<Scalars['Date']>;
  lastUpdatedBy: Maybe<CommerceUser>;
  line1: Scalars['String'];
  line2: Maybe<Scalars['String']>;
  note: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state: Maybe<Scalars['String']>;
  vatNumber: Scalars['String'];
};

export type CommerceSortTerm = {
  direction?: Maybe<CommerceSortTermDirection>;
  field?: Maybe<Scalars['String']>;
};

export enum CommerceSortTermDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type CommerceSearchTerm = {
  field?: Maybe<Scalars['String']>;
  op?: Maybe<CommerceSearchTermOp>;
  value?: Maybe<Scalars['Object']>;
};

export enum CommerceSearchTermOp {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  Like = 'like',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
}

export type CommerceSearchResponseCategory = {
  __typename?: 'CommerceSearchResponseCategory';
  hits: Maybe<Array<CommerceCategory>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSortTermOutput = {
  __typename?: 'CommerceSortTermOutput';
  direction: CommerceSortTermOutputDirection;
  field: Scalars['String'];
};

export enum CommerceSortTermOutputDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type CommerceSearchTermOutput = {
  __typename?: 'CommerceSearchTermOutput';
  field: Scalars['String'];
  op: CommerceSearchTermOutputOp;
  value: Scalars['Object'];
};

export enum CommerceSearchTermOutputOp {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  Like = 'like',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
}

export type CommerceSearchResponseCustomer = {
  __typename?: 'CommerceSearchResponseCustomer';
  hits: Maybe<Array<CommerceCustomer>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseDealItem = {
  __typename?: 'CommerceSearchResponseDealItem';
  hits: Maybe<Array<CommerceDealItem>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseDeal = {
  __typename?: 'CommerceSearchResponseDeal';
  hits: Maybe<Array<CommerceDeal>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseOrder = {
  __typename?: 'CommerceSearchResponseOrder';
  hits: Maybe<Array<CommerceOrder>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponsePaymentGateway = {
  __typename?: 'CommerceSearchResponsePaymentGateway';
  hits: Maybe<Array<Maybe<CommercePaymentGateway>>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponsePaymentMethod = {
  __typename?: 'CommerceSearchResponsePaymentMethod';
  hits: Maybe<Array<CommercePaymentMethod>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseProduct = {
  __typename?: 'CommerceSearchResponseProduct';
  hits: Maybe<Array<CommerceProduct>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseSaleProduct = {
  __typename?: 'CommerceSearchResponseSaleProduct';
  hits: Maybe<Array<CommerceSaleProduct>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseSale = {
  __typename?: 'CommerceSearchResponseSale';
  hits: Maybe<Array<CommerceSale>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseStore = {
  __typename?: 'CommerceSearchResponseStore';
  hits: Maybe<Array<CommerceStore>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseTag = {
  __typename?: 'CommerceSearchResponseTag';
  hits: Maybe<Array<CommerceTag>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseTaxType = {
  __typename?: 'CommerceSearchResponseTaxType';
  hits: Maybe<Array<CommerceTaxType>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseTax = {
  __typename?: 'CommerceSearchResponseTax';
  hits: Maybe<Array<CommerceTax>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

export type CommerceSearchResponseVoucher = {
  __typename?: 'CommerceSearchResponseVoucher';
  hits: Maybe<Array<CommerceVoucher>>;
  page: Maybe<Scalars['Int']>;
  pageSize: Maybe<Scalars['Int']>;
  sort: Maybe<Array<CommerceSortTermOutput>>;
  terms: Maybe<Array<CommerceSearchTermOutput>>;
  total: Maybe<Scalars['Int']>;
};

/** The connection type for EventConfigurationCountry. */
export type EventConfigurationCountryConnection = {
  __typename?: 'EventConfigurationCountryConnection';
  /** A list of edges. */
  edges: Array<EventConfigurationCountryEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EventConfigurationCountryEdge = {
  __typename?: 'EventConfigurationCountryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: EventConfigurationCountry;
};

export type EventConfigurationCountry = {
  __typename?: 'EventConfigurationCountry';
  /** ISO 3166-1 alpha-2 */
  code: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  /** Link to the public website of the event */
  baseUrl: Maybe<Scalars['String']>;
  /** Country where the event is hosted */
  country: Maybe<EventConfigurationCountry>;
  /** Main currency used for buying tickets */
  currency: Maybe<CurrencyCode>;
  description: Maybe<Scalars['String']>;
  /** Date at which the event ends */
  endDate: Maybe<Scalars['ISO8601Date']>;
  id: Scalars['ID'];
  /** Invoice information of the entity that sells the tickets */
  legalEntity: Maybe<LegalEntity>;
  /** Name of the event */
  name: Scalars['String'];
  /** Unique identifier of the event */
  slug: Scalars['String'];
  /** Date at which the event starts */
  startDate: Maybe<Scalars['ISO8601Date']>;
  taxNumber: Scalars['String'];
  /** Tax rates available for different countries from which the user can buy tickets */
  taxRates: Maybe<TaxRateConnection>;
  timeZone: Maybe<TimeZone>;
  /** Timezone of the country hosting the event */
  timezone: Maybe<Scalars['String']>;
  versions: Maybe<Array<PaperTrailVersion>>;
  brandName: Scalars['String'];
  companySizes: Maybe<Array<CompanySize>>;
  configuration: Maybe<ConferenceConfiguration>;
  industries: Maybe<Array<Industry>>;
  investorSessionsSummary: Maybe<Array<InvestorSessionsSummary>>;
  passportRequired: Maybe<Scalars['Boolean']>;
};

export type EventTaxRatesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type LegalEntity = {
  __typename?: 'LegalEntity';
  address: Maybe<Address>;
  email: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  note: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  regNumber: Maybe<Scalars['String']>;
  taxNumber: Maybe<Scalars['String']>;
  taxRate: Maybe<TaxRate>;
  versions: Maybe<Array<PaperTrailVersion>>;
  website: Maybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  city: Maybe<Scalars['String']>;
  country: Maybe<EventConfigurationCountry>;
  id: Scalars['ID'];
  lineOne: Maybe<Scalars['String']>;
  lineTwo: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  region: Maybe<Scalars['String']>;
};

export type TaxRate = {
  __typename?: 'TaxRate';
  country: EventConfigurationCountry;
  event: Event;
  id: Scalars['ID'];
  name: Scalars['String'];
  rateType: RateType;
  taxType: TaxType;
  value: Scalars['Float'];
};

export enum RateType {
  /** The tax is a fixed amount */
  Absolute = 'ABSOLUTE',
  /** The tax is calculated as a percentage of the order value */
  Percentage = 'PERCENTAGE',
}

export enum TaxType {
  Accommodation = 'ACCOMMODATION',
  Standard = 'STANDARD',
}

/** The connection type for TaxRate. */
export type TaxRateConnection = {
  __typename?: 'TaxRateConnection';
  /** A list of edges. */
  edges: Array<TaxRateEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TaxRateEdge = {
  __typename?: 'TaxRateEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TaxRate;
};

export type TimeZone = {
  __typename?: 'TimeZone';
  displayName: Scalars['String'];
  ianaName: Scalars['String'];
  utcOffset: Scalars['String'];
};

export type ConferenceConfiguration = {
  __typename?: 'ConferenceConfiguration';
  algoliaKey: Maybe<Scalars['String']>;
  investorMeetingConfiguration: Maybe<ConferenceInvestorMeetingConfiguration>;
  pubnubPublishKey: Maybe<Scalars['String']>;
  pubnubSecretKey: Maybe<Scalars['String']>;
  pubnubSubscribeKey: Maybe<Scalars['String']>;
};

export type ConferenceInvestorMeetingConfiguration = {
  __typename?: 'ConferenceInvestorMeetingConfiguration';
  defaultStartupSelections: Maybe<Scalars['Int']>;
  meetingsPerSession: Maybe<Scalars['Int']>;
  notifyOfficeHoursInvitees: Maybe<Scalars['Boolean']>;
  sessionDuration: Maybe<Scalars['Int']>;
  sponsorLogoUrl: Maybe<Scalars['String']>;
  startupPortalClosingAt: Maybe<Scalars['String']>;
  startupPortalOpeningAt: Maybe<Scalars['String']>;
  startupSelectionDeadline: Maybe<Scalars['String']>;
};

export type ConferenceInvestorMeetingConfigurationStartupPortalClosingAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type ConferenceInvestorMeetingConfigurationStartupPortalOpeningAtArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type ConferenceInvestorMeetingConfigurationStartupSelectionDeadlineArgs = {
  format?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

export type InvestorSessionsSummary = {
  __typename?: 'InvestorSessionsSummary';
  available: Maybe<Scalars['ID']>;
  claimed: Maybe<Scalars['ID']>;
  count: Maybe<Scalars['ID']>;
  endsAt: Maybe<Scalars['ISO8601DateTime']>;
  startsAt: Maybe<Scalars['ISO8601DateTime']>;
};

export type EventFilter = {
  endDateAfter?: Maybe<Scalars['ISO8601Date']>;
  endDateBefore?: Maybe<Scalars['ISO8601Date']>;
  startDateAfter?: Maybe<Scalars['ISO8601Date']>;
  startDateBefore?: Maybe<Scalars['ISO8601Date']>;
};

/** The connection type for Event. */
export type EventConnection = {
  __typename?: 'EventConnection';
  /** A list of edges. */
  edges: Array<EventEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EventEdge = {
  __typename?: 'EventEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Event;
};

/** The connection type for LegalEntity. */
export type LegalEntityConnection = {
  __typename?: 'LegalEntityConnection';
  /** A list of edges. */
  edges: Array<LegalEntityEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type LegalEntityEdge = {
  __typename?: 'LegalEntityEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: LegalEntity;
};

/** The connection type for TimeZone. */
export type TimeZoneConnection = {
  __typename?: 'TimeZoneConnection';
  /** A list of edges. */
  edges: Array<TimeZoneEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TimeZoneEdge = {
  __typename?: 'TimeZoneEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TimeZone;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBranding: Maybe<CreateBrandingPayload>;
  updateBranding: Maybe<UpdateBrandingPayload>;
  deleteBranding: Maybe<DeleteBrandingPayload>;
  createSite: Maybe<CreateSitePayload>;
  updateSite: Maybe<UpdateSitePayload>;
  deleteSite: Maybe<DeleteSitePayload>;
  createWebPageConfig: Maybe<CreateWebPageConfigPayload>;
  updateWebPageConfig: Maybe<UpdateWebPageConfigPayload>;
  deleteWebPageConfig: Maybe<DeleteWebPageConfigPayload>;
  forgotPassword: Maybe<UserPermissionsPasswordPayload>;
  submitDynamicFormstackForm: DynamicFormSubmissionPayload;
  /** Creates a ticket category */
  ticketCategoryCreate: Maybe<TicketCategoryCreatePayload>;
  /** Deletes a ticket category */
  ticketCategoryDelete: Maybe<TicketCategoryDeletePayload>;
  /** Updates a ticket category */
  ticketCategoryUpdate: Maybe<TicketCategoryUpdatePayload>;
  /** Creates a ticket release */
  ticketReleaseCreate: Maybe<TicketReleaseCreatePayload>;
  /** Creates a ticket release phase */
  ticketReleasePhaseCreate: Maybe<TicketReleasePhaseCreatePayload>;
  /** Deletes a ticket release phase */
  ticketReleasePhaseDelete: Maybe<TicketReleasePhaseDeletePayload>;
  /** Updates a ticket release phase */
  ticketReleasePhaseUpdate: Maybe<TicketReleasePhaseUpdatePayload>;
  /** Updates a ticket release */
  ticketReleaseUpdate: Maybe<TicketReleaseUpdatePayload>;
  adminAssignRole: Maybe<AdminAssignRolePayload>;
  adminCreate: Maybe<AdminCreatePayload>;
  adminUnassignRole: Maybe<AdminUnassignRolePayload>;
  adminUpdate: Maybe<AdminUpdatePayload>;
  attendanceAppearanceSelectionDestroy: Maybe<AttendanceAppearanceSelectionDestroyPayload>;
  attendanceAppearanceSelectionUpdate: Maybe<AttendanceAppearanceSelectionsUpdatePayload>;
  attendanceInvestorSessionUpdate: Maybe<AttendanceInvestorSessionUpdatePayload>;
  attendeeProfileUpdate: Maybe<AttendeeProfileUpdatePayload>;
  authenticateByToken: Maybe<AuthenticateByTokenPayload>;
  connectionLinkRemove: Maybe<ConnectionLinkRemovePayload>;
  connectionRequestAccept: Maybe<ConnectionRequestAcceptPayload>;
  connectionRequestCreate: Maybe<ConnectionRequestCreatePayload>;
  connectionRequestReject: Maybe<ConnectionRequestRejectPayload>;
  investorAccessGrant: Maybe<InvestorAccessGrantPayload>;
  investorMeetingConfigurationUpdate: Maybe<InvestorMeetingConfigurationUpdatePayload>;
  investorPortalRevokeAccess: Maybe<InvestorPortalRevokeAccessPayload>;
  investorSessionsCreate: Maybe<InvestorSessionsCreatePayload>;
  magicLinkGenerate: Maybe<MagicLinkGeneratePayload>;
  magicLinkScheduleDelivery: Maybe<MagicLinkScheduleDeliveryPayload>;
  myConnectionsEmailSend: Maybe<MyConnectionsEmailSendPayload>;
  sessionTimeslotParticipationCreate: Maybe<SessionTimeslotParticipationCreatePayload>;
  userRoleCreate: Maybe<UserRoleCreatePayload>;
  userRoleUpdate: Maybe<UserRoleUpdatePayload>;
  assignmentAccountUpdate: Maybe<AssignmentAccountUpdatePayload>;
  assignmentAuthenticate: Maybe<AssignmentAuthenticatePayload>;
  /** Returns a login link for the specified account for a given conference. */
  assignmentMagicLinkGenerate: Maybe<AssignmentMagicLinkGeneratePayload>;
  assignmentMagicLinkLoginRequest: Maybe<AssignmentMagicLinkLoginRequestPayload>;
  assignmentProfileAdminUpdate: Maybe<AssignmentProfileAdminUpdatePayload>;
  assignmentProfileUpdate: Maybe<AssignmentProfileUpdatePayload>;
  assignmentSalesforceAccountUpdate: Maybe<AssignmentSalesforceAccountUpdatePayload>;
  assignmentTicketLoginUpdate: Maybe<AssignmentTicketLoginUpdatePayload>;
  orderCancel: Maybe<OrderCancelPayload>;
  orderCreate: Maybe<OrderCreatePayload>;
  orderUpdate: Maybe<OrderUpdatePayload>;
  ticketAccept: Maybe<TicketAcceptPayload>;
  ticketAssign: Maybe<TicketAssignPayload>;
  ticketCreate: Maybe<TicketCreatePayload>;
  ticketLock: Maybe<TicketLockPayload>;
  ticketReject: Maybe<TicketRejectPayload>;
  ticketUnlock: Maybe<TicketUnlockPayload>;
  ticketUnvoid: Maybe<TicketUnvoidPayload>;
  ticketUpdate: Maybe<TicketUpdatePayload>;
  ticketVoid: Maybe<TicketVoidPayload>;
  /** *Equivalent to POST /commerce/stores/{storeId}/categories* */
  commerceCreateCategory: Maybe<CommerceCategory>;
  /** *Equivalent to POST /commerce/stores/{storeId}/orders/{orderId}/customers* */
  commerceCreateCustomer: Maybe<CommerceCustomer>;
  /** *Equivalent to POST /commerce/stores/{storeId}/deals* */
  commerceCreateDeal: Maybe<CommerceDeal>;
  /** *Equivalent to POST /commerce/stores/{storeId}/deals/{dealId}/dealItems* */
  commerceCreateDealItem: Maybe<CommerceDealItem>;
  /**
   * *Equivalent to POST /commerce/stores/{storeId}/orders*
   * # Creating an Order
   *
   * When creating an order as an admin that is not meant for yourself make sure you pass the `X-Owner` header.
   *
   * This header will ensure that the order belongs to the user who's UUID was passed in the header.
   *
   * If an invalid UUID is passed in this header it is assumed that the intention of the caller is to generate a new
   * order for an unidentified new user (the server generates a new UUID to set as the owner).
   */
  commerceCreateOrder: Maybe<CommerceOrder>;
  /** *Equivalent to POST /commerce/stores/{storeId}/paymentMethods* */
  commerceCreatePaymentMethod: Maybe<CommercePaymentMethod>;
  /** *Equivalent to POST /commerce/stores/{storeId}/products* */
  commerceCreateProduct: Maybe<CommerceProduct>;
  /** *Equivalent to POST /commerce/stores/{storeId}/sales* */
  commerceCreateSale: Maybe<CommerceSale>;
  /** *Equivalent to POST /commerce/stores/{storeId}/sales/{saleId}/saleProducts* */
  commerceCreateSaleProduct: Maybe<CommerceSaleProduct>;
  /** *Equivalent to POST /commerce/stores* */
  commerceCreateStore: Maybe<CommerceStore>;
  /** *Equivalent to POST /commerce/stores/{storeId}/tags* */
  commerceCreateTag: Maybe<CommerceTag>;
  /** *Equivalent to POST /commerce/stores/{storeId}/taxes* */
  commerceCreateTax: Maybe<CommerceTax>;
  /** *Equivalent to POST /commerce/stores/{storeId}/taxTypes* */
  commerceCreateTaxType: Maybe<CommerceTaxType>;
  /** *Equivalent to POST /commerce/stores/{storeId}/orders/{orderId}/transactions* */
  commerceCreateTransaction: Maybe<CommerceTransaction>;
  /** *Equivalent to POST /commerce/stores/{storeId}/vouchers* */
  commerceCreateVoucher: Maybe<CommerceVoucher>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/categories/{id}* */
  commerceDeleteCategory: Maybe<CommerceCategory>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/orders/{orderId}/customers/{id}* */
  commerceDeleteCustomer: Maybe<CommerceCustomer>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/deals/{id}* */
  commerceDeleteDeal: Maybe<CommerceDeal>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/deals/{dealId}/dealItems/{id}* */
  commerceDeleteDealItem: Maybe<CommerceDealItem>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/paymentMethods/{id}* */
  commerceDeletePaymentMethod: Maybe<CommercePaymentMethod>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/products/{id}* */
  commerceDeleteProduct: Maybe<CommerceProduct>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/sales/{id}* */
  commerceDeleteSale: Maybe<CommerceSale>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/sales/{saleId}/saleProducts/{id}* */
  commerceDeleteSaleProduct: Maybe<CommerceSaleProduct>;
  /** *Equivalent to DELETE /commerce/stores/{id}* */
  commerceDeleteStore: Maybe<CommerceStore>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/tags/{id}* */
  commerceDeleteTag: Maybe<CommerceTag>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/taxes/{id}* */
  commerceDeleteTax: Maybe<CommerceTax>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/taxTypes/{id}* */
  commerceDeleteTaxType: Maybe<CommerceTaxType>;
  /** *Equivalent to DELETE /commerce/stores/{storeId}/vouchers/{id}* */
  commerceDeleteVoucher: Maybe<CommerceVoucher>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/categories/{id}* */
  commerceUpdateCategory: Maybe<CommerceCategory>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/orders/{orderId}/customers/{id}* */
  commerceUpdateCustomer: Maybe<CommerceCustomer>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/deals/{id}* */
  commerceUpdateDeal: Maybe<CommerceDeal>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/deals/{dealId}/dealItems/{id}* */
  commerceUpdateDealItem: Maybe<CommerceDealItem>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/orders/{id}* */
  commerceUpdateOrder: Maybe<CommerceOrder>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/paymentMethods/{id}* */
  commerceUpdatePaymentMethod: Maybe<CommercePaymentMethod>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/products/{id}* */
  commerceUpdateProduct: Maybe<CommerceProduct>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/sales/{id}* */
  commerceUpdateSale: Maybe<CommerceSale>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/sales/{saleId}/saleProducts/{id}* */
  commerceUpdateSaleProduct: Maybe<CommerceSaleProduct>;
  /** *Equivalent to PUT /commerce/stores/{id}* */
  commerceUpdateStore: Maybe<CommerceStore>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/tags/{id}* */
  commerceUpdateTag: Maybe<CommerceTag>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/taxes/{id}* */
  commerceUpdateTax: Maybe<CommerceTax>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/taxTypes/{id}* */
  commerceUpdateTaxType: Maybe<CommerceTaxType>;
  /** *Equivalent to PUT /commerce/stores/{storeId}/vouchers/{id}* */
  commerceUpdateVoucher: Maybe<CommerceVoucher>;
  /** Creates a new event */
  eventCreate: Maybe<EventCreatePayload>;
  /** Updates an existing event */
  eventUpdate: Maybe<EventUpdatePayload>;
  /** Creates a legal entity */
  legalEntityCreate: Maybe<LegalEntityCreatePayload>;
  /** Updates an existing legal entity */
  legalEntityUpdate: Maybe<LegalEntityUpdatePayload>;
  /** Creates a tax rate for for an event and a specific country. */
  taxRateCreate: Maybe<TaxRateCreatePayload>;
  /** Updates an existing tax rate */
  taxRateUpdate: Maybe<TaxRateUpdatePayload>;
};

export type MutationCreateBrandingArgs = {
  input?: Maybe<CreateBrandingInput>;
};

export type MutationUpdateBrandingArgs = {
  input?: Maybe<UpdateBrandingInput>;
};

export type MutationDeleteBrandingArgs = {
  input?: Maybe<DeleteBrandingInput>;
};

export type MutationCreateSiteArgs = {
  input?: Maybe<CreateSiteInput>;
};

export type MutationUpdateSiteArgs = {
  input?: Maybe<UpdateSiteInput>;
};

export type MutationDeleteSiteArgs = {
  input?: Maybe<DeleteSiteInput>;
};

export type MutationCreateWebPageConfigArgs = {
  input?: Maybe<CreateWebPageConfigInput>;
};

export type MutationUpdateWebPageConfigArgs = {
  input?: Maybe<UpdateWebPageConfigInput>;
};

export type MutationDeleteWebPageConfigArgs = {
  input?: Maybe<DeleteWebPageConfigInput>;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationSubmitDynamicFormstackFormArgs = {
  id: Scalars['ID'];
  input: Scalars['JSON'];
};

export type MutationTicketCategoryCreateArgs = {
  input: TicketCategoryCreateInput;
};

export type MutationTicketCategoryDeleteArgs = {
  input: TicketCategoryDeleteInput;
};

export type MutationTicketCategoryUpdateArgs = {
  input: TicketCategoryUpdateInput;
};

export type MutationTicketReleaseCreateArgs = {
  input: TicketReleaseCreateInput;
};

export type MutationTicketReleasePhaseCreateArgs = {
  input: TicketReleasePhaseCreateInput;
};

export type MutationTicketReleasePhaseDeleteArgs = {
  input: TicketReleasePhaseDeleteInput;
};

export type MutationTicketReleasePhaseUpdateArgs = {
  input: TicketReleasePhaseUpdateInput;
};

export type MutationTicketReleaseUpdateArgs = {
  input: TicketReleaseUpdateInput;
};

export type MutationAdminAssignRoleArgs = {
  input: AdminAssignRoleInput;
};

export type MutationAdminCreateArgs = {
  input: AdminCreateInput;
};

export type MutationAdminUnassignRoleArgs = {
  input: AdminUnassignRoleInput;
};

export type MutationAdminUpdateArgs = {
  input: AdminUpdateInput;
};

export type MutationAttendanceAppearanceSelectionDestroyArgs = {
  input: AttendanceAppearanceSelectionDestroyInput;
};

export type MutationAttendanceAppearanceSelectionUpdateArgs = {
  input: AttendanceAppearanceSelectionsUpdateInput;
};

export type MutationAttendanceInvestorSessionUpdateArgs = {
  input: AttendanceInvestorSessionUpdateInput;
};

export type MutationAttendeeProfileUpdateArgs = {
  input: AttendeeProfileUpdateInput;
};

export type MutationAuthenticateByTokenArgs = {
  input: AuthenticateByTokenInput;
};

export type MutationConnectionLinkRemoveArgs = {
  input: ConnectionLinkRemoveInput;
};

export type MutationConnectionRequestAcceptArgs = {
  input: ConnectionRequestAcceptInput;
};

export type MutationConnectionRequestCreateArgs = {
  input: ConnectionRequestCreateInput;
};

export type MutationConnectionRequestRejectArgs = {
  input: ConnectionRequestRejectInput;
};

export type MutationInvestorAccessGrantArgs = {
  input: InvestorAccessGrantInput;
};

export type MutationInvestorMeetingConfigurationUpdateArgs = {
  input: InvestorMeetingConfigurationUpdateInput;
};

export type MutationInvestorPortalRevokeAccessArgs = {
  input: InvestorPortalRevokeAccessInput;
};

export type MutationInvestorSessionsCreateArgs = {
  input: InvestorSessionsCreateInput;
};

export type MutationMagicLinkGenerateArgs = {
  input: MagicLinkGenerateInput;
};

export type MutationMagicLinkScheduleDeliveryArgs = {
  input: MagicLinkScheduleDeliveryInput;
};

export type MutationMyConnectionsEmailSendArgs = {
  input: MyConnectionsEmailSendInput;
};

export type MutationSessionTimeslotParticipationCreateArgs = {
  input: SessionTimeslotParticipationCreateInput;
};

export type MutationUserRoleCreateArgs = {
  input: UserRoleCreateInput;
};

export type MutationUserRoleUpdateArgs = {
  input: UserRoleUpdateInput;
};

export type MutationAssignmentAccountUpdateArgs = {
  input: AssignmentAccountUpdateInput;
};

export type MutationAssignmentAuthenticateArgs = {
  input: AssignmentAuthenticateInput;
};

export type MutationAssignmentMagicLinkGenerateArgs = {
  input: AssignmentMagicLinkGenerateInput;
};

export type MutationAssignmentMagicLinkLoginRequestArgs = {
  input: AssignmentMagicLinkLoginRequestInput;
};

export type MutationAssignmentProfileAdminUpdateArgs = {
  input: AssignmentProfileAdminUpdateInput;
};

export type MutationAssignmentProfileUpdateArgs = {
  input: AssignmentProfileUpdateInput;
};

export type MutationAssignmentSalesforceAccountUpdateArgs = {
  input: AssignmentSalesforceAccountUpdateInput;
};

export type MutationAssignmentTicketLoginUpdateArgs = {
  input: AssignmentTicketLoginUpdateInput;
};

export type MutationOrderCancelArgs = {
  input: OrderCancelInput;
};

export type MutationOrderCreateArgs = {
  input: OrderCreateInput;
};

export type MutationOrderUpdateArgs = {
  input: OrderUpdateInput;
};

export type MutationTicketAcceptArgs = {
  input: TicketAcceptInput;
};

export type MutationTicketAssignArgs = {
  input: TicketAssignInput;
};

export type MutationTicketCreateArgs = {
  input: TicketCreateInput;
};

export type MutationTicketLockArgs = {
  input: TicketLockInput;
};

export type MutationTicketRejectArgs = {
  input: TicketRejectInput;
};

export type MutationTicketUnlockArgs = {
  input: TicketUnlockInput;
};

export type MutationTicketUnvoidArgs = {
  input: TicketUnvoidInput;
};

export type MutationTicketUpdateArgs = {
  input: TicketUpdateInput;
};

export type MutationTicketVoidArgs = {
  input: TicketVoidInput;
};

export type MutationCommerceCreateCategoryArgs = {
  commerceCategoryCreate: CommerceCategoryCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateCustomerArgs = {
  commerceCustomerCreate: CommerceCustomerCreate;
  orderId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateDealArgs = {
  commerceDealCreate: CommerceDealCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateDealItemArgs = {
  commerceDealItemCreate: CommerceDealItemCreate;
  dealId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateOrderArgs = {
  commerceOrderCreate: CommerceOrderCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreatePaymentMethodArgs = {
  commercePaymentMethodCreate: CommercePaymentMethodCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateProductArgs = {
  commerceProductCreate: CommerceProductCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateSaleArgs = {
  commerceSaleCreate: CommerceSaleCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateSaleProductArgs = {
  commerceSaleProductCreate: CommerceSaleProductCreate;
  saleId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateStoreArgs = {
  commerceStoreCreate: CommerceStoreCreate;
};

export type MutationCommerceCreateTagArgs = {
  commerceTagCreate: CommerceTagCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateTaxArgs = {
  commerceTaxCreate: CommerceTaxCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateTaxTypeArgs = {
  commerceTaxTypeCreate: CommerceTaxTypeCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateTransactionArgs = {
  commerceTransactionCreate: CommerceTransactionCreate;
  orderId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceCreateVoucherArgs = {
  commerceVoucherCreate: CommerceVoucherCreate;
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteCategoryArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteCustomerArgs = {
  id: Scalars['ID'];
  orderId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteDealArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteDealItemArgs = {
  dealId: Scalars['ID'];
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeletePaymentMethodArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteProductArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteSaleArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteSaleProductArgs = {
  id: Scalars['ID'];
  saleId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteStoreArgs = {
  id: Scalars['ID'];
};

export type MutationCommerceDeleteTagArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteTaxArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteTaxTypeArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceDeleteVoucherArgs = {
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateCategoryArgs = {
  commerceCategoryUpdate: CommerceCategoryUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateCustomerArgs = {
  commerceCustomerUpdate: CommerceCustomerUpdate;
  id: Scalars['ID'];
  orderId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateDealArgs = {
  commerceDealUpdate: CommerceDealUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateDealItemArgs = {
  commerceDealItemUpdate: CommerceDealItemUpdate;
  dealId: Scalars['ID'];
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateOrderArgs = {
  commerceOrderUpdate: CommerceOrderUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdatePaymentMethodArgs = {
  commercePaymentMethodUpdate: CommercePaymentMethodUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateProductArgs = {
  commerceProductUpdate: CommerceProductUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateSaleArgs = {
  commerceSaleUpdate: CommerceSaleUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateSaleProductArgs = {
  commerceSaleProductUpdate: CommerceSaleProductUpdate;
  id: Scalars['ID'];
  saleId: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateStoreArgs = {
  commerceStoreUpdate: CommerceStoreUpdate;
  id: Scalars['ID'];
};

export type MutationCommerceUpdateTagArgs = {
  commerceTagUpdate: CommerceTagUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateTaxArgs = {
  commerceTaxUpdate: CommerceTaxUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateTaxTypeArgs = {
  commerceTaxTypeUpdate: CommerceTaxTypeUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationCommerceUpdateVoucherArgs = {
  commerceVoucherUpdate: CommerceVoucherUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
};

export type MutationEventCreateArgs = {
  input: EventCreateInput;
};

export type MutationEventUpdateArgs = {
  input: EventUpdateInput;
};

export type MutationLegalEntityCreateArgs = {
  input: LegalEntityCreateInput;
};

export type MutationLegalEntityUpdateArgs = {
  input: LegalEntityUpdateInput;
};

export type MutationTaxRateCreateArgs = {
  input: TaxRateCreateInput;
};

export type MutationTaxRateUpdateArgs = {
  input: TaxRateUpdateInput;
};

export type CreateBrandingInput = {
  data?: Maybe<BrandingInput>;
};

export type BrandingInput = {
  title?: Maybe<Scalars['String']>;
  googleFontsUrl?: Maybe<Scalars['String']>;
  typekitFontsUrl?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['JSON']>;
  events?: Maybe<Array<Scalars['ID']>>;
  logo?: Maybe<Scalars['ID']>;
  headerBranding?: Maybe<Scalars['ID']>;
  favicon?: Maybe<Scalars['ID']>;
  ticketLogo?: Maybe<Scalars['ID']>;
  invoiceHeader?: Maybe<Scalars['ID']>;
  invoiceFooter?: Maybe<Scalars['ID']>;
  invoiceStamp?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateBrandingPayload = {
  __typename?: 'createBrandingPayload';
  branding: Maybe<Branding>;
};

export type UpdateBrandingInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditBrandingInput>;
};

export type InputId = {
  id: Scalars['ID'];
};

export type EditBrandingInput = {
  title?: Maybe<Scalars['String']>;
  googleFontsUrl?: Maybe<Scalars['String']>;
  typekitFontsUrl?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['JSON']>;
  events?: Maybe<Array<Scalars['ID']>>;
  logo?: Maybe<Scalars['ID']>;
  headerBranding?: Maybe<Scalars['ID']>;
  favicon?: Maybe<Scalars['ID']>;
  ticketLogo?: Maybe<Scalars['ID']>;
  invoiceHeader?: Maybe<Scalars['ID']>;
  invoiceFooter?: Maybe<Scalars['ID']>;
  invoiceStamp?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateBrandingPayload = {
  __typename?: 'updateBrandingPayload';
  branding: Maybe<Branding>;
};

export type DeleteBrandingInput = {
  where?: Maybe<InputId>;
};

export type DeleteBrandingPayload = {
  __typename?: 'deleteBrandingPayload';
  branding: Maybe<Branding>;
};

export type CreateSiteInput = {
  data?: Maybe<SiteInput>;
};

export type SiteInput = {
  title?: Maybe<Scalars['String']>;
  host: Scalars['String'];
  events?: Maybe<Array<Scalars['ID']>>;
  webPages?: Maybe<Array<Scalars['ID']>>;
  activeEvent?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateSitePayload = {
  __typename?: 'createSitePayload';
  site: Maybe<Site>;
};

export type UpdateSiteInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditSiteInput>;
};

export type EditSiteInput = {
  title?: Maybe<Scalars['String']>;
  host?: Maybe<Scalars['String']>;
  events?: Maybe<Array<Scalars['ID']>>;
  webPages?: Maybe<Array<Scalars['ID']>>;
  activeEvent?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateSitePayload = {
  __typename?: 'updateSitePayload';
  site: Maybe<Site>;
};

export type DeleteSiteInput = {
  where?: Maybe<InputId>;
};

export type DeleteSitePayload = {
  __typename?: 'deleteSitePayload';
  site: Maybe<Site>;
};

export type CreateWebPageConfigInput = {
  data?: Maybe<WebPageConfigInput>;
};

export type WebPageConfigInput = {
  title?: Maybe<Scalars['String']>;
  googleTagManagerId?: Maybe<Scalars['String']>;
  googleAnalyticsTrackingId?: Maybe<Scalars['String']>;
  baseGoogleAnalyticsTrackingId?: Maybe<Scalars['String']>;
  googleOptimizeId?: Maybe<Scalars['String']>;
  googleAnalyticsLinkerDomains: Array<ComponentSiteConfigGoogleAnalyticsLinkerDomainListInput>;
  metaData?: Maybe<ComponentSiteConfigMetaDatumInput>;
  events?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ComponentSiteConfigGoogleAnalyticsLinkerDomainListInput = {
  domain?: Maybe<Scalars['String']>;
};

export type ComponentSiteConfigMetaDatumInput = {
  image?: Maybe<Scalars['ID']>;
  siteTitle: Scalars['String'];
  siteDescription: Scalars['String'];
  facebookId?: Maybe<Scalars['String']>;
  facebookPublisher?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
  twitterCreator?: Maybe<Scalars['String']>;
};

export type CreateWebPageConfigPayload = {
  __typename?: 'createWebPageConfigPayload';
  webPageConfig: Maybe<WebPageConfig>;
};

export type UpdateWebPageConfigInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditWebPageConfigInput>;
};

export type EditWebPageConfigInput = {
  title?: Maybe<Scalars['String']>;
  googleTagManagerId?: Maybe<Scalars['String']>;
  googleAnalyticsTrackingId?: Maybe<Scalars['String']>;
  baseGoogleAnalyticsTrackingId?: Maybe<Scalars['String']>;
  googleOptimizeId?: Maybe<Scalars['String']>;
  googleAnalyticsLinkerDomains: Array<EditComponentSiteConfigGoogleAnalyticsLinkerDomainListInput>;
  metaData?: Maybe<EditComponentSiteConfigMetaDatumInput>;
  events?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentSiteConfigGoogleAnalyticsLinkerDomainListInput = {
  id?: Maybe<Scalars['ID']>;
  domain?: Maybe<Scalars['String']>;
};

export type EditComponentSiteConfigMetaDatumInput = {
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['ID']>;
  siteTitle?: Maybe<Scalars['String']>;
  siteDescription?: Maybe<Scalars['String']>;
  facebookId?: Maybe<Scalars['String']>;
  facebookPublisher?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
  twitterCreator?: Maybe<Scalars['String']>;
};

export type UpdateWebPageConfigPayload = {
  __typename?: 'updateWebPageConfigPayload';
  webPageConfig: Maybe<WebPageConfig>;
};

export type DeleteWebPageConfigInput = {
  where?: Maybe<InputId>;
};

export type DeleteWebPageConfigPayload = {
  __typename?: 'deleteWebPageConfigPayload';
  webPageConfig: Maybe<WebPageConfig>;
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload';
  ok: Scalars['Boolean'];
};

export type DynamicFormSubmissionPayload = {
  __typename?: 'DynamicFormSubmissionPayload';
  dynamicForm: Maybe<DynamicForm>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<DynamicFormSubmissionError>;
};

export type DynamicFormSubmissionError = {
  __typename?: 'DynamicFormSubmissionError';
  field: Maybe<Array<Scalars['String']>>;
  message: Scalars['String'];
};

/** Autogenerated input type of TicketCategoryCreate */
export type TicketCategoryCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** Autogenerated return type of TicketCategoryCreate */
export type TicketCategoryCreatePayload = {
  __typename?: 'TicketCategoryCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticketCategory: Maybe<TicketCategory>;
  userErrors: Array<UserError>;
};

export type UserError = {
  __typename?: 'UserError';
  /** A description of the error */
  message: Scalars['String'];
  /** Which input value this error came from */
  path: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated input type of TicketCategoryDelete */
export type TicketCategoryDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of TicketCategoryDelete */
export type TicketCategoryDeletePayload = {
  __typename?: 'TicketCategoryDeletePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticketCategory: Maybe<TicketCategory>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketCategoryUpdate */
export type TicketCategoryUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** Autogenerated return type of TicketCategoryUpdate */
export type TicketCategoryUpdatePayload = {
  __typename?: 'TicketCategoryUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticketCategory: Maybe<TicketCategory>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketReleaseCreate */
export type TicketReleaseCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currency: CurrencyCode;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  priceApplicationEmail?: Maybe<Scalars['String']>;
  priceSubunits: Scalars['Int'];
  productVariantId?: Maybe<Scalars['ID']>;
  soldOut?: Maybe<Scalars['Boolean']>;
  sortOrder?: Maybe<Scalars['Int']>;
  ticketReleasePhaseId: Scalars['ID'];
  ticketTypeId: Scalars['ID'];
};

/** Autogenerated return type of TicketReleaseCreate */
export type TicketReleaseCreatePayload = {
  __typename?: 'TicketReleaseCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticketRelease: Maybe<TicketRelease>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketReleasePhaseCreate */
export type TicketReleasePhaseCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endsAt: Scalars['String'];
  name: Scalars['String'];
  startsAt: Scalars['String'];
};

/** Autogenerated return type of TicketReleasePhaseCreate */
export type TicketReleasePhaseCreatePayload = {
  __typename?: 'TicketReleasePhaseCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticketReleasePhase: Maybe<TicketReleasePhase>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketReleasePhaseDelete */
export type TicketReleasePhaseDeleteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of TicketReleasePhaseDelete */
export type TicketReleasePhaseDeletePayload = {
  __typename?: 'TicketReleasePhaseDeletePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketReleasePhaseUpdate */
export type TicketReleasePhaseUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endsAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  startsAt?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of TicketReleasePhaseUpdate */
export type TicketReleasePhaseUpdatePayload = {
  __typename?: 'TicketReleasePhaseUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticketReleasePhase: Maybe<TicketReleasePhase>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketReleaseUpdate */
export type TicketReleaseUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currency?: Maybe<CurrencyCode>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  priceApplicationEmail?: Maybe<Scalars['String']>;
  priceSubunits?: Maybe<Scalars['Int']>;
  productVariantId?: Maybe<Scalars['ID']>;
  soldOut?: Maybe<Scalars['Boolean']>;
  sortOrder?: Maybe<Scalars['Int']>;
  ticketReleasePhaseId?: Maybe<Scalars['ID']>;
  ticketTypeId?: Maybe<Scalars['ID']>;
};

/** Autogenerated return type of TicketReleaseUpdate */
export type TicketReleaseUpdatePayload = {
  __typename?: 'TicketReleaseUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticketRelease: Maybe<TicketRelease>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AdminAssignRole */
export type AdminAssignRoleInput = {
  adminId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  userRoleId: Scalars['ID'];
};

/** Autogenerated return type of AdminAssignRole */
export type AdminAssignRolePayload = {
  __typename?: 'AdminAssignRolePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  role: Maybe<Role>;
  userErrors: Array<UserError>;
};

export type Role = {
  __typename?: 'Role';
  admin: Admin;
  id: Scalars['ID'];
  userRole: UserRole;
};

/** Autogenerated input type of AdminCreate */
export type AdminCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
};

/** Autogenerated return type of AdminCreate */
export type AdminCreatePayload = {
  __typename?: 'AdminCreatePayload';
  admin: Maybe<Admin>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AdminUnassignRole */
export type AdminUnassignRoleInput = {
  adminId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  userRoleId: Scalars['ID'];
};

/** Autogenerated return type of AdminUnassignRole */
export type AdminUnassignRolePayload = {
  __typename?: 'AdminUnassignRolePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  role: Maybe<Role>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AdminUpdate */
export type AdminUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated return type of AdminUpdate */
export type AdminUpdatePayload = {
  __typename?: 'AdminUpdatePayload';
  admin: Maybe<Admin>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AttendanceAppearanceSelectionDestroy */
export type AttendanceAppearanceSelectionDestroyInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of AttendanceAppearanceSelectionDestroy */
export type AttendanceAppearanceSelectionDestroyPayload = {
  __typename?: 'AttendanceAppearanceSelectionDestroyPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AttendanceAppearanceSelectionsUpdate */
export type AttendanceAppearanceSelectionsUpdateInput = {
  attendanceIds: Array<Scalars['ID']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  status: Scalars['String'];
};

/** Autogenerated return type of AttendanceAppearanceSelectionsUpdate */
export type AttendanceAppearanceSelectionsUpdatePayload = {
  __typename?: 'AttendanceAppearanceSelectionsUpdatePayload';
  attendances: Maybe<AttendeeConnection>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated return type of AttendanceAppearanceSelectionsUpdate */
export type AttendanceAppearanceSelectionsUpdatePayloadAttendancesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Autogenerated input type of AttendanceInvestorSessionUpdate */
export type AttendanceInvestorSessionUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  investorSessionConfiguration?: Maybe<InvestorSessionConfiguration>;
};

export type InvestorSessionConfiguration = {
  attendanceId: Scalars['ID'];
  startsAt?: Maybe<Scalars['ISO8601DateTime']>;
  unlockInvestor: Scalars['Boolean'];
};

/** Autogenerated return type of AttendanceInvestorSessionUpdate */
export type AttendanceInvestorSessionUpdatePayload = {
  __typename?: 'AttendanceInvestorSessionUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AttendeeProfileUpdate */
export type AttendeeProfileUpdateInput = {
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companySizeId?: Maybe<Scalars['ID']>;
  countryId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  industryId?: Maybe<Scalars['ID']>;
  jobTitle?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  marketingConsent?: Maybe<Scalars['String']>;
  offeringTopicIds?: Maybe<Array<Scalars['ID']>>;
  passportNumber?: Maybe<Scalars['String']>;
  personalisationConsent?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  seekingTopicIds?: Maybe<Array<Scalars['ID']>>;
};

/** Autogenerated return type of AttendeeProfileUpdate */
export type AttendeeProfileUpdatePayload = {
  __typename?: 'AttendeeProfileUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  dynamicForm: Maybe<DynamicForm>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AuthenticateByToken */
export type AuthenticateByTokenInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

/** Autogenerated return type of AuthenticateByToken */
export type AuthenticateByTokenPayload = {
  __typename?: 'AuthenticateByTokenPayload';
  accessToken: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  user: User;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of ConnectionLinkRemove */
export type ConnectionLinkRemoveInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of ConnectionLinkRemove */
export type ConnectionLinkRemovePayload = {
  __typename?: 'ConnectionLinkRemovePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  errors: Array<Error>;
};

export type Error = {
  __typename?: 'Error';
  /** A description of the error */
  message: Scalars['String'];
  /** Which input value this error came from */
  path: Maybe<Array<Scalars['String']>>;
  type: Scalars['String'];
};

/** Autogenerated input type of ConnectionRequestAccept */
export type ConnectionRequestAcceptInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of ConnectionRequestAccept */
export type ConnectionRequestAcceptPayload = {
  __typename?: 'ConnectionRequestAcceptPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  connectionRequest: Maybe<ConnectionRequest>;
  errors: Array<Error>;
};

/** Autogenerated input type of ConnectionRequestCreate */
export type ConnectionRequestCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  initiatedAt?: Maybe<Scalars['ISO8601DateTime']>;
  scanCode?: Maybe<Scalars['String']>;
  sendNotification?: Maybe<Scalars['Boolean']>;
  source?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

/** Autogenerated return type of ConnectionRequestCreate */
export type ConnectionRequestCreatePayload = {
  __typename?: 'ConnectionRequestCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  connectionRequest: Maybe<ConnectionRequest>;
  errors: Array<Error>;
};

/** Autogenerated input type of ConnectionRequestReject */
export type ConnectionRequestRejectInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of ConnectionRequestReject */
export type ConnectionRequestRejectPayload = {
  __typename?: 'ConnectionRequestRejectPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  connectionRequest: Maybe<ConnectionRequest>;
  errors: Array<Error>;
};

/** Autogenerated input type of InvestorAccessGrant */
export type InvestorAccessGrantInput = {
  bookingReferences: Array<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  startupSelectionsCount: Scalars['Int'];
};

/** Autogenerated return type of InvestorAccessGrant */
export type InvestorAccessGrantPayload = {
  __typename?: 'InvestorAccessGrantPayload';
  attendances: Maybe<Array<Attendee>>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  errors: Array<Error>;
  invalidBookingReferences: Maybe<Array<Scalars['String']>>;
  successMessage: Maybe<Scalars['String']>;
};

/** Autogenerated input type of InvestorMeetingConfigurationUpdate */
export type InvestorMeetingConfigurationUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  investorMeetingConfiguration?: Maybe<InvestorMeetingConfiguration>;
};

export type InvestorMeetingConfiguration = {
  investorMeetingsDefaultStartupSelections?: Maybe<Scalars['Int']>;
  investorMeetingsMeetingsPerSession?: Maybe<Scalars['Int']>;
  investorMeetingsSessionDuration?: Maybe<Scalars['Int']>;
  investorMeetingsSponsorLogo?: Maybe<Scalars['String']>;
  investorMeetingsStartupPortalClosingAt?: Maybe<Scalars['ISO8601DateTime']>;
  investorMeetingsStartupPortalOpeningAt?: Maybe<Scalars['ISO8601DateTime']>;
  investorMeetingsStartupSelectionDeadline?: Maybe<Scalars['ISO8601DateTime']>;
  notifyOfficeHoursInvitees?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated return type of InvestorMeetingConfigurationUpdate */
export type InvestorMeetingConfigurationUpdatePayload = {
  __typename?: 'InvestorMeetingConfigurationUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of InvestorPortalRevokeAccess */
export type InvestorPortalRevokeAccessInput = {
  attendanceId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of InvestorPortalRevokeAccess */
export type InvestorPortalRevokeAccessPayload = {
  __typename?: 'InvestorPortalRevokeAccessPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of InvestorSessionsCreate */
export type InvestorSessionsCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  investorSessionsConfiguration?: Maybe<InvestorSessionsConfiguration>;
};

export type InvestorSessionsConfiguration = {
  investorSessionsCount: Scalars['Int'];
  investorSessionsEndsAt: Scalars['ISO8601DateTime'];
  investorSessionsStartsAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated return type of InvestorSessionsCreate */
export type InvestorSessionsCreatePayload = {
  __typename?: 'InvestorSessionsCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of MagicLinkGenerate */
export type MagicLinkGenerateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Use `%{token}` to indicate where to interpolate the token. */
  linkFormat?: Maybe<Scalars['String']>;
  ticketReference: Scalars['String'];
};

/** Autogenerated return type of MagicLinkGenerate */
export type MagicLinkGeneratePayload = {
  __typename?: 'MagicLinkGeneratePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of MagicLinkScheduleDelivery */
export type MagicLinkScheduleDeliveryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Use `%{token}` to indicate where to interpolate the token. */
  linkFormat?: Maybe<Scalars['String']>;
  /** Url to let the user request a new magic link email. */
  loginUrl?: Maybe<Scalars['String']>;
  /**
   * Datetime when the emails will get triggered.
   * The process will be trigger right away if missing.
   */
  scheduleAt?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MagicLinkScheduleDelivery */
export type MagicLinkScheduleDeliveryPayload = {
  __typename?: 'MagicLinkScheduleDeliveryPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of MyConnectionsEmailSend */
export type MyConnectionsEmailSendInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of MyConnectionsEmailSend */
export type MyConnectionsEmailSendPayload = {
  __typename?: 'MyConnectionsEmailSendPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  errors: Array<Error>;
  recipient: User;
};

/** Autogenerated input type of SessionTimeslotParticipationCreate */
export type SessionTimeslotParticipationCreateInput = {
  attendanceId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  sessionTimeslotId: Scalars['ID'];
};

/** Autogenerated return type of SessionTimeslotParticipationCreate */
export type SessionTimeslotParticipationCreatePayload = {
  __typename?: 'SessionTimeslotParticipationCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  participations: Maybe<Array<Attendee>>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of UserRoleCreate */
export type UserRoleCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
};

/** Autogenerated return type of UserRoleCreate */
export type UserRoleCreatePayload = {
  __typename?: 'UserRoleCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
  userRole: Maybe<UserRole>;
};

/** Autogenerated input type of UserRoleUpdate */
export type UserRoleUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Scalars['String']>>;
};

/** Autogenerated return type of UserRoleUpdate */
export type UserRoleUpdatePayload = {
  __typename?: 'UserRoleUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
  userRole: Maybe<UserRole>;
};

/** Autogenerated input type of AssignmentAccountUpdate */
export type AssignmentAccountUpdateInput = {
  accountId: Scalars['ID'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

/** Autogenerated return type of AssignmentAccountUpdate */
export type AssignmentAccountUpdatePayload = {
  __typename?: 'AssignmentAccountUpdatePayload';
  account: Maybe<AssignmentUser>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AssignmentAuthenticate */
export type AssignmentAuthenticateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

/** Autogenerated return type of AssignmentAuthenticate */
export type AssignmentAuthenticatePayload = {
  __typename?: 'AssignmentAuthenticatePayload';
  accessToken: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  conferenceSlug: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AssignmentMagicLinkGenerate */
export type AssignmentMagicLinkGenerateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Email address of the account. */
  email: Scalars['String'];
  eventSlug: Scalars['String'];
  /** Specifies the time in minutes the generated login link will be valid for. Defaults to 30 minutes. */
  ttl?: Maybe<Scalars['Int']>;
};

/** Autogenerated return type of AssignmentMagicLinkGenerate */
export type AssignmentMagicLinkGeneratePayload = {
  __typename?: 'AssignmentMagicLinkGeneratePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  loginLink: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AssignmentMagicLinkLoginRequest */
export type AssignmentMagicLinkLoginRequestInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

/** Autogenerated return type of AssignmentMagicLinkLoginRequest */
export type AssignmentMagicLinkLoginRequestPayload = {
  __typename?: 'AssignmentMagicLinkLoginRequestPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AssignmentProfileAdminUpdate */
export type AssignmentProfileAdminUpdateInput = {
  accountId: Scalars['ID'];
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companySizeId?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  industryId?: Maybe<Scalars['ID']>;
  jobTitle?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AssignmentProfileAdminUpdate */
export type AssignmentProfileAdminUpdatePayload = {
  __typename?: 'AssignmentProfileAdminUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  profile: Maybe<AssignmentUser>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AssignmentProfileUpdate */
export type AssignmentProfileUpdateInput = {
  city?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companySizeId: Scalars['ID'];
  firstName: Scalars['String'];
  industryId: Scalars['ID'];
  jobTitle: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  marketingConsent: Scalars['String'];
  passportNumber?: Maybe<Scalars['String']>;
  personalisationConsent: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  ticketId: Scalars['ID'];
};

/** Autogenerated return type of AssignmentProfileUpdate */
export type AssignmentProfileUpdatePayload = {
  __typename?: 'AssignmentProfileUpdatePayload';
  assignee: Maybe<AssignmentUser>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AssignmentSalesforceAccountUpdate */
export type AssignmentSalesforceAccountUpdateInput = {
  announcementStatus?: Maybe<Scalars['String']>;
  appLoginEmail?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  countryName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  jobTitle?: Maybe<Scalars['String']>;
  passportNumber?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  salesforceAttendanceUid: Scalars['String'];
};

/** Autogenerated return type of AssignmentSalesforceAccountUpdate */
export type AssignmentSalesforceAccountUpdatePayload = {
  __typename?: 'AssignmentSalesforceAccountUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of AssignmentTicketLoginUpdate */
export type AssignmentTicketLoginUpdateInput = {
  appLoginEmail: Scalars['String'];
  bookingRef: Scalars['String'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of AssignmentTicketLoginUpdate */
export type AssignmentTicketLoginUpdatePayload = {
  __typename?: 'AssignmentTicketLoginUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  successMessage: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of OrderCancel */
export type OrderCancelInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  disableEmailNotification?: Maybe<Scalars['Boolean']>;
  reference: Scalars['String'];
};

/** Autogenerated return type of OrderCancel */
export type OrderCancelPayload = {
  __typename?: 'OrderCancelPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  order: Maybe<Order>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of OrderCreate */
export type OrderCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  notify?: Maybe<Scalars['Boolean']>;
  owner: AccountAttributes;
  reference: Scalars['String'];
  source: Scalars['String'];
  tickets?: Maybe<Array<TicketAttributes>>;
};

export type AccountAttributes = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
};

export type TicketAttributes = {
  assignee?: Maybe<AccountAttributes>;
  reference: Scalars['String'];
  typeId: Scalars['ID'];
  void?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated return type of OrderCreate */
export type OrderCreatePayload = {
  __typename?: 'OrderCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  order: Maybe<Order>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of OrderUpdate */
export type OrderUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  notify?: Maybe<Scalars['Boolean']>;
  owner: AccountAttributes;
  reference: Scalars['String'];
};

/** Autogenerated return type of OrderUpdate */
export type OrderUpdatePayload = {
  __typename?: 'OrderUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  order: Maybe<Order>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketAccept */
export type TicketAcceptInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  ticketId: Scalars['ID'];
};

/** Autogenerated return type of TicketAccept */
export type TicketAcceptPayload = {
  __typename?: 'TicketAcceptPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketAssign */
export type TicketAssignInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  notify?: Maybe<Scalars['Boolean']>;
  ticketId: Scalars['ID'];
};

/** Autogenerated return type of TicketAssign */
export type TicketAssignPayload = {
  __typename?: 'TicketAssignPayload';
  assignment: Maybe<Assignment>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketCreate */
export type TicketCreateInput = {
  assignee?: Maybe<AccountAttributes>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  orderReference: Scalars['String'];
  reference: Scalars['String'];
  typeId: Scalars['ID'];
  void?: Maybe<Scalars['Boolean']>;
};

/** Autogenerated return type of TicketCreate */
export type TicketCreatePayload = {
  __typename?: 'TicketCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketLock */
export type TicketLockInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  reference: Scalars['String'];
};

/** Autogenerated return type of TicketLock */
export type TicketLockPayload = {
  __typename?: 'TicketLockPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketReject */
export type TicketRejectInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  notify?: Maybe<Scalars['Boolean']>;
  ticketId: Scalars['ID'];
};

/** Autogenerated return type of TicketReject */
export type TicketRejectPayload = {
  __typename?: 'TicketRejectPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketUnlock */
export type TicketUnlockInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  reference: Scalars['String'];
};

/** Autogenerated return type of TicketUnlock */
export type TicketUnlockPayload = {
  __typename?: 'TicketUnlockPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketUnvoid */
export type TicketUnvoidInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  disableEmailNotification?: Maybe<Scalars['Boolean']>;
  reference: Scalars['String'];
};

/** Autogenerated return type of TicketUnvoid */
export type TicketUnvoidPayload = {
  __typename?: 'TicketUnvoidPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketUpdate */
export type TicketUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  reference: Scalars['String'];
  typeId: Scalars['ID'];
};

/** Autogenerated return type of TicketUpdate */
export type TicketUpdatePayload = {
  __typename?: 'TicketUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TicketVoid */
export type TicketVoidInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  disableEmailNotification?: Maybe<Scalars['Boolean']>;
  reference: Scalars['String'];
};

/** Autogenerated return type of TicketVoid */
export type TicketVoidPayload = {
  __typename?: 'TicketVoidPayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  ticket: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

export type CommerceCategoryCreate = {
  active?: Maybe<Scalars['Boolean']>;
  children?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  parent?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<CommerceProductCreateOrUpdate>>;
};

export type CommerceCategoryCreateOrUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  children?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<CommerceProductCreateOrUpdate>>;
};

export type CommerceProductCreateOrUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  categories?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  defaultPrice?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<CommerceTagCreateOrUpdate>>;
  taxMode?: Maybe<CommerceProductTaxMode>;
  taxType?: Maybe<CommerceTaxTypeCreateOrUpdate>;
};

export type CommerceTagCreateOrUpdate = {
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type CommerceTaxTypeCreateOrUpdate = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  taxes?: Maybe<Array<CommerceTaxCreateOrUpdate>>;
};

export type CommerceTaxCreateOrUpdate = {
  country?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  rateAmount?: Maybe<Scalars['Int']>;
  rateType?: Maybe<CommerceTaxRateType>;
  taxType?: Maybe<CommerceTaxTypeCreateOrUpdate>;
};

export type CommerceCustomerCreate = {
  address?: Maybe<CommerceAddressCreateOrUpdate>;
  companyName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type CommerceAddressCreateOrUpdate = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type CommerceDealCreate = {
  active?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  dealItems?: Maybe<Array<CommerceDealItemCreateOrUpdate>>;
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['Date'];
  name: Scalars['String'];
  startDate: Scalars['Date'];
  usages?: Maybe<Scalars['Int']>;
};

export type CommerceDealItemCreateOrUpdate = {
  amount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['ID']>;
  step?: Maybe<Scalars['Int']>;
  type?: Maybe<CommerceDealItemType>;
};

export type CommerceDealItemCreate = {
  amount: Scalars['Int'];
  max: Scalars['Int'];
  min: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  product: Scalars['ID'];
  step: Scalars['Int'];
  type: CommerceDealItemType;
};

export type CommerceOrderCreate = {
  applicableDeals?: Maybe<Array<CommerceDealCreateOrUpdate>>;
  billed?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  currencySymbol?: Maybe<Scalars['String']>;
  customer?: Maybe<CommerceCustomerCreateOrUpdate>;
  deal?: Maybe<Scalars['ID']>;
  dealDiscount?: Maybe<Scalars['Int']>;
  discountTotal?: Maybe<Scalars['Int']>;
  invoiceUrl?: Maybe<Scalars['String']>;
  itemSubtotal?: Maybe<Scalars['Int']>;
  items: Array<CommerceOrderItemCreateOrUpdate>;
  locked?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Scalars['JSON']>;
  paid?: Maybe<Scalars['Int']>;
  paymentMethod?: Maybe<Scalars['ID']>;
  refundReceiptUrl?: Maybe<Scalars['String']>;
  status?: Maybe<CommerceOrderStatus>;
  subTotal?: Maybe<Scalars['Int']>;
  taxTotal?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Array<CommerceTaxSummaryCreateOrUpdate>>;
  total?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  valueTotal?: Maybe<Scalars['Int']>;
  voucher?: Maybe<CommerceVoucherCreateOrUpdate>;
  voucherDiscount?: Maybe<Scalars['Int']>;
};

export type CommerceDealCreateOrUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  dealItems?: Maybe<Array<CommerceDealItemCreateOrUpdate>>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  usages?: Maybe<Scalars['Int']>;
};

export type CommerceCustomerCreateOrUpdate = {
  address?: Maybe<CommerceAddressCreateOrUpdate>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type CommerceOrderItemCreateOrUpdate = {
  dealDiscount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  itemName?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Int']>;
  product?: Maybe<Scalars['ID']>;
  productMetadata?: Maybe<Scalars['JSON']>;
  quantity?: Maybe<Scalars['Int']>;
  subTotal?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  valueTotal?: Maybe<Scalars['Int']>;
  voucherDiscount?: Maybe<Scalars['Int']>;
};

export type CommerceTaxSummaryCreateOrUpdate = {
  name?: Maybe<Scalars['String']>;
  netTotal?: Maybe<Scalars['Int']>;
  rateAmount?: Maybe<Scalars['Int']>;
  rateType?: Maybe<CommerceTaxSummaryRateType>;
  taxId?: Maybe<Scalars['ID']>;
  taxType?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type CommerceVoucherCreateOrUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  amount?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<CommerceVoucherType>;
  usages?: Maybe<Scalars['Int']>;
};

export type CommercePaymentMethodCreate = {
  active?: Maybe<Scalars['Boolean']>;
  configuration?: Maybe<Scalars['JSON']>;
  gateway: Scalars['ID'];
  name: Scalars['String'];
};

export type CommerceProductCreate = {
  active?: Maybe<Scalars['Boolean']>;
  categories?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  defaultPrice?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  tags?: Maybe<Array<CommerceTagCreateOrUpdate>>;
  taxMode?: Maybe<CommerceProductTaxMode>;
  taxType: CommerceTaxTypeCreateOrUpdate;
};

export type CommerceSaleCreate = {
  active?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['Date'];
  metadata?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  saleProducts?: Maybe<Array<CommerceSaleProductCreateOrUpdate>>;
  startDate: Scalars['Date'];
};

export type CommerceSaleProductCreateOrUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  amount?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['ID']>;
  type?: Maybe<CommerceSaleProductType>;
};

export type CommerceSaleProductCreate = {
  active?: Maybe<Scalars['Boolean']>;
  amount: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  product: Scalars['ID'];
  type: CommerceSaleProductType;
};

export type CommerceStoreCreate = {
  active?: Maybe<Scalars['Boolean']>;
  baseUrl: Scalars['String'];
  categories?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  country: Scalars['String'];
  currency: Scalars['String'];
  deals?: Maybe<Array<CommerceDealCreateOrUpdate>>;
  metadata?: Maybe<Scalars['JSON']>;
  name: Scalars['String'];
  paymentMethods?: Maybe<Array<CommercePaymentMethodCreateOrUpdate>>;
  products?: Maybe<Array<CommerceProductCreateOrUpdate>>;
  sales?: Maybe<Array<CommerceSaleCreateOrUpdate>>;
  slug: Scalars['String'];
  stockMode: CommerceStoreStockMode;
  storeBilling: CommerceStoreBillingCreateOrUpdate;
  tags?: Maybe<Array<CommerceTagCreateOrUpdate>>;
  taxErrors?: Maybe<Array<Maybe<Scalars['String']>>>;
  taxTypes?: Maybe<Array<CommerceTaxTypeCreateOrUpdate>>;
  taxes?: Maybe<Array<CommerceTaxCreateOrUpdate>>;
  vatNumber: Scalars['String'];
  vouchers?: Maybe<Array<CommerceVoucherCreateOrUpdate>>;
};

export type CommercePaymentMethodCreateOrUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  configuration?: Maybe<Scalars['JSON']>;
  gateway?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type CommerceSaleCreateOrUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  saleProducts?: Maybe<Array<CommerceSaleProductCreateOrUpdate>>;
  startDate?: Maybe<Scalars['Date']>;
};

export type CommerceStoreBillingCreateOrUpdate = {
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyRegNumber?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type CommerceTagCreate = {
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CommerceTaxCreate = {
  country: Scalars['String'];
  name: Scalars['String'];
  rateAmount: Scalars['Int'];
  rateType: CommerceTaxRateType;
  taxType: CommerceTaxTypeCreateOrUpdate;
};

export type CommerceTaxTypeCreate = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  taxes?: Maybe<Array<CommerceTaxCreateOrUpdate>>;
};

export type CommerceTransactionCreate = {
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  paymentMethod?: Maybe<CommercePaymentMethodCreateOrUpdate>;
  refundedTransaction?: Maybe<Scalars['ID']>;
  status?: Maybe<CommerceTransactionStatus>;
  taxDetails?: Maybe<Array<CommerceTaxDetailCreateOrUpdate>>;
  timestamp?: Maybe<Scalars['Date']>;
  type?: Maybe<CommerceTransactionType>;
};

export type CommerceTaxDetailCreateOrUpdate = {
  taxId?: Maybe<Scalars['ID']>;
  total?: Maybe<Scalars['Int']>;
};

export type CommerceVoucherCreate = {
  active?: Maybe<Scalars['Boolean']>;
  amount: Scalars['Int'];
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type: CommerceVoucherType;
  usages?: Maybe<Scalars['Int']>;
};

export type CommerceCategoryUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  children?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  products?: Maybe<Array<CommerceProductCreateOrUpdate>>;
};

export type CommerceCustomerUpdate = {
  address?: Maybe<CommerceAddressCreateOrUpdate>;
  companyName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type CommerceDealUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  dealItems?: Maybe<Array<CommerceDealItemCreateOrUpdate>>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  usages?: Maybe<Scalars['Int']>;
};

export type CommerceDealItemUpdate = {
  amount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['ID']>;
  step?: Maybe<Scalars['Int']>;
  type?: Maybe<CommerceDealItemType>;
};

export type CommerceOrderUpdate = {
  applicableDeals?: Maybe<Array<CommerceDealCreateOrUpdate>>;
  billed?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  currencySymbol?: Maybe<Scalars['String']>;
  customer?: Maybe<CommerceCustomerCreateOrUpdate>;
  deal?: Maybe<Scalars['ID']>;
  dealDiscount?: Maybe<Scalars['Int']>;
  discountTotal?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  invoiceUrl?: Maybe<Scalars['String']>;
  itemSubtotal?: Maybe<Scalars['Int']>;
  items?: Maybe<Array<CommerceOrderItemCreateOrUpdate>>;
  locked?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Scalars['JSON']>;
  paid?: Maybe<Scalars['Int']>;
  paymentMethod?: Maybe<Scalars['ID']>;
  refundReceiptUrl?: Maybe<Scalars['String']>;
  status?: Maybe<CommerceOrderStatus>;
  subTotal?: Maybe<Scalars['Int']>;
  taxTotal?: Maybe<Scalars['Int']>;
  taxes?: Maybe<Array<CommerceTaxSummaryCreateOrUpdate>>;
  total?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  valueTotal?: Maybe<Scalars['Int']>;
  voucher?: Maybe<CommerceVoucherCreateOrUpdate>;
  voucherDiscount?: Maybe<Scalars['Int']>;
};

export type CommercePaymentMethodUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  configuration?: Maybe<Scalars['JSON']>;
  gateway?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type CommerceProductUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  categories?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  defaultPrice?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  tags?: Maybe<Array<CommerceTagCreateOrUpdate>>;
  taxMode?: Maybe<CommerceProductTaxMode>;
  taxType?: Maybe<CommerceTaxTypeCreateOrUpdate>;
};

export type CommerceSaleUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  saleProducts?: Maybe<Array<CommerceSaleProductCreateOrUpdate>>;
  startDate?: Maybe<Scalars['Date']>;
};

export type CommerceSaleProductUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  amount?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  product?: Maybe<Scalars['ID']>;
  type?: Maybe<CommerceSaleProductType>;
};

export type CommerceStoreUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  baseUrl?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<CommerceCategoryCreateOrUpdate>>;
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  deals?: Maybe<Array<CommerceDealCreateOrUpdate>>;
  id?: Maybe<Scalars['ID']>;
  metadata?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  paymentMethods?: Maybe<Array<CommercePaymentMethodCreateOrUpdate>>;
  products?: Maybe<Array<CommerceProductCreateOrUpdate>>;
  sales?: Maybe<Array<CommerceSaleCreateOrUpdate>>;
  slug?: Maybe<Scalars['String']>;
  stockMode?: Maybe<CommerceStoreStockMode>;
  storeBilling?: Maybe<CommerceStoreBillingCreateOrUpdate>;
  tags?: Maybe<Array<CommerceTagCreateOrUpdate>>;
  taxErrors?: Maybe<Array<Maybe<Scalars['String']>>>;
  taxTypes?: Maybe<Array<CommerceTaxTypeCreateOrUpdate>>;
  taxes?: Maybe<Array<CommerceTaxCreateOrUpdate>>;
  vatNumber?: Maybe<Scalars['String']>;
  vouchers?: Maybe<Array<CommerceVoucherCreateOrUpdate>>;
};

export type CommerceTagUpdate = {
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type CommerceTaxUpdate = {
  country?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  rateAmount?: Maybe<Scalars['Int']>;
  rateType?: Maybe<CommerceTaxRateType>;
  taxType?: Maybe<CommerceTaxTypeCreateOrUpdate>;
};

export type CommerceTaxTypeUpdate = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  taxes?: Maybe<Array<CommerceTaxCreateOrUpdate>>;
};

export type CommerceVoucherUpdate = {
  active?: Maybe<Scalars['Boolean']>;
  amount?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  type?: Maybe<CommerceVoucherType>;
  usages?: Maybe<Scalars['Int']>;
};

/** Autogenerated input type of EventCreate */
export type EventCreateInput = {
  baseUrl?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  countryId?: Maybe<Scalars['ID']>;
  currency?: Maybe<CurrencyCode>;
  description?: Maybe<Scalars['String']>;
  /** Must be equal to or greater than the start_date */
  endDate?: Maybe<Scalars['String']>;
  legalEntityId?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  slug: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of EventCreate */
export type EventCreatePayload = {
  __typename?: 'EventCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  event: Maybe<Event>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of EventUpdate */
export type EventUpdateInput = {
  baseUrl?: Maybe<Scalars['String']>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  countryId?: Maybe<Scalars['ID']>;
  currency?: Maybe<CurrencyCode>;
  description?: Maybe<Scalars['String']>;
  /** Must be equal to or greater than the start_date */
  endDate?: Maybe<Scalars['String']>;
  legalEntityId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of EventUpdate */
export type EventUpdatePayload = {
  __typename?: 'EventUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  event: Maybe<Event>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of LegalEntityCreate */
export type LegalEntityCreateInput = {
  address?: Maybe<AddressInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  /** Must be unique */
  name: Scalars['String'];
  note?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  regNumber?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  city: Scalars['String'];
  countryId: Scalars['ID'];
  lineOne: Scalars['String'];
  lineTwo?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  region: Scalars['String'];
};

/** Autogenerated return type of LegalEntityCreate */
export type LegalEntityCreatePayload = {
  __typename?: 'LegalEntityCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  legalEntity: Maybe<LegalEntity>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of LegalEntityUpdate */
export type LegalEntityUpdateInput = {
  address?: Maybe<AddressInput>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  regNumber?: Maybe<Scalars['String']>;
  taxNumber?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of LegalEntityUpdate */
export type LegalEntityUpdatePayload = {
  __typename?: 'LegalEntityUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  legalEntity: Maybe<LegalEntity>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TaxRateCreate */
export type TaxRateCreateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  countryId: Scalars['ID'];
  eventId: Scalars['ID'];
  name: Scalars['String'];
  rateType: RateType;
  taxType: TaxType;
  value: Scalars['Float'];
};

/** Autogenerated return type of TaxRateCreate */
export type TaxRateCreatePayload = {
  __typename?: 'TaxRateCreatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  taxRate: Maybe<TaxRate>;
  userErrors: Array<UserError>;
};

/** Autogenerated input type of TaxRateUpdate */
export type TaxRateUpdateInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  countryId?: Maybe<Scalars['ID']>;
  eventId?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  rateType?: Maybe<RateType>;
  taxType?: Maybe<TaxType>;
  value?: Maybe<Scalars['Float']>;
};

/** Autogenerated return type of TaxRateUpdate */
export type TaxRateUpdatePayload = {
  __typename?: 'TaxRateUpdatePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId: Maybe<Scalars['String']>;
  taxRate: Maybe<TaxRate>;
  userErrors: Array<UserError>;
};

export type AppConfigInput = {
  googleAnalyticsTrackingId?: Maybe<Scalars['String']>;
  googleTagManagerId?: Maybe<Scalars['String']>;
  googleAnalyticsLinkerDomains: Array<ComponentSiteConfigGoogleAnalyticsLinkerDomainListInput>;
  googleFontsUrl?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['JSON']>;
  metaData: ComponentSiteConfigMetaDatumInput;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ComponentSearchAlgoliaRefinementInput = {
  title: Scalars['String'];
  attribute: Scalars['String'];
  defaults?: Maybe<Scalars['JSON']>;
  variant: SearchRefinementWidgetType;
  refinementItemsLimit?: Maybe<Scalars['Int']>;
};

export type ComponentWebElementsAttendeeSearchSidebarFilterInput = {
  apiKey: Scalars['String'];
  indexName: Scalars['String'];
  refinements: Array<ComponentSearchAlgoliaRefinementInput>;
};

export type ComponentWebElementsCompanySearchSidebarFilterInput = {
  apiKey: Scalars['String'];
  indexName: Scalars['String'];
  refinements: Array<ComponentSearchAlgoliaRefinementInput>;
};

export type ComponentWebElementsCtaLinkInput = {
  text: Scalars['String'];
  url: Scalars['String'];
  openInNewTab: Scalars['Boolean'];
};

export type ComponentWebElementsFreshchatInput = {
  OnMobile?: Maybe<Scalars['Boolean']>;
  OnDesktop?: Maybe<Scalars['Boolean']>;
};

export type ComponentWebElementsHeroSectionInput = {
  backgroundImage?: Maybe<Scalars['ID']>;
  backgroundImageAlt?: Maybe<Scalars['String']>;
  backgroundImageDescription?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['Markdown']>;
  brandImage?: Maybe<Scalars['ID']>;
  variant: Enum_Componentwebelementsherosection_Variant;
  ctaLink?: Maybe<ComponentWebElementsCtaLinkInput>;
};

export type ComponentWebElementsPriceIncreaseCountdownTimerInput = {
  ticketTypeId: Scalars['String'];
};

export type ComponentWebElementsReleasePhaseStepperInput = {
  ticketTypeId: Scalars['String'];
};

export type ComponentWebElementsScheduleSearchSidebarFilterInput = {
  apiKey: Scalars['String'];
  indexName: Scalars['String'];
  refinements: Array<ComponentSearchAlgoliaRefinementInput>;
};

export type ComponentWebElementsSeoMetaDatumInput = {
  defaultImage?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  twitterImage?: Maybe<Scalars['ID']>;
  facebookImage?: Maybe<Scalars['ID']>;
  twitterTitle?: Maybe<Scalars['String']>;
  facebookTitle?: Maybe<Scalars['String']>;
  twitterDescription?: Maybe<Scalars['String']>;
  facebookDescription?: Maybe<Scalars['String']>;
};

export type ComponentWebElementsShowcaseGridInput = {
  contentBefore?: Maybe<Scalars['Markdown']>;
  backgroundColor?: Maybe<Scalars['String']>;
  contentCollection?: Maybe<Scalars['ID']>;
};

export type ComponentWebElementsTicketApplicationOverviewPanelInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  altImageText?: Maybe<Scalars['String']>;
};

export type ComponentWebElementsTicketPromotionInput = {
  ticketTypeId: Scalars['String'];
  type: TicketPromotionType;
  label?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type ComponentWebElementsTicketReleasesPanelInput = {
  displayPriceIncludingTax?: Maybe<Scalars['Boolean']>;
};

export type ComponentWebElementsTicketTypeInformationInput = {
  ticketTypeId: Scalars['String'];
  showBenefits: Scalars['Boolean'];
  displayPriceIncludingTax?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
};

export type ComponentWebLayoutsStoresTicketApplicationsPageInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['Markdown']>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  applicationForm?: Maybe<Scalars['ID']>;
  ticketInfoPanel?: Maybe<ComponentWebElementsTicketTypeInformationInput>;
  applicationOverviewPanel?: Maybe<ComponentWebElementsTicketApplicationOverviewPanelInput>;
  releasePhaseStepper?: Maybe<ComponentWebElementsReleasePhaseStepperInput>;
  priceIncreaseCountdownTimer?: Maybe<ComponentWebElementsPriceIncreaseCountdownTimerInput>;
};

export type ComponentWebLayoutsStoresTicketSalesPageInput = {
  productIds?: Maybe<Scalars['JSON']>;
  ticketReleasesPanel?: Maybe<ComponentWebElementsTicketReleasesPanelInput>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  priceIncreaseCountdownTimer?: Maybe<ComponentWebElementsPriceIncreaseCountdownTimerInput>;
  promotions: Array<ComponentWebElementsTicketPromotionInput>;
  releasePhaseStepper?: Maybe<ComponentWebElementsReleasePhaseStepperInput>;
};

export type ComponentWebLayoutsTicketApplicationsPageInput = {
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['Markdown']>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  applicationForm?: Maybe<Scalars['ID']>;
  ticketInfoPanel?: Maybe<ComponentWebElementsTicketTypeInformationInput>;
  priceIncreaseCountdownTimer?: Maybe<ComponentWebElementsPriceIncreaseCountdownTimerInput>;
  applicationOverviewPanel?: Maybe<ComponentWebElementsTicketApplicationOverviewPanelInput>;
  releasePhaseStepper?: Maybe<ComponentWebElementsReleasePhaseStepperInput>;
};

export type ComponentWebLayoutsTicketSalesPageInput = {
  ticketCategoryId: Scalars['String'];
  ticketReleasesPanel?: Maybe<ComponentWebElementsTicketReleasesPanelInput>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  priceIncreaseCountdownTimer?: Maybe<ComponentWebElementsPriceIncreaseCountdownTimerInput>;
  promotions: Array<ComponentWebElementsTicketPromotionInput>;
  releasePhaseStepper?: Maybe<ComponentWebElementsReleasePhaseStepperInput>;
};

export type ComponentWebLinksPageLinkInput = {
  page?: Maybe<Scalars['ID']>;
};

export type ComponentWebLinksSubMenuInput = {
  menu?: Maybe<Scalars['ID']>;
};

export type ComponentWebLinksUrlLinkInput = {
  url: Scalars['String'];
  target?: Maybe<Scalars['String']>;
};

export type ContentCollectionInput = {
  name: Scalars['String'];
  elements?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type ContentElementInput = {
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  link?: Maybe<ComponentWebLinksUrlLinkInput>;
  collections?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateContentCollectionInput = {
  data?: Maybe<ContentCollectionInput>;
};

export type CreateContentCollectionPayload = {
  __typename?: 'createContentCollectionPayload';
  contentCollection: Maybe<ContentCollection>;
};

export type CreateContentElementInput = {
  data?: Maybe<ContentElementInput>;
};

export type CreateContentElementPayload = {
  __typename?: 'createContentElementPayload';
  contentElement: Maybe<ContentElement>;
};

export type CreateFormInput = {
  data?: Maybe<FormInput>;
};

export type FormInput = {
  name: Scalars['String'];
  formstackId?: Maybe<Scalars['String']>;
  contentBefore?: Maybe<Scalars['Markdown']>;
  successMessage: Scalars['Markdown'];
  submissions?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateFormPayload = {
  __typename?: 'createFormPayload';
  form: Maybe<Form>;
};

export type CreateMenuInput = {
  data?: Maybe<MenuInput>;
};

export type MenuInput = {
  name: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  menuItems?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateMenuItemInput = {
  data?: Maybe<MenuItemInput>;
};

export type MenuItemInput = {
  label: Scalars['String'];
  link: Array<Scalars['MenuItemLinkDynamicZoneInput']>;
  parentMenu?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type CreateMenuItemPayload = {
  __typename?: 'createMenuItemPayload';
  menuItem: Maybe<MenuItem>;
};

export type CreateMenuPayload = {
  __typename?: 'createMenuPayload';
  menu: Maybe<Menu>;
};

export type CreateWebPageInput = {
  data?: Maybe<WebPageInput>;
};

export type WebPageInput = {
  title: Scalars['String'];
  status?: Maybe<Enum_Webpage_Status>;
  path?: Maybe<Scalars['String']>;
  content: Array<Scalars['WebPageContentDynamicZoneInput']>;
  seoTags?: Maybe<ComponentWebElementsSeoMetaDatumInput>;
  event?: Maybe<Scalars['ID']>;
  site?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export enum Enum_Webpage_Status {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type CreateWebPagePayload = {
  __typename?: 'createWebPagePayload';
  webPage: Maybe<WebPage>;
};

export type DeleteAppConfigPayload = {
  __typename?: 'deleteAppConfigPayload';
  appConfig: Maybe<AppConfig>;
};

export type DeleteContentCollectionInput = {
  where?: Maybe<InputId>;
};

export type DeleteContentCollectionPayload = {
  __typename?: 'deleteContentCollectionPayload';
  contentCollection: Maybe<ContentCollection>;
};

export type DeleteContentElementInput = {
  where?: Maybe<InputId>;
};

export type DeleteContentElementPayload = {
  __typename?: 'deleteContentElementPayload';
  contentElement: Maybe<ContentElement>;
};

export type DeleteFormInput = {
  where?: Maybe<InputId>;
};

export type DeleteFormPayload = {
  __typename?: 'deleteFormPayload';
  form: Maybe<Form>;
};

export type DeleteMenuInput = {
  where?: Maybe<InputId>;
};

export type DeleteMenuItemInput = {
  where?: Maybe<InputId>;
};

export type DeleteMenuItemPayload = {
  __typename?: 'deleteMenuItemPayload';
  menuItem: Maybe<MenuItem>;
};

export type DeleteMenuPayload = {
  __typename?: 'deleteMenuPayload';
  menu: Maybe<Menu>;
};

export type DeleteWebPageInput = {
  where?: Maybe<InputId>;
};

export type DeleteWebPagePayload = {
  __typename?: 'deleteWebPagePayload';
  webPage: Maybe<WebPage>;
};

export type EditAppConfigInput = {
  googleAnalyticsTrackingId?: Maybe<Scalars['String']>;
  googleTagManagerId?: Maybe<Scalars['String']>;
  googleAnalyticsLinkerDomains: Array<EditComponentSiteConfigGoogleAnalyticsLinkerDomainListInput>;
  googleFontsUrl?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['JSON']>;
  metaData?: Maybe<EditComponentSiteConfigMetaDatumInput>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditComponentSearchAlgoliaRefinementInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  attribute?: Maybe<Scalars['String']>;
  defaults?: Maybe<Scalars['JSON']>;
  variant?: Maybe<SearchRefinementWidgetType>;
  refinementItemsLimit?: Maybe<Scalars['Int']>;
};

export type EditComponentWebElementsAttendeeSearchSidebarFilterInput = {
  id?: Maybe<Scalars['ID']>;
  apiKey?: Maybe<Scalars['String']>;
  indexName?: Maybe<Scalars['String']>;
  refinements: Array<EditComponentSearchAlgoliaRefinementInput>;
};

export type EditComponentWebElementsCompanySearchSidebarFilterInput = {
  id?: Maybe<Scalars['ID']>;
  apiKey?: Maybe<Scalars['String']>;
  indexName?: Maybe<Scalars['String']>;
  refinements: Array<EditComponentSearchAlgoliaRefinementInput>;
};

export type EditComponentWebElementsCtaLinkInput = {
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  openInNewTab?: Maybe<Scalars['Boolean']>;
};

export type EditComponentWebElementsFreshchatInput = {
  id?: Maybe<Scalars['ID']>;
  OnMobile?: Maybe<Scalars['Boolean']>;
  OnDesktop?: Maybe<Scalars['Boolean']>;
};

export type EditComponentWebElementsHeroSectionInput = {
  id?: Maybe<Scalars['ID']>;
  backgroundImage?: Maybe<Scalars['ID']>;
  backgroundImageAlt?: Maybe<Scalars['String']>;
  backgroundImageDescription?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['Markdown']>;
  brandImage?: Maybe<Scalars['ID']>;
  variant?: Maybe<Enum_Componentwebelementsherosection_Variant>;
  ctaLink?: Maybe<EditComponentWebElementsCtaLinkInput>;
};

export type EditComponentWebElementsPriceIncreaseCountdownTimerInput = {
  id?: Maybe<Scalars['ID']>;
  ticketTypeId?: Maybe<Scalars['String']>;
};

export type EditComponentWebElementsReleasePhaseStepperInput = {
  id?: Maybe<Scalars['ID']>;
  ticketTypeId?: Maybe<Scalars['String']>;
};

export type EditComponentWebElementsScheduleSearchSidebarFilterInput = {
  id?: Maybe<Scalars['ID']>;
  apiKey?: Maybe<Scalars['String']>;
  indexName?: Maybe<Scalars['String']>;
  refinements: Array<EditComponentSearchAlgoliaRefinementInput>;
};

export type EditComponentWebElementsSeoMetaDatumInput = {
  id?: Maybe<Scalars['ID']>;
  defaultImage?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  twitterImage?: Maybe<Scalars['ID']>;
  facebookImage?: Maybe<Scalars['ID']>;
  twitterTitle?: Maybe<Scalars['String']>;
  facebookTitle?: Maybe<Scalars['String']>;
  twitterDescription?: Maybe<Scalars['String']>;
  facebookDescription?: Maybe<Scalars['String']>;
};

export type EditComponentWebElementsShowcaseGridInput = {
  id?: Maybe<Scalars['ID']>;
  contentBefore?: Maybe<Scalars['Markdown']>;
  backgroundColor?: Maybe<Scalars['String']>;
  contentCollection?: Maybe<Scalars['ID']>;
};

export type EditComponentWebElementsTicketApplicationOverviewPanelInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  altImageText?: Maybe<Scalars['String']>;
};

export type EditComponentWebElementsTicketPromotionInput = {
  id?: Maybe<Scalars['ID']>;
  ticketTypeId?: Maybe<Scalars['String']>;
  type?: Maybe<TicketPromotionType>;
  label?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type EditComponentWebElementsTicketReleasesPanelInput = {
  id?: Maybe<Scalars['ID']>;
  displayPriceIncludingTax?: Maybe<Scalars['Boolean']>;
};

export type EditComponentWebElementsTicketTypeInformationInput = {
  id?: Maybe<Scalars['ID']>;
  ticketTypeId?: Maybe<Scalars['String']>;
  showBenefits?: Maybe<Scalars['Boolean']>;
  displayPriceIncludingTax?: Maybe<Scalars['Boolean']>;
  heading?: Maybe<Scalars['String']>;
};

export type EditComponentWebLayoutsStoresTicketApplicationsPageInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['Markdown']>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  applicationForm?: Maybe<Scalars['ID']>;
  ticketInfoPanel?: Maybe<EditComponentWebElementsTicketTypeInformationInput>;
  applicationOverviewPanel?: Maybe<EditComponentWebElementsTicketApplicationOverviewPanelInput>;
  releasePhaseStepper?: Maybe<EditComponentWebElementsReleasePhaseStepperInput>;
  priceIncreaseCountdownTimer?: Maybe<EditComponentWebElementsPriceIncreaseCountdownTimerInput>;
};

export type EditComponentWebLayoutsStoresTicketSalesPageInput = {
  id?: Maybe<Scalars['ID']>;
  productIds?: Maybe<Scalars['JSON']>;
  ticketReleasesPanel?: Maybe<EditComponentWebElementsTicketReleasesPanelInput>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  priceIncreaseCountdownTimer?: Maybe<EditComponentWebElementsPriceIncreaseCountdownTimerInput>;
  promotions: Array<EditComponentWebElementsTicketPromotionInput>;
  releasePhaseStepper?: Maybe<EditComponentWebElementsReleasePhaseStepperInput>;
};

export type EditComponentWebLayoutsTicketApplicationsPageInput = {
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['Markdown']>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  applicationForm?: Maybe<Scalars['ID']>;
  ticketInfoPanel?: Maybe<EditComponentWebElementsTicketTypeInformationInput>;
  priceIncreaseCountdownTimer?: Maybe<EditComponentWebElementsPriceIncreaseCountdownTimerInput>;
  applicationOverviewPanel?: Maybe<EditComponentWebElementsTicketApplicationOverviewPanelInput>;
  releasePhaseStepper?: Maybe<EditComponentWebElementsReleasePhaseStepperInput>;
};

export type EditComponentWebLayoutsTicketSalesPageInput = {
  id?: Maybe<Scalars['ID']>;
  ticketCategoryId?: Maybe<Scalars['String']>;
  ticketReleasesPanel?: Maybe<EditComponentWebElementsTicketReleasesPanelInput>;
  categoriesMenu?: Maybe<Scalars['ID']>;
  priceIncreaseCountdownTimer?: Maybe<EditComponentWebElementsPriceIncreaseCountdownTimerInput>;
  promotions: Array<EditComponentWebElementsTicketPromotionInput>;
  releasePhaseStepper?: Maybe<EditComponentWebElementsReleasePhaseStepperInput>;
};

export type EditComponentWebLinksPageLinkInput = {
  id?: Maybe<Scalars['ID']>;
  page?: Maybe<Scalars['ID']>;
};

export type EditComponentWebLinksSubMenuInput = {
  id?: Maybe<Scalars['ID']>;
  menu?: Maybe<Scalars['ID']>;
};

export type EditComponentWebLinksUrlLinkInput = {
  id?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
};

export type EditContentCollectionInput = {
  name?: Maybe<Scalars['String']>;
  elements?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditContentElementInput = {
  title?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['ID']>;
  link?: Maybe<EditComponentWebLinksUrlLinkInput>;
  collections?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>;
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash?: Maybe<Scalars['String']>;
  ext?: Maybe<Scalars['String']>;
  mime?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Float']>;
  url?: Maybe<Scalars['String']>;
  previewUrl?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_metadata?: Maybe<Scalars['JSON']>;
  related: Array<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditFormInput = {
  name?: Maybe<Scalars['String']>;
  formstackId?: Maybe<Scalars['String']>;
  contentBefore?: Maybe<Scalars['Markdown']>;
  successMessage?: Maybe<Scalars['Markdown']>;
  submissions?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditMenuInput = {
  name?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  menuItems?: Maybe<Array<Scalars['ID']>>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditMenuItemInput = {
  label?: Maybe<Scalars['String']>;
  link: Array<Scalars['MenuItemLinkDynamicZoneInput']>;
  parentMenu?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type EditWebPageInput = {
  title?: Maybe<Scalars['String']>;
  status?: Maybe<Enum_Webpage_Status>;
  path?: Maybe<Scalars['String']>;
  content: Array<Scalars['WebPageContentDynamicZoneInput']>;
  seoTags?: Maybe<EditComponentWebElementsSeoMetaDatumInput>;
  event?: Maybe<Scalars['ID']>;
  site?: Maybe<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type FileInput = {
  name: Scalars['String'];
  alternativeText?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  formats?: Maybe<Scalars['JSON']>;
  hash: Scalars['String'];
  ext?: Maybe<Scalars['String']>;
  mime: Scalars['String'];
  size: Scalars['Float'];
  url: Scalars['String'];
  previewUrl?: Maybe<Scalars['String']>;
  provider: Scalars['String'];
  provider_metadata?: Maybe<Scalars['JSON']>;
  related: Array<Scalars['ID']>;
  created_by?: Maybe<Scalars['ID']>;
  updated_by?: Maybe<Scalars['ID']>;
};

export type UpdateAppConfigInput = {
  data?: Maybe<EditAppConfigInput>;
};

export type UpdateAppConfigPayload = {
  __typename?: 'updateAppConfigPayload';
  appConfig: Maybe<AppConfig>;
};

export type UpdateContentCollectionInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditContentCollectionInput>;
};

export type UpdateContentCollectionPayload = {
  __typename?: 'updateContentCollectionPayload';
  contentCollection: Maybe<ContentCollection>;
};

export type UpdateContentElementInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditContentElementInput>;
};

export type UpdateContentElementPayload = {
  __typename?: 'updateContentElementPayload';
  contentElement: Maybe<ContentElement>;
};

export type UpdateFormInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditFormInput>;
};

export type UpdateFormPayload = {
  __typename?: 'updateFormPayload';
  form: Maybe<Form>;
};

export type UpdateMenuInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditMenuInput>;
};

export type UpdateMenuItemInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditMenuItemInput>;
};

export type UpdateMenuItemPayload = {
  __typename?: 'updateMenuItemPayload';
  menuItem: Maybe<MenuItem>;
};

export type UpdateMenuPayload = {
  __typename?: 'updateMenuPayload';
  menu: Maybe<Menu>;
};

export type UpdateWebPageInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditWebPageInput>;
};

export type UpdateWebPagePayload = {
  __typename?: 'updateWebPagePayload';
  webPage: Maybe<WebPage>;
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'];
  password: Scalars['String'];
  provider?: Maybe<Scalars['String']>;
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CommerceAddressCreate = {
  city: Scalars['String'];
  country: Scalars['String'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
};

export type CommerceAddressUpdate = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type CommerceOrderItemCreate = {
  dealDiscount?: Maybe<Scalars['Int']>;
  itemName?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Int']>;
  product: Scalars['ID'];
  productMetadata?: Maybe<Scalars['JSON']>;
  quantity: Scalars['Int'];
  subTotal?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  valueTotal?: Maybe<Scalars['Int']>;
  voucherDiscount?: Maybe<Scalars['Int']>;
};

export type CommerceOrderItemUpdate = {
  dealDiscount?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  itemName?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  price?: Maybe<Scalars['Int']>;
  product?: Maybe<Scalars['ID']>;
  productMetadata?: Maybe<Scalars['JSON']>;
  quantity?: Maybe<Scalars['Int']>;
  subTotal?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
  valueTotal?: Maybe<Scalars['Int']>;
  voucherDiscount?: Maybe<Scalars['Int']>;
};

export type CommerceStoreBillingCreate = {
  city: Scalars['String'];
  companyName: Scalars['String'];
  companyRegNumber?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  email: Scalars['String'];
  line1: Scalars['String'];
  line2?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  vatNumber: Scalars['String'];
};

export type CommerceStoreBillingUpdate = {
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  companyRegNumber?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  line1?: Maybe<Scalars['String']>;
  line2?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  vatNumber?: Maybe<Scalars['String']>;
};

export type CommerceTaxDetailCreate = {
  taxId: Scalars['ID'];
  total: Scalars['Int'];
};

export type CommerceTaxDetailUpdate = {
  taxId?: Maybe<Scalars['ID']>;
  total?: Maybe<Scalars['Int']>;
};

export type CommerceTaxSummaryCreate = {
  name?: Maybe<Scalars['String']>;
  netTotal?: Maybe<Scalars['Int']>;
  rateAmount?: Maybe<Scalars['Int']>;
  rateType?: Maybe<CommerceTaxSummaryRateType>;
  taxId: Scalars['ID'];
  taxType?: Maybe<Scalars['String']>;
  total: Scalars['Int'];
};

export type CommerceTaxSummaryUpdate = {
  name?: Maybe<Scalars['String']>;
  netTotal?: Maybe<Scalars['Int']>;
  rateAmount?: Maybe<Scalars['Int']>;
  rateType?: Maybe<CommerceTaxSummaryRateType>;
  taxId?: Maybe<Scalars['ID']>;
  taxType?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
};

export type AssignmentAuthenticateMutationVariables = Exact<{
  input: AssignmentAuthenticateInput;
}>;

export type AssignmentAuthenticateMutation = { __typename?: 'Mutation' } & {
  assignmentAuthenticate: Maybe<
    { __typename?: 'AssignmentAuthenticatePayload' } & Pick<
      AssignmentAuthenticatePayload,
      'accessToken' | 'conferenceSlug' | 'clientMutationId'
    > & {
        userErrors: Array<
          { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
        >;
      }
  >;
};

export type ProfileAdminUpdateMutationVariables = Exact<{
  profile: AssignmentProfileAdminUpdateInput;
}>;

export type ProfileAdminUpdateMutation = { __typename?: 'Mutation' } & {
  assignmentProfileAdminUpdate: Maybe<
    { __typename?: 'AssignmentProfileAdminUpdatePayload' } & Pick<
      AssignmentProfileAdminUpdatePayload,
      'successMessage'
    > & {
        userErrors: Array<
          { __typename?: 'UserError' } & Pick<UserError, 'path' | 'message'>
        >;
        profile: Maybe<
          { __typename?: 'AssignmentUser' } & Pick<
            AssignmentUser,
            | 'email'
            | 'firstName'
            | 'lastName'
            | 'jobTitle'
            | 'companyName'
            | 'companySizeId'
            | 'industryId'
            | 'phoneNumber'
            | 'city'
            | 'passportNumber'
          >
        >;
      }
  >;
};

export type ProfileUpdateMutationVariables = Exact<{
  profile: AssignmentProfileUpdateInput;
}>;

export type ProfileUpdateMutation = { __typename?: 'Mutation' } & {
  assignmentProfileUpdate: Maybe<
    { __typename?: 'AssignmentProfileUpdatePayload' } & Pick<
      AssignmentProfileUpdatePayload,
      'successMessage'
    > & {
        userErrors: Array<
          { __typename?: 'UserError' } & Pick<UserError, 'path' | 'message'>
        >;
        assignee: Maybe<
          { __typename?: 'AssignmentUser' } & Pick<
            AssignmentUser,
            | 'email'
            | 'firstName'
            | 'lastName'
            | 'jobTitle'
            | 'companyName'
            | 'companySizeId'
            | 'industryId'
            | 'phoneNumber'
            | 'city'
            | 'marketingConsent'
            | 'personalisationConsent'
            | 'passportNumber'
          >
        >;
      }
  >;
};

export type CommerceCreateDealMutationVariables = Exact<{
  commerceDealCreate: CommerceDealCreate;
}>;

export type CommerceCreateDealMutation = { __typename?: 'Mutation' } & {
  commerceCreateDeal: Maybe<
    { __typename?: 'CommerceDeal' } & Pick<CommerceDeal, 'id' | 'name'>
  >;
};

export type CommerceCreateDealItemMutationVariables = Exact<{
  commerceDealItemCreate: CommerceDealItemCreate;
  dealId: Scalars['ID'];
}>;

export type CommerceCreateDealItemMutation = { __typename?: 'Mutation' } & {
  commerceCreateDealItem: Maybe<
    { __typename?: 'CommerceDealItem' } & Pick<CommerceDealItem, 'id'>
  >;
};

export type CommerceCreateSaleMutationVariables = Exact<{
  commerceSale: CommerceSaleCreate;
}>;

export type CommerceCreateSaleMutation = { __typename?: 'Mutation' } & {
  commerceCreateSale: Maybe<
    { __typename?: 'CommerceSale' } & Pick<CommerceSale, 'id' | 'name'>
  >;
};

export type CommerceDeleteDealItemMutationVariables = Exact<{
  id: Scalars['ID'];
  dealId: Scalars['ID'];
}>;

export type CommerceDeleteDealItemMutation = { __typename?: 'Mutation' } & {
  commerceDeleteDealItem: Maybe<
    { __typename?: 'CommerceDealItem' } & Pick<CommerceDealItem, 'id'>
  >;
};

export type CommerceUpdateDealMutationVariables = Exact<{
  commerceDealUpdate: CommerceDealUpdate;
  id: Scalars['ID'];
}>;

export type CommerceUpdateDealMutation = { __typename?: 'Mutation' } & {
  commerceUpdateDeal: Maybe<
    { __typename?: 'CommerceDeal' } & Pick<CommerceDeal, 'id' | 'name'>
  >;
};

export type CommerceUpdateDealItemMutationVariables = Exact<{
  commerceDealItemUpdate: CommerceDealItemUpdate;
  id: Scalars['ID'];
  dealId: Scalars['ID'];
}>;

export type CommerceUpdateDealItemMutation = { __typename?: 'Mutation' } & {
  commerceUpdateDealItem: Maybe<
    { __typename?: 'CommerceDealItem' } & Pick<CommerceDealItem, 'id'>
  >;
};

export type CommerceUpdateSaleMutationVariables = Exact<{
  commerceSale: CommerceSaleUpdate;
  id: Scalars['ID'];
}>;

export type CommerceUpdateSaleMutation = { __typename?: 'Mutation' } & {
  commerceUpdateSale: Maybe<
    { __typename?: 'CommerceSale' } & Pick<CommerceSale, 'id' | 'name'>
  >;
};

export type CommerceCreateCategoryMutationVariables = Exact<{
  input: CommerceCategoryCreate;
}>;

export type CommerceCreateCategoryMutation = { __typename?: 'Mutation' } & {
  commerceCreateCategory: Maybe<
    { __typename?: 'CommerceCategory' } & Pick<
      CommerceCategory,
      'id' | 'active'
    >
  >;
};

export type CommercePaymentMethodFragment = {
  __typename?: 'CommercePaymentMethod';
} & Pick<CommercePaymentMethod, 'id' | 'name'>;

export type CommerceCreateOrderMutationVariables = Exact<{
  commerceOrderCreate: CommerceOrderCreate;
}>;

export type CommerceCreateOrderMutation = { __typename?: 'Mutation' } & {
  commerceCreateOrder: Maybe<
    { __typename?: 'CommerceOrder' } & Pick<
      CommerceOrder,
      'billed' | 'currency' | 'id' | 'lastUpdatedAt' | 'status'
    > & {
        customer: Maybe<
          { __typename?: 'CommerceCustomer' } & Pick<
            CommerceCustomer,
            'firstName' | 'lastName' | 'email'
          >
        >;
        paymentMethod: Maybe<
          {
            __typename?: 'CommercePaymentMethod';
          } & CommercePaymentMethodFragment
        >;
      }
  >;
};

export type CommerceCreateProductMutationVariables = Exact<{
  input: CommerceProductCreate;
}>;

export type CommerceCreateProductMutation = { __typename?: 'Mutation' } & {
  commerceCreateProduct: Maybe<
    { __typename?: 'CommerceProduct' } & Pick<CommerceProduct, 'id' | 'active'>
  >;
};

export type CommerceSaleProductCreateMutationVariables = Exact<{
  commerceSaleProductCreate: CommerceSaleProductCreate;
  saleId: Scalars['ID'];
}>;

export type CommerceSaleProductCreateMutation = { __typename?: 'Mutation' } & {
  commerceCreateSaleProduct: Maybe<
    { __typename?: 'CommerceSaleProduct' } & Pick<
      CommerceSaleProduct,
      'id' | 'active'
    >
  >;
};

export type CommerceCreateTransactionMutationVariables = Exact<{
  commerceTransactionCreate: CommerceTransactionCreate;
  orderId: Scalars['ID'];
}>;

export type CommerceCreateTransactionMutation = { __typename?: 'Mutation' } & {
  commerceCreateTransaction: Maybe<
    { __typename?: 'CommerceTransaction' } & Pick<CommerceTransaction, 'status'>
  >;
};

export type CommerceCreatePaymentMethodMutationVariables = Exact<{
  paymentMethod: CommercePaymentMethodCreate;
}>;

export type CommerceCreatePaymentMethodMutation = {
  __typename?: 'Mutation';
} & {
  commerceCreatePaymentMethod: Maybe<
    { __typename?: 'CommercePaymentMethod' } & Pick<
      CommercePaymentMethod,
      'id' | 'gateway' | 'active' | 'name'
    >
  >;
};

export type CommerceUpdatePaymentMethodMutationVariables = Exact<{
  paymentMethod: CommercePaymentMethodUpdate;
  id: Scalars['ID'];
}>;

export type CommerceUpdatePaymentMethodMutation = {
  __typename?: 'Mutation';
} & {
  commerceUpdatePaymentMethod: Maybe<
    { __typename?: 'CommercePaymentMethod' } & Pick<
      CommercePaymentMethod,
      'id' | 'gateway' | 'active' | 'name'
    >
  >;
};

export type CommerceUpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CommerceCategoryUpdate;
}>;

export type CommerceUpdateCategoryMutation = { __typename?: 'Mutation' } & {
  commerceUpdateCategory: Maybe<
    { __typename?: 'CommerceCategory' } & Pick<
      CommerceCategory,
      'id' | 'active'
    >
  >;
};

export type CommerceUpdateProductMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CommerceProductUpdate;
}>;

export type CommerceUpdateProductMutation = { __typename?: 'Mutation' } & {
  commerceUpdateProduct: Maybe<
    { __typename?: 'CommerceProduct' } & Pick<CommerceProduct, 'id' | 'active'>
  >;
};

export type CommerceUpdateSaleProductMutationVariables = Exact<{
  commerceSaleProductUpdate: CommerceSaleProductUpdate;
  id: Scalars['ID'];
  saleId: Scalars['ID'];
}>;

export type CommerceUpdateSaleProductMutation = { __typename?: 'Mutation' } & {
  commerceUpdateSaleProduct: Maybe<
    { __typename?: 'CommerceSaleProduct' } & Pick<
      CommerceSaleProduct,
      'id' | 'active'
    >
  >;
};

export type CommerceUpdateStoreMutationVariables = Exact<{
  id: Scalars['ID'];
  input: CommerceStoreUpdate;
}>;

export type CommerceUpdateStoreMutation = { __typename?: 'Mutation' } & {
  commerceUpdateStore: Maybe<
    { __typename?: 'CommerceStore' } & Pick<
      CommerceStore,
      'active' | 'id' | 'name'
    >
  >;
};

export type CreateOrderMutationVariables = Exact<{
  storeId: Scalars['ID'];
  input: CommerceOrderCreate;
}>;

export type CreateOrderMutation = { __typename?: 'Mutation' } & {
  commerceCreateOrder: Maybe<
    { __typename?: 'CommerceOrder' } & Pick<
      CommerceOrder,
      'id' | 'reference' | 'locked' | 'status' | 'metadata'
    > & {
        items: Array<
          { __typename?: 'CommerceOrderItem' } & {
            product: Maybe<
              { __typename?: 'CommerceProduct' } & Pick<CommerceProduct, 'name'>
            >;
          }
        >;
      }
  >;
};

export type EventCreateMutationVariables = Exact<{
  event: EventCreateInput;
}>;

export type EventCreateMutation = { __typename?: 'Mutation' } & {
  eventCreate: Maybe<
    { __typename?: 'EventCreatePayload' } & {
      event: Maybe<
        { __typename?: 'Event' } & Pick<
          Event,
          | 'id'
          | 'name'
          | 'description'
          | 'taxNumber'
          | 'slug'
          | 'startDate'
          | 'endDate'
          | 'timezone'
          | 'baseUrl'
          | 'currency'
        > & {
            country: Maybe<
              { __typename?: 'EventConfigurationCountry' } & Pick<
                EventConfigurationCountry,
                'id' | 'name'
              >
            >;
          }
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type EventUpdateMutationVariables = Exact<{
  input: EventUpdateInput;
}>;

export type EventUpdateMutation = { __typename?: 'Mutation' } & {
  eventUpdate: Maybe<
    { __typename?: 'EventUpdatePayload' } & {
      event: Maybe<
        { __typename?: 'Event' } & Pick<
          Event,
          | 'id'
          | 'name'
          | 'description'
          | 'taxNumber'
          | 'slug'
          | 'startDate'
          | 'endDate'
          | 'timezone'
          | 'baseUrl'
          | 'currency'
        > & {
            country: Maybe<
              { __typename?: 'EventConfigurationCountry' } & Pick<
                EventConfigurationCountry,
                'id' | 'name'
              >
            >;
            legalEntity: Maybe<
              { __typename?: 'LegalEntity' } & Pick<LegalEntity, 'id' | 'name'>
            >;
          }
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type LegalEntityCreateMutationVariables = Exact<{
  input: LegalEntityCreateInput;
}>;

export type LegalEntityCreateMutation = { __typename?: 'Mutation' } & {
  legalEntityCreate: Maybe<
    { __typename?: 'LegalEntityCreatePayload' } & {
      legalEntity: Maybe<
        { __typename?: 'LegalEntity' } & Pick<
          LegalEntity,
          | 'id'
          | 'name'
          | 'regNumber'
          | 'website'
          | 'taxNumber'
          | 'email'
          | 'note'
        > & {
            address: Maybe<
              { __typename?: 'Address' } & Pick<
                Address,
                'id' | 'city' | 'postalCode' | 'lineOne' | 'lineTwo' | 'region'
              > & {
                  country: Maybe<
                    { __typename?: 'EventConfigurationCountry' } & Pick<
                      EventConfigurationCountry,
                      'name'
                    >
                  >;
                }
            >;
          }
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type LegalEntityUpdateMutationVariables = Exact<{
  input: LegalEntityUpdateInput;
}>;

export type LegalEntityUpdateMutation = { __typename?: 'Mutation' } & {
  legalEntityUpdate: Maybe<
    { __typename?: 'LegalEntityUpdatePayload' } & {
      legalEntity: Maybe<
        { __typename?: 'LegalEntity' } & Pick<
          LegalEntity,
          | 'id'
          | 'name'
          | 'regNumber'
          | 'website'
          | 'taxNumber'
          | 'email'
          | 'note'
        > & {
            address: Maybe<
              { __typename?: 'Address' } & Pick<
                Address,
                'id' | 'city' | 'postalCode' | 'lineOne' | 'lineTwo' | 'region'
              > & {
                  country: Maybe<
                    { __typename?: 'EventConfigurationCountry' } & Pick<
                      EventConfigurationCountry,
                      'name'
                    >
                  >;
                }
            >;
          }
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type UpdateCommerceOrderMutationVariables = Exact<{
  commerceOrderUpdate: CommerceOrderUpdate;
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
}>;

export type UpdateCommerceOrderMutation = { __typename?: 'Mutation' } & {
  commerceUpdateOrder: Maybe<
    { __typename?: 'CommerceOrder' } & Pick<CommerceOrder, 'status'>
  >;
};

export type OrderTransferMutationVariables = Exact<{
  input: OrderUpdateInput;
}>;

export type OrderTransferMutation = { __typename?: 'Mutation' } & {
  orderUpdate: Maybe<
    { __typename?: 'OrderUpdatePayload' } & Pick<
      OrderUpdatePayload,
      'clientMutationId'
    > & {
        order: Maybe<
          { __typename?: 'Order' } & {
            owner: { __typename?: 'AssignmentUser' } & Pick<
              AssignmentUser,
              'email'
            >;
          }
        >;
        userErrors: Array<
          { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
        >;
      }
  >;
};

export type TicketMagicLoginLinkRequestMutationVariables = Exact<{
  input: AssignmentMagicLinkLoginRequestInput;
}>;

export type TicketMagicLoginLinkRequestMutation = {
  __typename?: 'Mutation';
} & {
  assignmentMagicLinkLoginRequest: Maybe<
    { __typename?: 'AssignmentMagicLinkLoginRequestPayload' } & {
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type TaxRateCreateMutationVariables = Exact<{
  input: TaxRateCreateInput;
}>;

export type TaxRateCreateMutation = { __typename?: 'Mutation' } & {
  taxRateCreate: Maybe<
    { __typename?: 'TaxRateCreatePayload' } & {
      taxRate: Maybe<
        { __typename?: 'TaxRate' } & Pick<TaxRate, 'id' | 'name' | 'value'>
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type TaxRateUpdateMutationVariables = Exact<{
  input: TaxRateUpdateInput;
}>;

export type TaxRateUpdateMutation = { __typename?: 'Mutation' } & {
  taxRateUpdate: Maybe<
    { __typename?: 'TaxRateUpdatePayload' } & {
      taxRate: Maybe<
        { __typename?: 'TaxRate' } & Pick<TaxRate, 'id' | 'name' | 'value'>
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type TicketAcceptMutationVariables = Exact<{
  ticketId: Scalars['ID'];
}>;

export type TicketAcceptMutation = { __typename?: 'Mutation' } & {
  ticketAccept: Maybe<
    { __typename?: 'TicketAcceptPayload' } & {
      ticket: Maybe<
        { __typename?: 'Ticket' } & Pick<Ticket, 'id'> & {
            assignment: Maybe<
              { __typename?: 'Assignment' } & Pick<Assignment, 'id' | 'state'>
            >;
            context: { __typename?: 'TicketContext' } & Pick<
              TicketContext,
              'assignable' | 'editable' | 'acceptable' | 'rejectable'
            >;
          }
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type TicketAssignMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  ticketId: Scalars['ID'];
  notify?: Maybe<Scalars['Boolean']>;
}>;

export type TicketAssignMutation = { __typename?: 'Mutation' } & {
  ticketAssign: Maybe<
    { __typename?: 'TicketAssignPayload' } & {
      ticket: Maybe<
        { __typename?: 'Ticket' } & Pick<Ticket, 'id'> & {
            assignment: Maybe<
              { __typename?: 'Assignment' } & Pick<
                Assignment,
                'id' | 'state'
              > & {
                  assignee: Maybe<
                    { __typename?: 'AssignmentUser' } & Pick<
                      AssignmentUser,
                      'id' | 'firstName' | 'lastName' | 'email' | 'me'
                    >
                  >;
                }
            >;
            context: { __typename?: 'TicketContext' } & Pick<
              TicketContext,
              'assignable' | 'editable' | 'acceptable' | 'rejectable'
            >;
          }
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type TicketRejectMutationVariables = Exact<{
  ticketId: Scalars['ID'];
}>;

export type TicketRejectMutation = { __typename?: 'Mutation' } & {
  ticketReject: Maybe<
    { __typename?: 'TicketRejectPayload' } & {
      ticket: Maybe<
        { __typename?: 'Ticket' } & Pick<Ticket, 'id'> & {
            assignment: Maybe<
              { __typename?: 'Assignment' } & Pick<Assignment, 'id'>
            >;
            context: { __typename?: 'TicketContext' } & Pick<
              TicketContext,
              'assignable' | 'editable' | 'acceptable' | 'rejectable'
            >;
          }
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type TicketUnvoidMutationVariables = Exact<{
  input: TicketUnvoidInput;
}>;

export type TicketUnvoidMutation = { __typename?: 'Mutation' } & {
  ticketUnvoid: Maybe<
    { __typename?: 'TicketUnvoidPayload' } & {
      ticket: Maybe<
        { __typename?: 'Ticket' } & Pick<Ticket, 'id' | 'state' | 'bookingRef'>
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type VoidTicketMutationVariables = Exact<{
  input: TicketVoidInput;
}>;

export type VoidTicketMutation = { __typename?: 'Mutation' } & {
  ticketVoid: Maybe<
    { __typename?: 'TicketVoidPayload' } & {
      ticket: Maybe<
        { __typename?: 'Ticket' } & Pick<Ticket, 'id' | 'state' | 'bookingRef'>
      >;
      userErrors: Array<
        { __typename?: 'UserError' } & Pick<UserError, 'message' | 'path'>
      >;
    }
  >;
};

export type AccessPermissionsQueryVariables = Exact<{
  ticketTypeIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;

export type AccessPermissionsQuery = { __typename?: 'Query' } & {
  accessPermissions: { __typename?: 'AccessPermissionConnection' } & {
    edges: Array<
      { __typename?: 'AccessPermissionEdge' } & {
        node: { __typename?: 'AccessPermission' } & Pick<
          AccessPermission,
          'id' | 'title' | 'detail'
        > & {
            ticketTypes: { __typename?: 'TicketTypeConnection' } & {
              edges: Array<
                { __typename?: 'TicketTypeEdge' } & {
                  node: { __typename?: 'TicketType' } & Pick<TicketType, 'id'>;
                }
              >;
            };
          };
      }
    >;
  };
};

export type AppConfigQueryVariables = Exact<{ [key: string]: never }>;

export type AppConfigQuery = { __typename?: 'Query' } & {
  appConfig: Maybe<
    { __typename?: 'AppConfig' } & Pick<
      AppConfig,
      | 'googleAnalyticsTrackingId'
      | 'googleTagManagerId'
      | 'googleFontsUrl'
      | 'theme'
    > & {
        googleAnalyticsLinkerDomains: Array<
          {
            __typename?: 'ComponentSiteConfigGoogleAnalyticsLinkerDomainList';
          } & Pick<ComponentSiteConfigGoogleAnalyticsLinkerDomainList, 'domain'>
        >;
        metaData: { __typename?: 'ComponentSiteConfigMetaData' } & Pick<
          ComponentSiteConfigMetaData,
          | 'siteTitle'
          | 'siteDescription'
          | 'facebookId'
          | 'facebookPublisher'
          | 'twitterId'
          | 'twitterCreator'
        > & {
            image: Maybe<
              { __typename?: 'UploadFile' } & { url: UploadFile['absoluteUrl'] }
            >;
          };
      }
  >;
};

export type CommerceGetCustomerQueryVariables = Exact<{
  id: Scalars['ID'];
  orderId: Scalars['ID'];
}>;

export type CommerceGetCustomerQuery = { __typename?: 'Query' } & {
  commerceGetCustomer: Maybe<
    { __typename?: 'CommerceCustomer' } & Pick<
      CommerceCustomer,
      'email' | 'firstName' | 'id' | 'lastName' | 'vatNumber'
    > & {
        address: Maybe<
          { __typename?: 'CommerceAddress' } & Pick<
            CommerceAddress,
            | 'city'
            | 'country'
            | 'id'
            | 'line1'
            | 'line2'
            | 'postalCode'
            | 'state'
          >
        >;
      }
  >;
};

export type CommerceGetDealQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type CommerceGetDealQuery = { __typename?: 'Query' } & {
  commerceGetDeal: Maybe<
    { __typename?: 'CommerceDeal' } & Pick<
      CommerceDeal,
      | 'active'
      | 'createdAt'
      | 'description'
      | 'endDate'
      | 'id'
      | 'lastUpdatedAt'
      | 'metadata'
      | 'name'
      | 'startDate'
    > & {
        dealItems: Maybe<
          Array<
            { __typename?: 'CommerceDealItem' } & Pick<
              CommerceDealItem,
              | 'amount'
              | 'createdAt'
              | 'id'
              | 'lastUpdatedAt'
              | 'max'
              | 'metadata'
              | 'min'
              | 'step'
              | 'type'
            > & {
                product: Maybe<
                  { __typename?: 'CommerceProduct' } & Pick<
                    CommerceProduct,
                    'id' | 'active' | 'description' | 'name' | 'price'
                  > & {
                      taxType: { __typename?: 'CommerceTaxType' } & Pick<
                        CommerceTaxType,
                        'id' | 'description' | 'name'
                      > & {
                          taxes: Maybe<
                            Array<
                              { __typename?: 'CommerceTax' } & Pick<
                                CommerceTax,
                                | 'rateAmount'
                                | 'rateType'
                                | 'id'
                                | 'name'
                                | 'country'
                              >
                            >
                          >;
                        };
                    }
                >;
              }
          >
        >;
      }
  >;
};

export type CommerceUserFragment = { __typename?: 'CommerceUser' } & Pick<
  CommerceUser,
  'name' | 'email' | 'id'
>;

export type CommerceTaxTypeFragment = { __typename?: 'CommerceTaxType' } & Pick<
  CommerceTaxType,
  'createdAt' | 'description' | 'id' | 'lastUpdatedAt' | 'name'
> & {
    createdBy: Maybe<{ __typename?: 'CommerceUser' } & CommerceUserFragment>;
  };

export type CommerceTaxFragment = { __typename?: 'CommerceTax' } & Pick<
  CommerceTax,
  | 'country'
  | 'createdAt'
  | 'id'
  | 'lastUpdatedAt'
  | 'name'
  | 'rateAmount'
  | 'rateType'
> & {
    createdBy: Maybe<{ __typename?: 'CommerceUser' } & CommerceUserFragment>;
    taxType: { __typename?: 'CommerceTaxType' } & CommerceTaxTypeFragment;
  };

export type CommerceProductFragment = { __typename?: 'CommerceProduct' } & Pick<
  CommerceProduct,
  | 'active'
  | 'createdAt'
  | 'description'
  | 'id'
  | 'lastUpdatedAt'
  | 'name'
  | 'price'
  | 'taxMode'
> & {
    createdBy: Maybe<{ __typename?: 'CommerceUser' } & CommerceUserFragment>;
  };

export type CommerceOrderItemFragment = {
  __typename?: 'CommerceOrderItem';
} & Pick<
  CommerceOrderItem,
  | 'createdAt'
  | 'id'
  | 'itemName'
  | 'lastUpdatedAt'
  | 'price'
  | 'productMetadata'
  | 'quantity'
  | 'subTotal'
  | 'taxTotal'
  | 'total'
> & {
    createdBy: Maybe<{ __typename?: 'CommerceUser' } & CommerceUserFragment>;
    product: Maybe<
      { __typename?: 'CommerceProduct' } & CommerceProductFragment
    >;
    tax: Maybe<{ __typename?: 'CommerceTax' } & CommerceTaxFragment>;
  };

export type CommerceAddressFragment = { __typename?: 'CommerceAddress' } & Pick<
  CommerceAddress,
  | 'city'
  | 'country'
  | 'createdAt'
  | 'id'
  | 'lastUpdatedAt'
  | 'line1'
  | 'line2'
  | 'postalCode'
  | 'state'
> & {
    createdBy: Maybe<{ __typename?: 'CommerceUser' } & CommerceUserFragment>;
  };

export type CommerceCustomerFragment = {
  __typename?: 'CommerceCustomer';
} & Pick<
  CommerceCustomer,
  | 'companyName'
  | 'createdAt'
  | 'email'
  | 'firstName'
  | 'id'
  | 'lastName'
  | 'lastUpdatedAt'
  | 'phoneNumber'
  | 'vatNumber'
  | 'vatVerified'
> & {
    address: Maybe<
      { __typename?: 'CommerceAddress' } & CommerceAddressFragment
    >;
    createdBy: Maybe<{ __typename?: 'CommerceUser' } & CommerceUserFragment>;
  };

export type CommerceTransactionFragment = {
  __typename?: 'CommerceTransaction';
} & Pick<
  CommerceTransaction,
  | 'amount'
  | 'createdAt'
  | 'currency'
  | 'id'
  | 'lastUpdatedAt'
  | 'metadata'
  | 'refundedTransaction'
  | 'status'
  | 'timestamp'
  | 'type'
> & {
    createdBy: Maybe<{ __typename?: 'CommerceUser' } & CommerceUserFragment>;
    paymentMethod: Maybe<
      { __typename?: 'CommercePaymentMethod' } & CommercePaymentMethodFragment
    >;
  };

export type CommerceGetOrderQueryVariables = Exact<{
  id: Scalars['ID'];
  storeId?: Maybe<Scalars['ID']>;
}>;

export type CommerceGetOrderQuery = { __typename?: 'Query' } & {
  commerceGetOrder: Maybe<
    { __typename?: 'CommerceOrder' } & Pick<
      CommerceOrder,
      | 'billed'
      | 'createdAt'
      | 'currency'
      | 'currencySymbol'
      | 'id'
      | 'invoiceUrl'
      | 'lastUpdatedAt'
      | 'locked'
      | 'paid'
      | 'paymentStatus'
      | 'reference'
      | 'status'
      | 'subTotal'
      | 'taxTotal'
      | 'total'
      | 'url'
    > & {
        createdBy: Maybe<
          { __typename?: 'CommerceUser' } & CommerceUserFragment
        >;
        customer: Maybe<
          { __typename?: 'CommerceCustomer' } & CommerceCustomerFragment
        >;
        items: Array<
          { __typename?: 'CommerceOrderItem' } & CommerceOrderItemFragment
        >;
        paymentMethod: Maybe<
          {
            __typename?: 'CommercePaymentMethod';
          } & CommercePaymentMethodFragment
        >;
        transactions: Maybe<
          Array<
            Maybe<
              {
                __typename?: 'CommerceTransaction';
              } & CommerceTransactionFragment
            >
          >
        >;
      }
  >;
};

export type CommerceGetProductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type CommerceGetProductQuery = { __typename?: 'Query' } & {
  commerceGetProduct: Maybe<
    { __typename?: 'CommerceProduct' } & Pick<
      CommerceProduct,
      | 'active'
      | 'createdAt'
      | 'defaultPrice'
      | 'description'
      | 'id'
      | 'lastUpdatedAt'
      | 'name'
      | 'metadata'
      | 'price'
      | 'taxMode'
    > & {
        categories: Maybe<
          Array<
            { __typename?: 'CommerceCategory' } & Pick<
              CommerceCategory,
              'id' | 'active' | 'name' | 'description'
            >
          >
        >;
        createdBy: Maybe<
          { __typename?: 'CommerceUser' } & Pick<CommerceUser, 'name' | 'email'>
        >;
        lastUpdatedBy: Maybe<
          { __typename?: 'CommerceUser' } & Pick<CommerceUser, 'name' | 'email'>
        >;
        tags: Maybe<
          Array<
            { __typename?: 'CommerceTag' } & Pick<
              CommerceTag,
              'id' | 'code' | 'name' | 'description'
            >
          >
        >;
        taxType: { __typename?: 'CommerceTaxType' } & Pick<
          CommerceTaxType,
          'id' | 'description' | 'name'
        > & {
            taxes: Maybe<
              Array<
                { __typename?: 'CommerceTax' } & Pick<
                  CommerceTax,
                  'rateAmount' | 'rateType' | 'name' | 'country'
                >
              >
            >;
          };
      }
  >;
};

export type CommerceGetStoreQueryVariables = Exact<{ [key: string]: never }>;

export type CommerceGetStoreQuery = { __typename?: 'Query' } & {
  commerceGetStore: Maybe<
    { __typename?: 'CommerceStore' } & Pick<
      CommerceStore,
      | 'id'
      | 'name'
      | 'active'
      | 'baseUrl'
      | 'slug'
      | 'currencySymbol'
      | 'country'
    > & {
        taxTypes: Maybe<
          Array<
            { __typename?: 'CommerceTaxType' } & Pick<
              CommerceTaxType,
              'id' | 'name' | 'description'
            > & {
                taxes: Maybe<
                  Array<
                    { __typename?: 'CommerceTax' } & Pick<
                      CommerceTax,
                      'id' | 'country' | 'name' | 'rateAmount' | 'rateType'
                    >
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type CommerceListCategoriesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CommerceListCategoriesQuery = { __typename?: 'Query' } & {
  commerceListCategories: Maybe<
    { __typename?: 'CommerceSearchResponseCategory' } & {
      hits: Maybe<
        Array<
          { __typename?: 'CommerceCategory' } & Pick<
            CommerceCategory,
            'id' | 'name' | 'lastUpdatedAt' | 'description' | 'active'
          > & {
              createdBy: Maybe<
                { __typename?: 'CommerceUser' } & Pick<
                  CommerceUser,
                  'id' | 'name' | 'email'
                >
              >;
            }
        >
      >;
    }
  >;
};

export type CommerceListDealItemsQueryVariables = Exact<{
  dealId: Scalars['ID'];
}>;

export type CommerceListDealItemsQuery = { __typename?: 'Query' } & {
  commerceListDealItems: Maybe<
    { __typename?: 'CommerceSearchResponseDealItem' } & {
      hits: Maybe<
        Array<
          { __typename?: 'CommerceDealItem' } & Pick<
            CommerceDealItem,
            | 'amount'
            | 'createdAt'
            | 'id'
            | 'lastUpdatedAt'
            | 'max'
            | 'metadata'
            | 'min'
            | 'name'
            | 'step'
            | 'type'
          > & {
              createdBy: Maybe<
                { __typename?: 'CommerceUser' } & Pick<
                  CommerceUser,
                  'name' | 'id'
                >
              >;
              lastUpdatedBy: Maybe<
                { __typename?: 'CommerceUser' } & Pick<
                  CommerceUser,
                  'name' | 'id'
                >
              >;
              product: Maybe<
                { __typename?: 'CommerceProduct' } & Pick<
                  CommerceProduct,
                  'id' | 'name'
                >
              >;
            }
        >
      >;
    }
  >;
};

export type CommerceListDealsQueryVariables = Exact<{
  sort?: Maybe<Array<CommerceSortTerm> | CommerceSortTerm>;
}>;

export type CommerceListDealsQuery = { __typename?: 'Query' } & {
  commerceListDeals: Maybe<
    { __typename?: 'CommerceSearchResponseDeal' } & Pick<
      CommerceSearchResponseDeal,
      'total'
    > & {
        hits: Maybe<
          Array<
            { __typename?: 'CommerceDeal' } & Pick<
              CommerceDeal,
              | 'active'
              | 'createdAt'
              | 'description'
              | 'endDate'
              | 'id'
              | 'lastUpdatedAt'
              | 'metadata'
              | 'name'
              | 'startDate'
            > & {
                dealItems: Maybe<
                  Array<
                    { __typename?: 'CommerceDealItem' } & Pick<
                      CommerceDealItem,
                      | 'amount'
                      | 'createdAt'
                      | 'id'
                      | 'lastUpdatedAt'
                      | 'max'
                      | 'metadata'
                      | 'min'
                      | 'step'
                      | 'type'
                    > & {
                        product: Maybe<
                          { __typename?: 'CommerceProduct' } & Pick<
                            CommerceProduct,
                            'id' | 'name' | 'price'
                          > & {
                              categories: Maybe<
                                Array<
                                  { __typename?: 'CommerceCategory' } & Pick<
                                    CommerceCategory,
                                    'id' | 'name'
                                  > & {
                                      children: Maybe<
                                        Array<
                                          {
                                            __typename?: 'CommerceCategory';
                                          } & Pick<
                                            CommerceCategory,
                                            'id' | 'name'
                                          >
                                        >
                                      >;
                                    }
                                >
                              >;
                            }
                        >;
                      }
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type CommerceListPaymentMethodsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CommerceListPaymentMethodsQuery = { __typename?: 'Query' } & {
  commerceListPaymentMethods: Maybe<
    { __typename?: 'CommerceSearchResponsePaymentMethod' } & {
      hits: Maybe<
        Array<
          { __typename?: 'CommercePaymentMethod' } & Pick<
            CommercePaymentMethod,
            'id' | 'name' | 'configuration' | 'active' | 'gateway'
          >
        >
      >;
    }
  >;
};

export type CommerceListProductsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CommerceListProductsQuery = { __typename?: 'Query' } & {
  commerceListProducts: Maybe<
    { __typename?: 'CommerceSearchResponseProduct' } & {
      hits: Maybe<
        Array<
          { __typename?: 'CommerceProduct' } & Pick<
            CommerceProduct,
            | 'active'
            | 'createdAt'
            | 'defaultPrice'
            | 'description'
            | 'id'
            | 'lastUpdatedAt'
            | 'name'
            | 'price'
            | 'taxMode'
          > & {
              categories: Maybe<
                Array<
                  { __typename?: 'CommerceCategory' } & Pick<
                    CommerceCategory,
                    'id' | 'active' | 'name' | 'description'
                  >
                >
              >;
              createdBy: Maybe<
                { __typename?: 'CommerceUser' } & Pick<
                  CommerceUser,
                  'name' | 'email'
                >
              >;
              lastUpdatedBy: Maybe<
                { __typename?: 'CommerceUser' } & Pick<
                  CommerceUser,
                  'name' | 'email'
                >
              >;
              tags: Maybe<
                Array<
                  { __typename?: 'CommerceTag' } & Pick<
                    CommerceTag,
                    'id' | 'code' | 'name' | 'description'
                  >
                >
              >;
              taxType: { __typename?: 'CommerceTaxType' } & Pick<
                CommerceTaxType,
                'id' | 'description' | 'name'
              >;
            }
        >
      >;
    }
  >;
};

export type CommerceListSaleProductsQueryVariables = Exact<{
  saleId: Scalars['ID'];
  sort?: Maybe<Array<CommerceSortTerm> | CommerceSortTerm>;
}>;

export type CommerceListSaleProductsQuery = { __typename?: 'Query' } & {
  commerceListSaleProducts: Maybe<
    { __typename?: 'CommerceSearchResponseSaleProduct' } & Pick<
      CommerceSearchResponseSaleProduct,
      'total'
    > & {
        hits: Maybe<
          Array<
            { __typename?: 'CommerceSaleProduct' } & Pick<
              CommerceSaleProduct,
              | 'active'
              | 'createdAt'
              | 'id'
              | 'price'
              | 'description'
              | 'name'
              | 'type'
            > & {
                createdBy: Maybe<
                  { __typename?: 'CommerceUser' } & Pick<
                    CommerceUser,
                    'id' | 'name' | 'email'
                  >
                >;
                product: Maybe<
                  { __typename?: 'CommerceProduct' } & Pick<
                    CommerceProduct,
                    'id' | 'name'
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type CommerceListStoresQueryVariables = Exact<{ [key: string]: never }>;

export type CommerceListStoresQuery = { __typename?: 'Query' } & {
  commerceListStores: Maybe<
    { __typename?: 'CommerceSearchResponseStore' } & {
      hits: Maybe<
        Array<
          { __typename?: 'CommerceStore' } & Pick<
            CommerceStore,
            'id' | 'name' | 'slug' | 'currencySymbol' | 'country'
          > & {
              taxTypes: Maybe<
                Array<
                  { __typename?: 'CommerceTaxType' } & Pick<
                    CommerceTaxType,
                    'id' | 'name' | 'description'
                  > & {
                      taxes: Maybe<
                        Array<
                          { __typename?: 'CommerceTax' } & Pick<
                            CommerceTax,
                            | 'id'
                            | 'country'
                            | 'name'
                            | 'rateAmount'
                            | 'rateType'
                          >
                        >
                      >;
                    }
                >
              >;
            }
        >
      >;
    }
  >;
};

export type CommerceListTagsQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<CommerceSortTerm> | CommerceSortTerm>;
  storeId?: Maybe<Scalars['ID']>;
  terms?: Maybe<Array<CommerceSearchTerm> | CommerceSearchTerm>;
}>;

export type CommerceListTagsQuery = { __typename?: 'Query' } & {
  commerceListTags: Maybe<
    { __typename?: 'CommerceSearchResponseTag' } & {
      hits: Maybe<
        Array<
          { __typename?: 'CommerceTag' } & Pick<
            CommerceTag,
            'id' | 'code' | 'description' | 'name'
          >
        >
      >;
    }
  >;
};

export type CommerceListTaxTypesQueryVariables = Exact<{
  [key: string]: never;
}>;

export type CommerceListTaxTypesQuery = { __typename?: 'Query' } & {
  commerceListTaxTypes: Maybe<
    { __typename?: 'CommerceSearchResponseTaxType' } & {
      hits: Maybe<
        Array<
          { __typename?: 'CommerceTaxType' } & Pick<
            CommerceTaxType,
            'id' | 'description' | 'name'
          >
        >
      >;
    }
  >;
};

export type CommerceUpdateCustomerMutationVariables = Exact<{
  commerceCustomerUpdate: CommerceCustomerUpdate;
  id: Scalars['ID'];
  orderId: Scalars['ID'];
}>;

export type CommerceUpdateCustomerMutation = { __typename?: 'Mutation' } & {
  commerceUpdateCustomer: Maybe<
    { __typename?: 'CommerceCustomer' } & Pick<CommerceCustomer, 'id'>
  >;
};

export type CountriesQueryVariables = Exact<{ [key: string]: never }>;

export type CountriesQuery = { __typename?: 'Query' } & {
  countries: { __typename?: 'EventConfigurationCountryConnection' } & {
    edges: Array<
      { __typename?: 'EventConfigurationCountryEdge' } & {
        node: { __typename?: 'EventConfigurationCountry' } & Pick<
          EventConfigurationCountry,
          'name' | 'code' | 'id'
        >;
      }
    >;
  };
};

export type EventQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;

export type EventQuery = { __typename?: 'Query' } & {
  event: Maybe<
    { __typename?: 'Event' } & Pick<
      Event,
      | 'id'
      | 'name'
      | 'description'
      | 'slug'
      | 'startDate'
      | 'endDate'
      | 'timezone'
      | 'baseUrl'
      | 'taxNumber'
      | 'currency'
    > & {
        timeZone: Maybe<
          { __typename?: 'TimeZone' } & Pick<
            TimeZone,
            'displayName' | 'ianaName' | 'utcOffset'
          >
        >;
        country: Maybe<
          { __typename?: 'EventConfigurationCountry' } & Pick<
            EventConfigurationCountry,
            'id' | 'name' | 'code'
          >
        >;
        legalEntity: Maybe<
          { __typename?: 'LegalEntity' } & Pick<
            LegalEntity,
            | 'note'
            | 'email'
            | 'id'
            | 'name'
            | 'phone'
            | 'regNumber'
            | 'taxNumber'
            | 'website'
          > & {
              address: Maybe<
                { __typename?: 'Address' } & Pick<
                  Address,
                  | 'city'
                  | 'id'
                  | 'lineOne'
                  | 'lineTwo'
                  | 'postalCode'
                  | 'region'
                > & {
                    country: Maybe<
                      { __typename?: 'EventConfigurationCountry' } & Pick<
                        EventConfigurationCountry,
                        'id' | 'name'
                      >
                    >;
                  }
              >;
            }
        >;
        taxRates: Maybe<
          { __typename?: 'TaxRateConnection' } & {
            edges: Array<
              { __typename?: 'TaxRateEdge' } & {
                node: { __typename?: 'TaxRate' } & Pick<
                  TaxRate,
                  'id' | 'rateType' | 'name' | 'taxType' | 'value'
                > & {
                    country: {
                      __typename?: 'EventConfigurationCountry';
                    } & Pick<EventConfigurationCountry, 'name' | 'id' | 'code'>;
                  };
              }
            >;
          }
        >;
      }
  >;
};

export type EventListQueryQueryVariables = Exact<{
  filter?: Maybe<EventFilter>;
}>;

export type EventListQueryQuery = { __typename?: 'Query' } & {
  events: { __typename?: 'EventConnection' } & {
    edges: Array<
      { __typename?: 'EventEdge' } & Pick<EventEdge, 'cursor'> & {
          node: { __typename?: 'Event' } & Pick<
            Event,
            | 'id'
            | 'name'
            | 'description'
            | 'slug'
            | 'startDate'
            | 'endDate'
            | 'timezone'
            | 'baseUrl'
          > & {
              country: Maybe<
                { __typename?: 'EventConfigurationCountry' } & Pick<
                  EventConfigurationCountry,
                  'name'
                >
              >;
              versions: Maybe<
                Array<
                  { __typename?: 'PaperTrailVersion' } & Pick<
                    PaperTrailVersion,
                    'event' | 'createdAt' | 'whodunnit'
                  >
                >
              >;
              taxRates: Maybe<
                { __typename?: 'TaxRateConnection' } & {
                  edges: Array<
                    { __typename?: 'TaxRateEdge' } & {
                      node: { __typename?: 'TaxRate' } & Pick<
                        TaxRate,
                        'id' | 'rateType' | 'name' | 'taxType' | 'value'
                      > & {
                          country: {
                            __typename?: 'EventConfigurationCountry';
                          } & Pick<EventConfigurationCountry, 'name'>;
                        };
                    }
                  >;
                }
              >;
            };
        }
    >;
    pageInfo: { __typename?: 'PageInfo' } & Pick<
      PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
    >;
  };
};

export type EventTimeZoneQueryVariables = Exact<{
  slug?: Maybe<Scalars['String']>;
}>;

export type EventTimeZoneQuery = { __typename?: 'Query' } & {
  event: Maybe<
    { __typename?: 'Event' } & {
      timeZone: Maybe<
        { __typename?: 'TimeZone' } & Pick<
          TimeZone,
          'displayName' | 'ianaName' | 'utcOffset'
        >
      >;
    }
  >;
};

export type TaEventDataQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type TaEventDataQuery = { __typename?: 'Query' } & {
  taEvent: Maybe<
    { __typename?: 'TAEvent' } & Pick<
      TaEvent,
      | 'id'
      | 'slug'
      | 'name'
      | 'industries'
      | 'companySizes'
      | 'passportRequired'
    >
  >;
};

export type LegalEntityQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type LegalEntityQuery = { __typename?: 'Query' } & {
  legalEntity: { __typename?: 'LegalEntity' } & Pick<
    LegalEntity,
    | 'email'
    | 'id'
    | 'name'
    | 'phone'
    | 'regNumber'
    | 'taxNumber'
    | 'website'
    | 'note'
  > & {
      address: Maybe<
        { __typename?: 'Address' } & Pick<
          Address,
          'city' | 'id' | 'lineOne' | 'lineTwo' | 'postalCode' | 'region'
        > & {
            country: Maybe<
              { __typename?: 'EventConfigurationCountry' } & Pick<
                EventConfigurationCountry,
                'code' | 'id' | 'name'
              >
            >;
          }
      >;
    };
};

export type LegalEntitiesQueryVariables = Exact<{ [key: string]: never }>;

export type LegalEntitiesQuery = { __typename?: 'Query' } & {
  legalEntities: { __typename?: 'LegalEntityConnection' } & {
    edges: Array<
      { __typename?: 'LegalEntityEdge' } & Pick<LegalEntityEdge, 'cursor'> & {
          node: { __typename?: 'LegalEntity' } & Pick<
            LegalEntity,
            | 'id'
            | 'name'
            | 'regNumber'
            | 'website'
            | 'taxNumber'
            | 'email'
            | 'note'
          > & {
              address: Maybe<
                { __typename?: 'Address' } & Pick<
                  Address,
                  | 'id'
                  | 'city'
                  | 'postalCode'
                  | 'lineOne'
                  | 'lineTwo'
                  | 'region'
                > & {
                    country: Maybe<
                      { __typename?: 'EventConfigurationCountry' } & Pick<
                        EventConfigurationCountry,
                        'name'
                      >
                    >;
                  }
              >;
            };
        }
    >;
    pageInfo: { __typename?: 'PageInfo' } & Pick<
      PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
    >;
  };
};

export type MyAssignmentDashboardQueryVariables = Exact<{
  [key: string]: never;
}>;

export type MyAssignmentDashboardQuery = { __typename?: 'Query' } & {
  assignmentUser: Maybe<
    { __typename?: 'AssignmentUser' } & Pick<AssignmentUser, 'email'>
  >;
  orders: { __typename?: 'OrderConnection' } & {
    edges: Array<
      { __typename?: 'OrderEdge' } & {
        node: { __typename?: 'Order' } & Pick<
          Order,
          'id' | 'reference' | 'amount' | 'currency' | 'completedAt'
        > & {
            summary: { __typename?: 'OrderSummary' } & Pick<
              OrderSummary,
              'tickets'
            > & {
                ticketType: Maybe<
                  { __typename?: 'TicketType' } & Pick<TicketType, 'name'>
                >;
              };
          };
      }
    >;
  };
};

export type MyDashboardQueryVariables = Exact<{ [key: string]: never }>;

export type MyDashboardQuery = { __typename?: 'Query' } & {
  orders: { __typename?: 'OrderConnection' } & {
    edges: Array<
      { __typename?: 'OrderEdge' } & {
        node: { __typename?: 'Order' } & Pick<Order, 'id'>;
      }
    >;
  };
  tickets: { __typename?: 'TicketConnection' } & {
    edges: Array<
      { __typename?: 'TicketEdge' } & {
        node: { __typename?: 'Ticket' } & Pick<Ticket, 'id'>;
      }
    >;
  };
};

export type MyOrdersQueryVariables = Exact<{ [key: string]: never }>;

export type MyOrdersQuery = { __typename?: 'Query' } & {
  orders: { __typename?: 'OrderConnection' } & {
    edges: Array<
      { __typename?: 'OrderEdge' } & {
        node: { __typename?: 'Order' } & Pick<
          Order,
          'id' | 'reference' | 'amount' | 'currency' | 'completedAt'
        > & {
            summary: { __typename?: 'OrderSummary' } & Pick<
              OrderSummary,
              'tickets'
            > & {
                ticketType: Maybe<
                  { __typename?: 'TicketType' } & Pick<TicketType, 'name'>
                >;
              };
          };
      }
    >;
  };
};

export type MyTicketsQueryVariables = Exact<{ [key: string]: never }>;

export type MyTicketsQuery = { __typename?: 'Query' } & {
  tickets: { __typename?: 'TicketConnection' } & {
    edges: Array<
      { __typename?: 'TicketEdge' } & {
        node: { __typename?: 'Ticket' } & Pick<
          Ticket,
          'id' | 'bookingRef' | 'state'
        > & {
            ticketType: Maybe<
              { __typename?: 'TicketType' } & Pick<TicketType, 'name'>
            >;
            assignment: Maybe<
              { __typename?: 'Assignment' } & Pick<
                Assignment,
                'id' | 'state' | 'appLoginEmail'
              > & {
                  assignee: Maybe<
                    { __typename?: 'AssignmentUser' } & Pick<
                      AssignmentUser,
                      | 'id'
                      | 'me'
                      | 'firstName'
                      | 'lastName'
                      | 'email'
                      | 'phoneNumber'
                      | 'city'
                      | 'companyName'
                      | 'companySizeId'
                      | 'industryId'
                      | 'jobTitle'
                      | 'marketingConsent'
                      | 'passportNumber'
                      | 'personalisationConsent'
                    >
                  >;
                }
            >;
            context: { __typename?: 'TicketContext' } & Pick<
              TicketContext,
              'assignable' | 'editable' | 'acceptable' | 'rejectable'
            >;
          };
      }
    >;
  };
};

export type TicketsSummaryFragment = { __typename?: 'TicketsSummary' } & {
  all: { __typename?: 'All' } & Pick<All, 'count'> & {
      active: { __typename?: 'Active' } & Pick<Active, 'count'> & {
          assigned: { __typename?: 'Assigned' } & Pick<Assigned, 'count'> & {
              accepted: { __typename?: 'Accepted' } & Pick<Accepted, 'count'>;
              checkedIn: { __typename?: 'CheckedIn' } & Pick<
                CheckedIn,
                'count'
              >;
              duplicate: { __typename?: 'Duplicate' } & Pick<
                Duplicate,
                'count'
              >;
              locked: { __typename?: 'Locked' } & Pick<Locked, 'count'>;
              pending: { __typename?: 'Pending' } & Pick<Pending, 'count'>;
            };
          unassigned: { __typename?: 'Unassigned' } & Pick<
            Unassigned,
            'count'
          > & {
              neverAssigned: { __typename?: 'NeverAssigned' } & Pick<
                NeverAssigned,
                'count'
              >;
              rejected: { __typename?: 'Rejected' } & Pick<Rejected, 'count'>;
            };
        };
      void: { __typename?: 'Void' } & Pick<Void, 'count'>;
    };
};

export type OrderByRefQueryVariables = Exact<{
  reference: Scalars['String'];
}>;

export type OrderByRefQuery = { __typename?: 'Query' } & {
  order: Maybe<
    { __typename?: 'Order' } & Pick<
      Order,
      | 'id'
      | 'invoiceUrl'
      | 'amount'
      | 'currency'
      | 'reference'
      | 'completedAt'
      | 'lastUpdatedAt'
      | 'state'
      | 'source'
      | 'sourceId'
    > & {
        ticketsSummary: {
          __typename?: 'TicketsSummary';
        } & TicketsSummaryFragment;
        owner: { __typename?: 'AssignmentUser' } & Pick<
          AssignmentUser,
          'id' | 'firstName' | 'lastName' | 'email'
        >;
        summary: { __typename?: 'OrderSummary' } & Pick<
          OrderSummary,
          'tickets'
        > & {
            ticketType: Maybe<
              { __typename?: 'TicketType' } & Pick<TicketType, 'name'>
            >;
          };
        tickets: { __typename?: 'TicketConnection' } & {
          edges: Array<
            { __typename?: 'TicketEdge' } & {
              node: { __typename?: 'Ticket' } & Pick<
                Ticket,
                'id' | 'bookingRef' | 'state'
              > & {
                  ticketType: Maybe<
                    { __typename?: 'TicketType' } & Pick<TicketType, 'name'>
                  >;
                  order: { __typename?: 'Order' } & {
                    owner: { __typename?: 'AssignmentUser' } & Pick<
                      AssignmentUser,
                      'firstName' | 'lastName' | 'email' | 'id'
                    >;
                  };
                  assignment: Maybe<
                    { __typename?: 'Assignment' } & Pick<
                      Assignment,
                      'id' | 'appLoginEmail' | 'state'
                    > & {
                        assigner: Maybe<
                          { __typename?: 'AssignmentUser' } & Pick<
                            AssignmentUser,
                            'id' | 'email' | 'firstName' | 'lastName'
                          >
                        >;
                        assignee: Maybe<
                          { __typename?: 'AssignmentUser' } & Pick<
                            AssignmentUser,
                            | 'id'
                            | 'email'
                            | 'firstName'
                            | 'lastName'
                            | 'lastLoginTokenCreatedAt'
                          >
                        >;
                      }
                  >;
                };
            }
          >;
        };
      }
  >;
};

export type OrderTicketsQueryVariables = Exact<{
  orderId?: Maybe<Scalars['ID']>;
  filter?: Maybe<TicketFilter>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
}>;

export type OrderTicketsQuery = { __typename?: 'Query' } & {
  tickets: { __typename?: 'TicketConnection' } & {
    pageInfo: { __typename?: 'PageInfo' } & Pick<
      PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'endCursor' | 'startCursor'
    >;
    edges: Array<
      { __typename?: 'TicketEdge' } & {
        node: { __typename?: 'Ticket' } & Pick<
          Ticket,
          'id' | 'bookingRef' | 'state'
        > & {
            ticketType: Maybe<
              { __typename?: 'TicketType' } & Pick<TicketType, 'name'>
            >;
            assignment: Maybe<
              { __typename?: 'Assignment' } & Pick<
                Assignment,
                'id' | 'state' | 'appLoginEmail'
              > & {
                  assignee: Maybe<
                    { __typename?: 'AssignmentUser' } & Pick<
                      AssignmentUser,
                      | 'id'
                      | 'me'
                      | 'firstName'
                      | 'lastName'
                      | 'email'
                      | 'phoneNumber'
                      | 'city'
                      | 'companyName'
                      | 'companySizeId'
                      | 'industryId'
                      | 'jobTitle'
                      | 'marketingConsent'
                      | 'passportNumber'
                      | 'personalisationConsent'
                    >
                  >;
                }
            >;
            order: { __typename?: 'Order' } & Pick<Order, 'reference'>;
            context: { __typename?: 'TicketContext' } & Pick<
              TicketContext,
              'assignable' | 'editable' | 'acceptable' | 'rejectable'
            >;
          };
      }
    >;
  };
};

export type SaleCyclesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type SaleCyclesQuery = { __typename?: 'Query' } & {
  commerceGetSale: Maybe<
    { __typename?: 'CommerceSale' } & Pick<
      CommerceSale,
      | 'active'
      | 'createdAt'
      | 'description'
      | 'endDate'
      | 'id'
      | 'lastUpdatedAt'
      | 'name'
      | 'startDate'
    > & {
        createdBy: Maybe<
          { __typename?: 'CommerceUser' } & Pick<
            CommerceUser,
            'id' | 'name' | 'email'
          >
        >;
      }
  >;
};

export type SalesCyclesQueryVariables = Exact<{ [key: string]: never }>;

export type SalesCyclesQuery = { __typename?: 'Query' } & {
  commerceListSales: Maybe<
    { __typename?: 'CommerceSearchResponseSale' } & Pick<
      CommerceSearchResponseSale,
      'total'
    > & {
        hits: Maybe<
          Array<
            { __typename?: 'CommerceSale' } & Pick<
              CommerceSale,
              | 'active'
              | 'createdAt'
              | 'description'
              | 'endDate'
              | 'id'
              | 'lastUpdatedAt'
              | 'name'
              | 'startDate'
            > & {
                createdBy: Maybe<
                  { __typename?: 'CommerceUser' } & Pick<
                    CommerceUser,
                    'id' | 'name' | 'email'
                  >
                >;
              }
          >
        >;
      }
  >;
};

export type TaxRatesQueryVariables = Exact<{ [key: string]: never }>;

export type TaxRatesQuery = { __typename?: 'Query' } & {
  taxRates: { __typename?: 'TaxRateConnection' } & {
    edges: Array<
      { __typename?: 'TaxRateEdge' } & {
        node: { __typename?: 'TaxRate' } & Pick<
          TaxRate,
          'id' | 'name' | 'rateType' | 'taxType' | 'value'
        > & {
            country: { __typename?: 'EventConfigurationCountry' } & Pick<
              EventConfigurationCountry,
              'name'
            >;
            event: { __typename?: 'Event' } & Pick<Event, 'name' | 'brandName'>;
          };
      }
    >;
  };
};

export type TicketCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type TicketCategoriesQuery = { __typename?: 'Query' } & {
  ticketCategories: { __typename?: 'TicketCategoryConnection' } & {
    edges: Array<
      { __typename?: 'TicketCategoryEdge' } & {
        node: { __typename?: 'TicketCategory' } & Pick<
          TicketCategory,
          'id' | 'name'
        > & {
            ticketTypes: { __typename?: 'TicketTypeConnection' } & {
              edges: Array<
                { __typename?: 'TicketTypeEdge' } & {
                  node: { __typename?: 'TicketType' } & Pick<TicketType, 'id'>;
                }
              >;
            };
          };
      }
    >;
  };
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never }>;

export type Unnamed_1_Query = { __typename?: 'Query' } & {
  tickets: { __typename?: 'TicketConnection' } & {
    edges: Array<
      { __typename?: 'TicketEdge' } & {
        node: { __typename?: 'Ticket' } & Pick<
          Ticket,
          'id' | 'bookingRef' | 'state'
        > & {
            ticketType: Maybe<
              { __typename?: 'TicketType' } & Pick<TicketType, 'name'>
            >;
            order: { __typename?: 'Order' } & {
              owner: { __typename?: 'AssignmentUser' } & Pick<
                AssignmentUser,
                'firstName' | 'lastName' | 'email'
              >;
            };
            assignment: Maybe<
              { __typename?: 'Assignment' } & Pick<Assignment, 'state'> & {
                  assignee: Maybe<
                    { __typename?: 'AssignmentUser' } & Pick<
                      AssignmentUser,
                      'email' | 'firstName' | 'lastName'
                    >
                  >;
                }
            >;
          };
      }
    >;
  };
};

export type TicketReleasePhaseQueryVariables = Exact<{
  id?: Maybe<Scalars['ID']>;
}>;

export type TicketReleasePhaseQuery = { __typename?: 'Query' } & {
  ticketReleasePhase: Maybe<
    { __typename?: 'TicketReleasePhase' } & Pick<
      TicketReleasePhase,
      'id' | 'name' | 'active' | 'status' | 'startsAt' | 'endsAt'
    > & {
        nextPhase: Maybe<
          { __typename?: 'TicketReleasePhase' } & Pick<
            TicketReleasePhase,
            'name'
          >
        >;
      }
  >;
};

export type TicketReleasesQueryVariables = Exact<{
  releasePhaseIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
  ticketTypeIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;

export type TicketReleasesQuery = { __typename?: 'Query' } & {
  ticketReleases: { __typename?: 'TicketReleaseConnection' } & {
    edges: Array<
      { __typename?: 'TicketReleaseEdge' } & {
        node: { __typename?: 'TicketRelease' } & DisplayReleaseFragment;
      }
    >;
  };
};

export type DisplayReleaseFragment = { __typename?: 'TicketRelease' } & Pick<
  TicketRelease,
  'id' | 'name' | 'description' | 'active' | 'soldOut'
> & {
    action: Maybe<
      | ({ __typename: 'TicketReleaseActionsExpiredTicketAction' } & Pick<
          TicketReleaseActionsExpiredTicketAction,
          'message'
        > & {
            suggestedRelease: Maybe<
              { __typename?: 'TicketRelease' } & Pick<TicketRelease, 'id'>
            >;
          })
      | ({ __typename: 'TicketReleaseActionsPriceAlertAction' } & {
          dynamicForm: { __typename?: 'DynamicForm' } & Pick<
            DynamicForm,
            'id' | 'schema' | 'uiSchema' | 'mutation' | 'data'
          >;
        })
      | ({ __typename: 'TicketReleaseActionsPriceEnquiryAction' } & Pick<
          TicketReleaseActionsPriceEnquiryAction,
          'emailAddress'
        >)
      | ({ __typename: 'TicketReleaseActionsTitoCheckoutAction' } & Pick<
          TicketReleaseActionsTitoCheckoutAction,
          'quantity'
        >)
    >;
    price: Maybe<{ __typename?: 'Price' } & DisplayPriceFragment>;
    ticketType: { __typename?: 'TicketType' } & Pick<TicketType, 'id'> & {
        accessPermissions: { __typename?: 'AccessPermissionConnection' } & {
          edges: Array<
            { __typename?: 'AccessPermissionEdge' } & {
              node: { __typename?: 'AccessPermission' } & Pick<
                AccessPermission,
                'id' | 'title' | 'detail'
              >;
            }
          >;
        };
      };
    source: Maybe<
      { __typename: 'TitoTicketRelease' } & Pick<TitoTicketRelease, 'url'>
    >;
  };

export type DisplayPriceFragment = { __typename: 'Price' } & {
  exTax: { __typename?: 'Money' } & DisplayMoneyFragment;
  totalTax: { __typename?: 'Money' } & DisplayMoneyFragment;
  total: { __typename?: 'Money' } & DisplayMoneyFragment;
  taxLines: Array<{ __typename?: 'TaxLine' } & Pick<TaxLine, 'name' | 'rate'>>;
};

export type DisplayMoneyFragment = { __typename?: 'Money' } & Pick<
  Money,
  'format'
> & {
    currency: { __typename?: 'Currency' } & Pick<Currency, 'code' | 'symbol'>;
  };

export type TicketTypeReleasePhaseSummaryQueryVariables = Exact<{
  ticketTypeId: Scalars['ID'];
  releasePhaseId?: Maybe<Scalars['ID']>;
}>;

export type TicketTypeReleasePhaseSummaryQuery = { __typename?: 'Query' } & {
  ticketType: Maybe<
    { __typename?: 'TicketType' } & Pick<TicketType, 'name'> & {
        activeRelease: Maybe<
          { __typename?: 'TicketRelease' } & {
            releasePhase: {
              __typename?: 'TicketReleasePhase';
            } & ReleasePhaseSummaryFragment;
          }
        >;
        release: Maybe<
          { __typename?: 'TicketRelease' } & {
            releasePhase: {
              __typename?: 'TicketReleasePhase';
            } & ReleasePhaseSummaryFragment;
          }
        >;
      }
  >;
};

export type ReleasePhaseSummaryFragment = {
  __typename?: 'TicketReleasePhase';
} & Pick<TicketReleasePhase, 'id' | 'name' | 'status' | 'startsAt'>;

export type TicketTypeReleasePhasesQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type TicketTypeReleasePhasesQuery = { __typename?: 'Query' } & {
  ticketType: Maybe<
    { __typename?: 'TicketType' } & Pick<TicketType, 'id'> & {
        releasePhases: { __typename?: 'TicketReleasePhaseConnection' } & {
          edges: Array<
            { __typename?: 'TicketReleasePhaseEdge' } & {
              node: { __typename?: 'TicketReleasePhase' } & Pick<
                TicketReleasePhase,
                'id' | 'name' | 'active' | 'status' | 'endsAt'
              >;
            }
          >;
        };
      }
  >;
};

export type TimeZonesQueryVariables = Exact<{ [key: string]: never }>;

export type TimeZonesQuery = { __typename?: 'Query' } & {
  timeZones: { __typename?: 'TimeZoneConnection' } & {
    edges: Array<
      { __typename?: 'TimeZoneEdge' } & {
        node: { __typename?: 'TimeZone' } & Pick<
          TimeZone,
          'displayName' | 'ianaName' | 'utcOffset'
        >;
      }
    >;
  };
};

export type WebPageByHostPathQueryVariables = Exact<{
  host: Scalars['String'];
  path: Scalars['String'];
}>;

export type WebPageByHostPathQuery = { __typename?: 'Query' } & {
  webPageByHostPath: Maybe<
    { __typename?: 'WebPage' } & Pick<WebPage, 'id' | 'title'> & {
        seoTags: Maybe<
          { __typename?: 'ComponentWebElementsSeoMetaData' } & Pick<
            ComponentWebElementsSeoMetaData,
            | 'title'
            | 'slug'
            | 'description'
            | 'twitterTitle'
            | 'twitterDescription'
            | 'facebookTitle'
            | 'facebookDescription'
          > & {
              defaultImage: Maybe<
                { __typename?: 'UploadFile' } & Pick<UploadFile, 'id' | 'url'>
              >;
              twitterImage: Maybe<
                { __typename?: 'UploadFile' } & Pick<UploadFile, 'id' | 'url'>
              >;
              facebookImage: Maybe<
                { __typename?: 'UploadFile' } & Pick<UploadFile, 'id' | 'url'>
              >;
            }
        >;
        content: Array<
          | ({
              __typename: 'ComponentWebLayoutsTicketSalesPage';
            } & TicketSalesPageLayoutFragment)
          | ({
              __typename: 'ComponentWebLayoutsTicketApplicationsPage';
            } & TicketApplicationsPageLayoutFragment)
          | ({
              __typename: 'ComponentWebElementsShowcaseGrid';
            } & ShowcaseGridFragment)
          | ({
              __typename: 'ComponentWebElementsScheduleSearchSidebarFilters';
            } & ScheduleSearchSidebarFiltersFragment)
          | ({
              __typename: 'ComponentWebElementsCompanySearchSidebarFilters';
            } & CompanySearchSidebarFiltersFragment)
          | ({
              __typename: 'ComponentWebElementsAttendeeSearchSidebarFilters';
            } & AttendeeSearchSidebarFiltersFragment)
          | ({
              __typename: 'ComponentWebElementsHeroSection';
            } & HeroSectionFragment)
          | { __typename: 'ComponentWebElementsFreshchat' }
          | { __typename: 'ComponentWebLayoutsStoresTicketSalesPage' }
          | { __typename: 'ComponentWebLayoutsStoresTicketApplicationsPage' }
        >;
      }
  >;
};

export type TicketSalesPageLayoutFragment = {
  __typename?: 'ComponentWebLayoutsTicketSalesPage';
} & Pick<ComponentWebLayoutsTicketSalesPage, 'id'> & {
    ticketCategory: Maybe<
      { __typename?: 'TicketCategory' } & Pick<TicketCategory, 'id' | 'name'>
    >;
    ticketReleasesPanel: Maybe<
      {
        __typename?: 'ComponentWebElementsTicketReleasesPanel';
      } & TicketReleasesPanelFragment
    >;
    priceIncreaseCountdownTimer: Maybe<
      { __typename?: 'ComponentWebElementsPriceIncreaseCountdownTimer' } & {
        ticketType: { __typename?: 'TicketType' } & Pick<TicketType, 'id'>;
      }
    >;
    releasePhaseStepper: Maybe<
      { __typename?: 'ComponentWebElementsReleasePhaseStepper' } & {
        ticketType: { __typename?: 'TicketType' } & Pick<TicketType, 'id'>;
      }
    >;
    categoriesMenu: Maybe<{ __typename?: 'Menu' } & TabularMenuFragment>;
    promotions: Array<
      { __typename?: 'ComponentWebElementsTicketPromotion' } & Pick<
        ComponentWebElementsTicketPromotion,
        'id' | 'label' | 'color' | 'type'
      > & { ticketType: { __typename?: 'TicketType' } & Pick<TicketType, 'id'> }
    >;
  };

export type TicketApplicationsPageLayoutFragment = {
  __typename?: 'ComponentWebLayoutsTicketApplicationsPage';
} & Pick<
  ComponentWebLayoutsTicketApplicationsPage,
  'id' | 'title' | 'description'
> & {
    applicationForm: Maybe<{ __typename?: 'Form' } & ApplicationFormFragment>;
    applicationOverviewPanel: Maybe<
      {
        __typename?: 'ComponentWebElementsTicketApplicationOverviewPanel';
      } & ApplicationOverviewPanelFragment
    >;
    ticketInfoPanel: Maybe<
      {
        __typename?: 'ComponentWebElementsTicketTypeInformation';
      } & TicketInfoPanelFragment
    >;
    categoriesMenu: Maybe<{ __typename?: 'Menu' } & TabularMenuFragment>;
    priceIncreaseCountdownTimer: Maybe<
      { __typename?: 'ComponentWebElementsPriceIncreaseCountdownTimer' } & {
        ticketType: { __typename?: 'TicketType' } & Pick<TicketType, 'id'>;
      }
    >;
    releasePhaseStepper: Maybe<
      { __typename?: 'ComponentWebElementsReleasePhaseStepper' } & {
        ticketType: { __typename?: 'TicketType' } & Pick<TicketType, 'id'>;
      }
    >;
  };

export type TicketInfoPanelFragment = {
  __typename?: 'ComponentWebElementsTicketTypeInformation';
} & Pick<
  ComponentWebElementsTicketTypeInformation,
  'heading' | 'showBenefits' | 'displayPriceIncludingTax'
> & { ticketType: { __typename?: 'TicketType' } & TicketTypeFragment };

export type TicketReleasesPanelFragment = {
  __typename?: 'ComponentWebElementsTicketReleasesPanel';
} & Pick<ComponentWebElementsTicketReleasesPanel, 'displayPriceIncludingTax'>;

export type TicketTypeFragment = { __typename?: 'TicketType' } & Pick<
  TicketType,
  'id' | 'name'
>;

export type TabularMenuFragment = { __typename?: 'Menu' } & {
  menuItems: Array<
    { __typename?: 'MenuItem' } & Pick<MenuItem, 'label'> & {
        link:
          | ({ __typename: 'ComponentWebLinksPageLink' } & PageLinkFragment)
          | ({ __typename: 'ComponentWebLinksUrlLink' } & UrlLinkFragment)
          | { __typename: 'ComponentWebLinksSubMenu' };
      }
  >;
};

export type UrlLinkFragment = {
  __typename?: 'ComponentWebLinksUrlLink';
} & Pick<ComponentWebLinksUrlLink, 'target' | 'url'>;

export type PageLinkFragment = { __typename?: 'ComponentWebLinksPageLink' } & {
  page: Maybe<{ __typename?: 'WebPage' } & Pick<WebPage, 'path'>>;
};

export type ApplicationFormFragment = { __typename?: 'Form' } & Pick<
  Form,
  'id' | 'contentBefore'
> & {
    dynamicForm: { __typename?: 'DynamicForm' } & Pick<
      DynamicForm,
      'id' | 'schema' | 'uiSchema' | 'data' | 'mutation'
    >;
  };

export type ApplicationOverviewPanelFragment = {
  __typename?: 'ComponentWebElementsTicketApplicationOverviewPanel';
} & Pick<
  ComponentWebElementsTicketApplicationOverviewPanel,
  'id' | 'title' | 'description' | 'imageUrl' | 'altImageText'
>;

export type ShowcaseGridFragment = {
  __typename?: 'ComponentWebElementsShowcaseGrid';
} & Pick<
  ComponentWebElementsShowcaseGrid,
  'id' | 'contentBefore' | 'backgroundColor'
> & {
    collection: { __typename?: 'ContentCollection' } & {
      elements: Array<
        { __typename?: 'ContentElement' } & Pick<
          ContentElement,
          'id' | 'title'
        > & {
            image: Maybe<
              { __typename?: 'UploadFile' } & Pick<UploadFile, 'absoluteUrl'>
            >;
          }
      >;
    };
  };

export type ScheduleSearchSidebarFiltersFragment = {
  __typename?: 'ComponentWebElementsScheduleSearchSidebarFilters';
} & Pick<
  ComponentWebElementsScheduleSearchSidebarFilters,
  'id' | 'apiKey' | 'indexName'
> & {
    refinements: Array<
      { __typename?: 'ComponentSearchAlgoliaRefinement' } & Pick<
        ComponentSearchAlgoliaRefinement,
        'attribute' | 'defaults' | 'variant' | 'title' | 'refinementItemsLimit'
      >
    >;
  };

export type AttendeeSearchSidebarFiltersFragment = {
  __typename?: 'ComponentWebElementsAttendeeSearchSidebarFilters';
} & Pick<
  ComponentWebElementsAttendeeSearchSidebarFilters,
  'id' | 'apiKey' | 'indexName'
> & {
    refinements: Array<
      { __typename?: 'ComponentSearchAlgoliaRefinement' } & Pick<
        ComponentSearchAlgoliaRefinement,
        'attribute' | 'defaults' | 'variant' | 'title' | 'refinementItemsLimit'
      >
    >;
  };

export type CompanySearchSidebarFiltersFragment = {
  __typename?: 'ComponentWebElementsCompanySearchSidebarFilters';
} & Pick<
  ComponentWebElementsCompanySearchSidebarFilters,
  'id' | 'apiKey' | 'indexName'
> & {
    refinements: Array<
      { __typename?: 'ComponentSearchAlgoliaRefinement' } & Pick<
        ComponentSearchAlgoliaRefinement,
        'attribute' | 'defaults' | 'variant' | 'title' | 'refinementItemsLimit'
      >
    >;
  };

export type HeroSectionFragment = {
  __typename?: 'ComponentWebElementsHeroSection';
} & Pick<
  ComponentWebElementsHeroSection,
  | 'id'
  | 'variant'
  | 'backgroundImageAlt'
  | 'backgroundImageDescription'
  | 'subtitle'
  | 'title'
> & {
    backgroundImage: Maybe<
      { __typename?: 'UploadFile' } & { url: UploadFile['absoluteUrl'] }
    >;
    ctaLink: Maybe<
      { __typename?: 'ComponentWebElementsCtaLink' } & Pick<
        ComponentWebElementsCtaLink,
        'text' | 'url'
      >
    >;
    brandImage: Maybe<
      { __typename?: 'UploadFile' } & { url: UploadFile['absoluteUrl'] }
    >;
  };

export type WebPageByPathQueryVariables = Exact<{
  path: Scalars['String'];
}>;

export type WebPageByPathQuery = { __typename?: 'Query' } & {
  webPageByPath: Maybe<
    { __typename?: 'WebPage' } & Pick<WebPage, 'id' | 'title'> & {
        seoTags: Maybe<
          { __typename?: 'ComponentWebElementsSeoMetaData' } & Pick<
            ComponentWebElementsSeoMetaData,
            | 'title'
            | 'slug'
            | 'description'
            | 'twitterTitle'
            | 'twitterDescription'
            | 'facebookTitle'
            | 'facebookDescription'
          > & {
              defaultImage: Maybe<
                { __typename?: 'UploadFile' } & Pick<UploadFile, 'id' | 'url'>
              >;
              twitterImage: Maybe<
                { __typename?: 'UploadFile' } & Pick<UploadFile, 'id' | 'url'>
              >;
              facebookImage: Maybe<
                { __typename?: 'UploadFile' } & Pick<UploadFile, 'id' | 'url'>
              >;
            }
        >;
        content: Array<
          | ({
              __typename: 'ComponentWebLayoutsTicketSalesPage';
            } & TicketSalesPageLayoutFragment)
          | ({
              __typename: 'ComponentWebLayoutsTicketApplicationsPage';
            } & TicketApplicationsPageLayoutFragment)
          | ({
              __typename: 'ComponentWebElementsShowcaseGrid';
            } & ShowcaseGridFragment)
          | ({
              __typename: 'ComponentWebElementsScheduleSearchSidebarFilters';
            } & ScheduleSearchSidebarFiltersFragment)
          | ({
              __typename: 'ComponentWebElementsCompanySearchSidebarFilters';
            } & CompanySearchSidebarFiltersFragment)
          | ({
              __typename: 'ComponentWebElementsAttendeeSearchSidebarFilters';
            } & AttendeeSearchSidebarFiltersFragment)
          | ({
              __typename: 'ComponentWebElementsHeroSection';
            } & HeroSectionFragment)
          | { __typename: 'ComponentWebElementsFreshchat' }
          | { __typename: 'ComponentWebLayoutsStoresTicketSalesPage' }
          | { __typename: 'ComponentWebLayoutsStoresTicketApplicationsPage' }
        >;
      }
  >;
};

export type WebPageConfigByPathHostQueryVariables = Exact<{
  path: Scalars['String'];
  host: Scalars['String'];
}>;

export type WebPageConfigByPathHostQuery = { __typename?: 'Query' } & {
  webPageConfigByPathHost: Maybe<
    { __typename?: 'WebPageConfig' } & {
      site: Maybe<{ __typename?: 'Site' } & Pick<Site, 'title'>>;
      config: Maybe<
        { __typename?: 'WebPageConfig' } & Pick<
          WebPageConfig,
          | 'baseGoogleAnalyticsTrackingId'
          | 'googleAnalyticsTrackingId'
          | 'googleTagManagerId'
        > & {
            googleAnalyticsLinkerDomains: Array<
              {
                __typename?: 'ComponentSiteConfigGoogleAnalyticsLinkerDomainList';
              } & Pick<
                ComponentSiteConfigGoogleAnalyticsLinkerDomainList,
                'domain'
              >
            >;
            metaData: Maybe<
              { __typename?: 'ComponentSiteConfigMetaData' } & Pick<
                ComponentSiteConfigMetaData,
                | 'siteTitle'
                | 'siteDescription'
                | 'facebookId'
                | 'facebookPublisher'
                | 'twitterId'
                | 'twitterCreator'
              > & {
                  image: Maybe<
                    { __typename?: 'UploadFile' } & {
                      url: UploadFile['absoluteUrl'];
                    }
                  >;
                }
            >;
          }
      >;
      branding: Maybe<
        { __typename?: 'Branding' } & Pick<
          Branding,
          'googleFontsUrl' | 'theme'
        > & {
            logo: Maybe<
              { __typename?: 'UploadFile' } & Pick<
                UploadFile,
                'id' | 'absoluteUrl' | 'alternativeText'
              >
            >;
            headerBranding: Maybe<
              { __typename?: 'UploadFile' } & Pick<
                UploadFile,
                'id' | 'absoluteUrl' | 'alternativeText'
              >
            >;
            favicon: Maybe<
              { __typename?: 'UploadFile' } & Pick<
                UploadFile,
                'id' | 'absoluteUrl'
              >
            >;
            ticketLogo: Maybe<
              { __typename?: 'UploadFile' } & Pick<
                UploadFile,
                'id' | 'absoluteUrl' | 'alternativeText'
              >
            >;
          }
      >;
    }
  >;
};

export type DynamicFormPayloadFragment = { __typename?: 'DynamicForm' } & Pick<
  DynamicForm,
  'id' | 'data' | 'schema' | 'mutation' | 'uiSchema'
>;

export const CommerceUserFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
  ],
  kind: 'Document',
};
export const CommerceProductFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceProduct' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'active' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxMode' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceProduct' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
  ],
  kind: 'Document',
};
export const CommerceTaxTypeFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTaxType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTaxType' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
  ],
  kind: 'Document',
};
export const CommerceTaxFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTax' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rateAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rateType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceTaxType' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTax' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTaxType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTaxType' },
      },
    },
  ],
  kind: 'Document',
};
export const CommerceOrderItemFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceOrderItem' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceProduct' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'productMetadata' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceTax' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceOrderItem' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTaxType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTaxType' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTax' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rateAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rateType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceTaxType' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTax' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceProduct' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'active' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxMode' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceProduct' },
      },
    },
  ],
  kind: 'Document',
};
export const CommerceAddressFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceAddress' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'line1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'line2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceAddress' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
  ],
  kind: 'Document',
};
export const CommerceCustomerFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceCustomer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'address' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceAddress' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'vatNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'vatVerified' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceCustomer' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceAddress' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'line1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'line2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceAddress' },
      },
    },
  ],
  kind: 'Document',
};
export const CommercePaymentMethodFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommercePaymentMethod' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommercePaymentMethod' },
      },
    },
  ],
  kind: 'Document',
};
export const CommerceTransactionFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTransaction' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommercePaymentMethod' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refundedTransaction' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTransaction' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommercePaymentMethod' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommercePaymentMethod' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
  ],
  kind: 'Document',
};
export const TicketsSummaryFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketsSummary' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'all' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'active' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assigned' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'accepted' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'checkedIn' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'duplicate' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'locked' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pending' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unassigned' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'neverAssigned' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rejected' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'void' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketsSummary' },
      },
    },
  ],
  kind: 'Document',
};
export const DisplayMoneyFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayMoney' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeUnit' },
                value: { kind: 'BooleanValue', value: false },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'precision' },
                value: { kind: 'IntValue', value: '0' },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'format' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currency' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Money' },
      },
    },
  ],
  kind: 'Document',
};
export const DisplayPriceFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayPrice' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'exTax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalTax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'total' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxLines' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayMoney' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeUnit' },
                value: { kind: 'BooleanValue', value: false },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'precision' },
                value: { kind: 'IntValue', value: '0' },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'format' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currency' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Money' },
      },
    },
  ],
  kind: 'Document',
};
export const DisplayReleaseFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayRelease' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'active' } },
          { kind: 'Field', name: { kind: 'Name', value: 'soldOut' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'action' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsTitoCheckoutAction',
                    },
                  },
                },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emailAddress' },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsPriceEnquiryAction',
                    },
                  },
                },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'suggestedRelease' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsExpiredTicketAction',
                    },
                  },
                },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dynamicForm' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'schema' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'uiSchema' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mutation' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'data' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsPriceAlertAction',
                    },
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayPrice' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accessPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'detail' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'source' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TitoTicketRelease' },
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketRelease' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayPrice' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'exTax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalTax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'total' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxLines' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayMoney' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeUnit' },
                value: { kind: 'BooleanValue', value: false },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'precision' },
                value: { kind: 'IntValue', value: '0' },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'format' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currency' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Money' },
      },
    },
  ],
  kind: 'Document',
};
export const ReleasePhaseSummaryFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ReleasePhaseSummary' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketReleasePhase' },
      },
    },
  ],
  kind: 'Document',
};
export const TicketReleasesPanelFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketReleasesPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketReleasesPanel',
        },
      },
    },
  ],
  kind: 'Document',
};
export const UrlLinkFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UrlLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksUrlLink' },
      },
    },
  ],
  kind: 'Document',
};
export const PageLinkFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'page' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksPageLink' },
      },
    },
  ],
  kind: 'Document',
};
export const TabularMenuFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TabularMenu' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'menuItems' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'link' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'UrlLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksUrlLink',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'PageLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksPageLink',
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Menu' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UrlLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksUrlLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'page' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksPageLink' },
      },
    },
  ],
  kind: 'Document',
};
export const TicketSalesPageLayoutFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketSalesPageLayout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketCategory' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketReleasesPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketReleasesPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'priceIncreaseCountdownTimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'releasePhaseStepper' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesMenu' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TabularMenu' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLayoutsTicketSalesPage' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketReleasesPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketReleasesPanel',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TabularMenu' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'menuItems' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'link' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'UrlLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksUrlLink',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'PageLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksPageLink',
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Menu' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UrlLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksUrlLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'page' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksPageLink' },
      },
    },
  ],
  kind: 'Document',
};
export const ApplicationFormFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationForm' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dynamicForm' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'schema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uiSchema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mutation' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'contentBefore' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Form' },
      },
    },
  ],
  kind: 'Document',
};
export const ApplicationOverviewPanelFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationOverviewPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'altImageText' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketApplicationOverviewPanel',
        },
      },
    },
  ],
  kind: 'Document',
};
export const TicketTypeFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketType' },
      },
    },
  ],
  kind: 'Document',
};
export const TicketInfoPanelFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketInfoPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketType' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'heading' } },
          { kind: 'Field', name: { kind: 'Name', value: 'showBenefits' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketTypeInformation',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketType' },
      },
    },
  ],
  kind: 'Document',
};
export const TicketApplicationsPageLayoutFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketApplicationsPageLayout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationForm' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ApplicationForm' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationOverviewPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ApplicationOverviewPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketInfoPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketInfoPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesMenu' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TabularMenu' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'priceIncreaseCountdownTimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'releasePhaseStepper' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebLayoutsTicketApplicationsPage',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketInfoPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketType' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'heading' } },
          { kind: 'Field', name: { kind: 'Name', value: 'showBenefits' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketTypeInformation',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketType' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TabularMenu' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'menuItems' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'link' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'UrlLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksUrlLink',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'PageLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksPageLink',
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Menu' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UrlLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksUrlLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'page' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksPageLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationForm' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dynamicForm' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'schema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uiSchema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mutation' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'contentBefore' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Form' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationOverviewPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'altImageText' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketApplicationOverviewPanel',
        },
      },
    },
  ],
  kind: 'Document',
};
export const ShowcaseGridFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShowcaseGrid' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentBefore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'backgroundColor' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'elements' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebElementsShowcaseGrid' },
      },
    },
  ],
  kind: 'Document',
};
export const ScheduleSearchSidebarFiltersFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleSearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsScheduleSearchSidebarFilters',
        },
      },
    },
  ],
  kind: 'Document',
};
export const AttendeeSearchSidebarFiltersFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AttendeeSearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsAttendeeSearchSidebarFilters',
        },
      },
    },
  ],
  kind: 'Document',
};
export const CompanySearchSidebarFiltersFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanySearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsCompanySearchSidebarFilters',
        },
      },
    },
  ],
  kind: 'Document',
};
export const HeroSectionFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HeroSection' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  alias: { kind: 'Name', value: 'url' },
                  kind: 'Field',
                  name: { kind: 'Name', value: 'absoluteUrl' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ctaLink' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImageAlt' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImageDescription' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'brandImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  alias: { kind: 'Name', value: 'url' },
                  kind: 'Field',
                  name: { kind: 'Name', value: 'absoluteUrl' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebElementsHeroSection' },
      },
    },
  ],
  kind: 'Document',
};
export const DynamicFormPayloadFragmentDoc: DocumentNode = {
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DynamicFormPayload' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'data' } },
          { kind: 'Field', name: { kind: 'Name', value: 'schema' } },
          { kind: 'Field', name: { kind: 'Name', value: 'mutation' } },
          { kind: 'Field', name: { kind: 'Name', value: 'uiSchema' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'DynamicForm' },
      },
    },
  ],
  kind: 'Document',
};
export const AssignmentAuthenticateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'AssignmentAuthenticate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'assignmentAuthenticate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'accessToken' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'conferenceSlug' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AssignmentAuthenticateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type AssignmentAuthenticateMutationFn = Apollo.MutationFunction<
  AssignmentAuthenticateMutation,
  AssignmentAuthenticateMutationVariables
>;

/**
 * __useAssignmentAuthenticateMutation__
 *
 * To run a mutation, you first call `useAssignmentAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignmentAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignmentAuthenticateMutation, { data, loading, error }] = useAssignmentAuthenticateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAssignmentAuthenticateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AssignmentAuthenticateMutation,
    AssignmentAuthenticateMutationVariables
  >,
) {
  return Apollo.useMutation<
    AssignmentAuthenticateMutation,
    AssignmentAuthenticateMutationVariables
  >(AssignmentAuthenticateDocument, baseOptions);
}
export type AssignmentAuthenticateMutationHookResult = ReturnType<
  typeof useAssignmentAuthenticateMutation
>;
export type AssignmentAuthenticateMutationResult = Apollo.MutationResult<AssignmentAuthenticateMutation>;
export type AssignmentAuthenticateMutationOptions = Apollo.BaseMutationOptions<
  AssignmentAuthenticateMutation,
  AssignmentAuthenticateMutationVariables
>;
export const ProfileAdminUpdateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'profileAdminUpdate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'profile' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'assignmentProfileAdminUpdate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'successMessage' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profile' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'jobTitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'companyName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'companySizeId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'industryId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'phoneNumber' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'passportNumber' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'AssignmentProfileAdminUpdateInput',
              },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'profile' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type ProfileAdminUpdateMutationFn = Apollo.MutationFunction<
  ProfileAdminUpdateMutation,
  ProfileAdminUpdateMutationVariables
>;

/**
 * __useProfileAdminUpdateMutation__
 *
 * To run a mutation, you first call `useProfileAdminUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileAdminUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileAdminUpdateMutation, { data, loading, error }] = useProfileAdminUpdateMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useProfileAdminUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ProfileAdminUpdateMutation,
    ProfileAdminUpdateMutationVariables
  >,
) {
  return Apollo.useMutation<
    ProfileAdminUpdateMutation,
    ProfileAdminUpdateMutationVariables
  >(ProfileAdminUpdateDocument, baseOptions);
}
export type ProfileAdminUpdateMutationHookResult = ReturnType<
  typeof useProfileAdminUpdateMutation
>;
export type ProfileAdminUpdateMutationResult = Apollo.MutationResult<ProfileAdminUpdateMutation>;
export type ProfileAdminUpdateMutationOptions = Apollo.BaseMutationOptions<
  ProfileAdminUpdateMutation,
  ProfileAdminUpdateMutationVariables
>;
export const ProfileUpdateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'profileUpdate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'profile' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'assignmentProfileUpdate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'successMessage' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'assignee' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'jobTitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'companyName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'companySizeId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'industryId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'phoneNumber' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'marketingConsent' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'personalisationConsent' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'passportNumber' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'AssignmentProfileUpdateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'profile' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type ProfileUpdateMutationFn = Apollo.MutationFunction<
  ProfileUpdateMutation,
  ProfileUpdateMutationVariables
>;

/**
 * __useProfileUpdateMutation__
 *
 * To run a mutation, you first call `useProfileUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileUpdateMutation, { data, loading, error }] = useProfileUpdateMutation({
 *   variables: {
 *      profile: // value for 'profile'
 *   },
 * });
 */
export function useProfileUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ProfileUpdateMutation,
    ProfileUpdateMutationVariables
  >,
) {
  return Apollo.useMutation<
    ProfileUpdateMutation,
    ProfileUpdateMutationVariables
  >(ProfileUpdateDocument, baseOptions);
}
export type ProfileUpdateMutationHookResult = ReturnType<
  typeof useProfileUpdateMutation
>;
export type ProfileUpdateMutationResult = Apollo.MutationResult<ProfileUpdateMutation>;
export type ProfileUpdateMutationOptions = Apollo.BaseMutationOptions<
  ProfileUpdateMutation,
  ProfileUpdateMutationVariables
>;
export const CommerceCreateDealDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceCreateDeal' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceDealCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceDealCreate' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateDeal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceDealCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceDealCreate' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceCreateDealMutationFn = Apollo.MutationFunction<
  CommerceCreateDealMutation,
  CommerceCreateDealMutationVariables
>;

/**
 * __useCommerceCreateDealMutation__
 *
 * To run a mutation, you first call `useCommerceCreateDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreateDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreateDealMutation, { data, loading, error }] = useCommerceCreateDealMutation({
 *   variables: {
 *      commerceDealCreate: // value for 'commerceDealCreate'
 *   },
 * });
 */
export function useCommerceCreateDealMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreateDealMutation,
    CommerceCreateDealMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreateDealMutation,
    CommerceCreateDealMutationVariables
  >(CommerceCreateDealDocument, baseOptions);
}
export type CommerceCreateDealMutationHookResult = ReturnType<
  typeof useCommerceCreateDealMutation
>;
export type CommerceCreateDealMutationResult = Apollo.MutationResult<CommerceCreateDealMutation>;
export type CommerceCreateDealMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreateDealMutation,
  CommerceCreateDealMutationVariables
>;
export const CommerceCreateDealItemDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceCreateDealItem' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceDealItemCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceDealItemCreate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dealId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dealId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateDealItem' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceDealItemCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceDealItemCreate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dealId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceCreateDealItemMutationFn = Apollo.MutationFunction<
  CommerceCreateDealItemMutation,
  CommerceCreateDealItemMutationVariables
>;

/**
 * __useCommerceCreateDealItemMutation__
 *
 * To run a mutation, you first call `useCommerceCreateDealItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreateDealItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreateDealItemMutation, { data, loading, error }] = useCommerceCreateDealItemMutation({
 *   variables: {
 *      commerceDealItemCreate: // value for 'commerceDealItemCreate'
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useCommerceCreateDealItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreateDealItemMutation,
    CommerceCreateDealItemMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreateDealItemMutation,
    CommerceCreateDealItemMutationVariables
  >(CommerceCreateDealItemDocument, baseOptions);
}
export type CommerceCreateDealItemMutationHookResult = ReturnType<
  typeof useCommerceCreateDealItemMutation
>;
export type CommerceCreateDealItemMutationResult = Apollo.MutationResult<CommerceCreateDealItemMutation>;
export type CommerceCreateDealItemMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreateDealItemMutation,
  CommerceCreateDealItemMutationVariables
>;
export const CommerceCreateSaleDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceCreateSale' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceSaleCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceSale' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateSale' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceSaleCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceSale' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceCreateSaleMutationFn = Apollo.MutationFunction<
  CommerceCreateSaleMutation,
  CommerceCreateSaleMutationVariables
>;

/**
 * __useCommerceCreateSaleMutation__
 *
 * To run a mutation, you first call `useCommerceCreateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreateSaleMutation, { data, loading, error }] = useCommerceCreateSaleMutation({
 *   variables: {
 *      commerceSale: // value for 'commerceSale'
 *   },
 * });
 */
export function useCommerceCreateSaleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreateSaleMutation,
    CommerceCreateSaleMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreateSaleMutation,
    CommerceCreateSaleMutationVariables
  >(CommerceCreateSaleDocument, baseOptions);
}
export type CommerceCreateSaleMutationHookResult = ReturnType<
  typeof useCommerceCreateSaleMutation
>;
export type CommerceCreateSaleMutationResult = Apollo.MutationResult<CommerceCreateSaleMutation>;
export type CommerceCreateSaleMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreateSaleMutation,
  CommerceCreateSaleMutationVariables
>;
export const CommerceDeleteDealItemDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceDeleteDealItem' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dealId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dealId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceDeleteDealItem' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dealId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceDeleteDealItemMutationFn = Apollo.MutationFunction<
  CommerceDeleteDealItemMutation,
  CommerceDeleteDealItemMutationVariables
>;

/**
 * __useCommerceDeleteDealItemMutation__
 *
 * To run a mutation, you first call `useCommerceDeleteDealItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceDeleteDealItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceDeleteDealItemMutation, { data, loading, error }] = useCommerceDeleteDealItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useCommerceDeleteDealItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceDeleteDealItemMutation,
    CommerceDeleteDealItemMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceDeleteDealItemMutation,
    CommerceDeleteDealItemMutationVariables
  >(CommerceDeleteDealItemDocument, baseOptions);
}
export type CommerceDeleteDealItemMutationHookResult = ReturnType<
  typeof useCommerceDeleteDealItemMutation
>;
export type CommerceDeleteDealItemMutationResult = Apollo.MutationResult<CommerceDeleteDealItemMutation>;
export type CommerceDeleteDealItemMutationOptions = Apollo.BaseMutationOptions<
  CommerceDeleteDealItemMutation,
  CommerceDeleteDealItemMutationVariables
>;
export const CommerceUpdateDealDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceUpdateDeal' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceDealUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceDealUpdate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateDeal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceDealUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceDealUpdate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateDealMutationFn = Apollo.MutationFunction<
  CommerceUpdateDealMutation,
  CommerceUpdateDealMutationVariables
>;

/**
 * __useCommerceUpdateDealMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateDealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateDealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateDealMutation, { data, loading, error }] = useCommerceUpdateDealMutation({
 *   variables: {
 *      commerceDealUpdate: // value for 'commerceDealUpdate'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommerceUpdateDealMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateDealMutation,
    CommerceUpdateDealMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateDealMutation,
    CommerceUpdateDealMutationVariables
  >(CommerceUpdateDealDocument, baseOptions);
}
export type CommerceUpdateDealMutationHookResult = ReturnType<
  typeof useCommerceUpdateDealMutation
>;
export type CommerceUpdateDealMutationResult = Apollo.MutationResult<CommerceUpdateDealMutation>;
export type CommerceUpdateDealMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateDealMutation,
  CommerceUpdateDealMutationVariables
>;
export const CommerceUpdateDealItemDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceUpdateDealItem' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceDealItemUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceDealItemUpdate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dealId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dealId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateDealItem' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceDealItemUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceDealItemUpdate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dealId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateDealItemMutationFn = Apollo.MutationFunction<
  CommerceUpdateDealItemMutation,
  CommerceUpdateDealItemMutationVariables
>;

/**
 * __useCommerceUpdateDealItemMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateDealItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateDealItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateDealItemMutation, { data, loading, error }] = useCommerceUpdateDealItemMutation({
 *   variables: {
 *      commerceDealItemUpdate: // value for 'commerceDealItemUpdate'
 *      id: // value for 'id'
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useCommerceUpdateDealItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateDealItemMutation,
    CommerceUpdateDealItemMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateDealItemMutation,
    CommerceUpdateDealItemMutationVariables
  >(CommerceUpdateDealItemDocument, baseOptions);
}
export type CommerceUpdateDealItemMutationHookResult = ReturnType<
  typeof useCommerceUpdateDealItemMutation
>;
export type CommerceUpdateDealItemMutationResult = Apollo.MutationResult<CommerceUpdateDealItemMutation>;
export type CommerceUpdateDealItemMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateDealItemMutation,
  CommerceUpdateDealItemMutationVariables
>;
export const CommerceUpdateSaleDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceUpdateSale' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceSaleUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceSale' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateSale' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceSaleUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceSale' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateSaleMutationFn = Apollo.MutationFunction<
  CommerceUpdateSaleMutation,
  CommerceUpdateSaleMutationVariables
>;

/**
 * __useCommerceUpdateSaleMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateSaleMutation, { data, loading, error }] = useCommerceUpdateSaleMutation({
 *   variables: {
 *      commerceSale: // value for 'commerceSale'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommerceUpdateSaleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateSaleMutation,
    CommerceUpdateSaleMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateSaleMutation,
    CommerceUpdateSaleMutationVariables
  >(CommerceUpdateSaleDocument, baseOptions);
}
export type CommerceUpdateSaleMutationHookResult = ReturnType<
  typeof useCommerceUpdateSaleMutation
>;
export type CommerceUpdateSaleMutationResult = Apollo.MutationResult<CommerceUpdateSaleMutation>;
export type CommerceUpdateSaleMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateSaleMutation,
  CommerceUpdateSaleMutationVariables
>;
export const CommerceCreateCategoryDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'commerceCreateCategory' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceCategoryCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateCategory' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceCategoryCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceCreateCategoryMutationFn = Apollo.MutationFunction<
  CommerceCreateCategoryMutation,
  CommerceCreateCategoryMutationVariables
>;

/**
 * __useCommerceCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCommerceCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreateCategoryMutation, { data, loading, error }] = useCommerceCreateCategoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommerceCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreateCategoryMutation,
    CommerceCreateCategoryMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreateCategoryMutation,
    CommerceCreateCategoryMutationVariables
  >(CommerceCreateCategoryDocument, baseOptions);
}
export type CommerceCreateCategoryMutationHookResult = ReturnType<
  typeof useCommerceCreateCategoryMutation
>;
export type CommerceCreateCategoryMutationResult = Apollo.MutationResult<CommerceCreateCategoryMutation>;
export type CommerceCreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreateCategoryMutation,
  CommerceCreateCategoryMutationVariables
>;
export const CommerceCreateOrderDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceCreateOrder' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceOrderCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceOrderCreate' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateOrder' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'billed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedAt' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommercePaymentMethod' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceOrderCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceOrderCreate' },
          },
        },
      ],
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommercePaymentMethod' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommercePaymentMethod' },
      },
    },
  ],
  kind: 'Document',
};
export type CommerceCreateOrderMutationFn = Apollo.MutationFunction<
  CommerceCreateOrderMutation,
  CommerceCreateOrderMutationVariables
>;

/**
 * __useCommerceCreateOrderMutation__
 *
 * To run a mutation, you first call `useCommerceCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreateOrderMutation, { data, loading, error }] = useCommerceCreateOrderMutation({
 *   variables: {
 *      commerceOrderCreate: // value for 'commerceOrderCreate'
 *   },
 * });
 */
export function useCommerceCreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreateOrderMutation,
    CommerceCreateOrderMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreateOrderMutation,
    CommerceCreateOrderMutationVariables
  >(CommerceCreateOrderDocument, baseOptions);
}
export type CommerceCreateOrderMutationHookResult = ReturnType<
  typeof useCommerceCreateOrderMutation
>;
export type CommerceCreateOrderMutationResult = Apollo.MutationResult<CommerceCreateOrderMutation>;
export type CommerceCreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreateOrderMutation,
  CommerceCreateOrderMutationVariables
>;
export const CommerceCreateProductDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'commerceCreateProduct' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceProductCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateProduct' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceProductCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceCreateProductMutationFn = Apollo.MutationFunction<
  CommerceCreateProductMutation,
  CommerceCreateProductMutationVariables
>;

/**
 * __useCommerceCreateProductMutation__
 *
 * To run a mutation, you first call `useCommerceCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreateProductMutation, { data, loading, error }] = useCommerceCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommerceCreateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreateProductMutation,
    CommerceCreateProductMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreateProductMutation,
    CommerceCreateProductMutationVariables
  >(CommerceCreateProductDocument, baseOptions);
}
export type CommerceCreateProductMutationHookResult = ReturnType<
  typeof useCommerceCreateProductMutation
>;
export type CommerceCreateProductMutationResult = Apollo.MutationResult<CommerceCreateProductMutation>;
export type CommerceCreateProductMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreateProductMutation,
  CommerceCreateProductMutationVariables
>;
export const CommerceSaleProductCreateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceSaleProductCreate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceSaleProductCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceSaleProductCreate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'saleId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'saleId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateSaleProduct' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceSaleProductCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceSaleProductCreate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'saleId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceSaleProductCreateMutationFn = Apollo.MutationFunction<
  CommerceSaleProductCreateMutation,
  CommerceSaleProductCreateMutationVariables
>;

/**
 * __useCommerceSaleProductCreateMutation__
 *
 * To run a mutation, you first call `useCommerceSaleProductCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceSaleProductCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceSaleProductCreateMutation, { data, loading, error }] = useCommerceSaleProductCreateMutation({
 *   variables: {
 *      commerceSaleProductCreate: // value for 'commerceSaleProductCreate'
 *      saleId: // value for 'saleId'
 *   },
 * });
 */
export function useCommerceSaleProductCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceSaleProductCreateMutation,
    CommerceSaleProductCreateMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceSaleProductCreateMutation,
    CommerceSaleProductCreateMutationVariables
  >(CommerceSaleProductCreateDocument, baseOptions);
}
export type CommerceSaleProductCreateMutationHookResult = ReturnType<
  typeof useCommerceSaleProductCreateMutation
>;
export type CommerceSaleProductCreateMutationResult = Apollo.MutationResult<CommerceSaleProductCreateMutation>;
export type CommerceSaleProductCreateMutationOptions = Apollo.BaseMutationOptions<
  CommerceSaleProductCreateMutation,
  CommerceSaleProductCreateMutationVariables
>;
export const CommerceCreateTransactionDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceCreateTransaction' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceTransactionCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceTransactionCreate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateTransaction' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceTransactionCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceTransactionCreate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceCreateTransactionMutationFn = Apollo.MutationFunction<
  CommerceCreateTransactionMutation,
  CommerceCreateTransactionMutationVariables
>;

/**
 * __useCommerceCreateTransactionMutation__
 *
 * To run a mutation, you first call `useCommerceCreateTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreateTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreateTransactionMutation, { data, loading, error }] = useCommerceCreateTransactionMutation({
 *   variables: {
 *      commerceTransactionCreate: // value for 'commerceTransactionCreate'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useCommerceCreateTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreateTransactionMutation,
    CommerceCreateTransactionMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreateTransactionMutation,
    CommerceCreateTransactionMutationVariables
  >(CommerceCreateTransactionDocument, baseOptions);
}
export type CommerceCreateTransactionMutationHookResult = ReturnType<
  typeof useCommerceCreateTransactionMutation
>;
export type CommerceCreateTransactionMutationResult = Apollo.MutationResult<CommerceCreateTransactionMutation>;
export type CommerceCreateTransactionMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreateTransactionMutation,
  CommerceCreateTransactionMutationVariables
>;
export const CommerceCreatePaymentMethodDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceCreatePaymentMethod' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commercePaymentMethodCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentMethod' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreatePaymentMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'gateway' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommercePaymentMethodCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'paymentMethod' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceCreatePaymentMethodMutationFn = Apollo.MutationFunction<
  CommerceCreatePaymentMethodMutation,
  CommerceCreatePaymentMethodMutationVariables
>;

/**
 * __useCommerceCreatePaymentMethodMutation__
 *
 * To run a mutation, you first call `useCommerceCreatePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceCreatePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceCreatePaymentMethodMutation, { data, loading, error }] = useCommerceCreatePaymentMethodMutation({
 *   variables: {
 *      paymentMethod: // value for 'paymentMethod'
 *   },
 * });
 */
export function useCommerceCreatePaymentMethodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceCreatePaymentMethodMutation,
    CommerceCreatePaymentMethodMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceCreatePaymentMethodMutation,
    CommerceCreatePaymentMethodMutationVariables
  >(CommerceCreatePaymentMethodDocument, baseOptions);
}
export type CommerceCreatePaymentMethodMutationHookResult = ReturnType<
  typeof useCommerceCreatePaymentMethodMutation
>;
export type CommerceCreatePaymentMethodMutationResult = Apollo.MutationResult<CommerceCreatePaymentMethodMutation>;
export type CommerceCreatePaymentMethodMutationOptions = Apollo.BaseMutationOptions<
  CommerceCreatePaymentMethodMutation,
  CommerceCreatePaymentMethodMutationVariables
>;
export const CommerceUpdatePaymentMethodDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceUpdatePaymentMethod' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commercePaymentMethodUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'paymentMethod' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdatePaymentMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'gateway' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommercePaymentMethodUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'paymentMethod' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdatePaymentMethodMutationFn = Apollo.MutationFunction<
  CommerceUpdatePaymentMethodMutation,
  CommerceUpdatePaymentMethodMutationVariables
>;

/**
 * __useCommerceUpdatePaymentMethodMutation__
 *
 * To run a mutation, you first call `useCommerceUpdatePaymentMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdatePaymentMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdatePaymentMethodMutation, { data, loading, error }] = useCommerceUpdatePaymentMethodMutation({
 *   variables: {
 *      paymentMethod: // value for 'paymentMethod'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommerceUpdatePaymentMethodMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdatePaymentMethodMutation,
    CommerceUpdatePaymentMethodMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdatePaymentMethodMutation,
    CommerceUpdatePaymentMethodMutationVariables
  >(CommerceUpdatePaymentMethodDocument, baseOptions);
}
export type CommerceUpdatePaymentMethodMutationHookResult = ReturnType<
  typeof useCommerceUpdatePaymentMethodMutation
>;
export type CommerceUpdatePaymentMethodMutationResult = Apollo.MutationResult<CommerceUpdatePaymentMethodMutation>;
export type CommerceUpdatePaymentMethodMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdatePaymentMethodMutation,
  CommerceUpdatePaymentMethodMutationVariables
>;
export const CommerceUpdateCategoryDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'commerceUpdateCategory' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceCategoryUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateCategory' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceCategoryUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateCategoryMutationFn = Apollo.MutationFunction<
  CommerceUpdateCategoryMutation,
  CommerceUpdateCategoryMutationVariables
>;

/**
 * __useCommerceUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateCategoryMutation, { data, loading, error }] = useCommerceUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommerceUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateCategoryMutation,
    CommerceUpdateCategoryMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateCategoryMutation,
    CommerceUpdateCategoryMutationVariables
  >(CommerceUpdateCategoryDocument, baseOptions);
}
export type CommerceUpdateCategoryMutationHookResult = ReturnType<
  typeof useCommerceUpdateCategoryMutation
>;
export type CommerceUpdateCategoryMutationResult = Apollo.MutationResult<CommerceUpdateCategoryMutation>;
export type CommerceUpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateCategoryMutation,
  CommerceUpdateCategoryMutationVariables
>;
export const CommerceUpdateProductDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'commerceUpdateProduct' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceProductUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateProduct' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceProductUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateProductMutationFn = Apollo.MutationFunction<
  CommerceUpdateProductMutation,
  CommerceUpdateProductMutationVariables
>;

/**
 * __useCommerceUpdateProductMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateProductMutation, { data, loading, error }] = useCommerceUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommerceUpdateProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateProductMutation,
    CommerceUpdateProductMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateProductMutation,
    CommerceUpdateProductMutationVariables
  >(CommerceUpdateProductDocument, baseOptions);
}
export type CommerceUpdateProductMutationHookResult = ReturnType<
  typeof useCommerceUpdateProductMutation
>;
export type CommerceUpdateProductMutationResult = Apollo.MutationResult<CommerceUpdateProductMutation>;
export type CommerceUpdateProductMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateProductMutation,
  CommerceUpdateProductMutationVariables
>;
export const CommerceUpdateSaleProductDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceUpdateSaleProduct' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceSaleProductUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceSaleProductUpdate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'saleId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'saleId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateSaleProduct' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceSaleProductUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceSaleProductUpdate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'saleId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateSaleProductMutationFn = Apollo.MutationFunction<
  CommerceUpdateSaleProductMutation,
  CommerceUpdateSaleProductMutationVariables
>;

/**
 * __useCommerceUpdateSaleProductMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateSaleProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateSaleProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateSaleProductMutation, { data, loading, error }] = useCommerceUpdateSaleProductMutation({
 *   variables: {
 *      commerceSaleProductUpdate: // value for 'commerceSaleProductUpdate'
 *      id: // value for 'id'
 *      saleId: // value for 'saleId'
 *   },
 * });
 */
export function useCommerceUpdateSaleProductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateSaleProductMutation,
    CommerceUpdateSaleProductMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateSaleProductMutation,
    CommerceUpdateSaleProductMutationVariables
  >(CommerceUpdateSaleProductDocument, baseOptions);
}
export type CommerceUpdateSaleProductMutationHookResult = ReturnType<
  typeof useCommerceUpdateSaleProductMutation
>;
export type CommerceUpdateSaleProductMutationResult = Apollo.MutationResult<CommerceUpdateSaleProductMutation>;
export type CommerceUpdateSaleProductMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateSaleProductMutation,
  CommerceUpdateSaleProductMutationVariables
>;
export const CommerceUpdateStoreDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceUpdateStore' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceStoreUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateStore' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceStoreUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateStoreMutationFn = Apollo.MutationFunction<
  CommerceUpdateStoreMutation,
  CommerceUpdateStoreMutationVariables
>;

/**
 * __useCommerceUpdateStoreMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateStoreMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateStoreMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateStoreMutation, { data, loading, error }] = useCommerceUpdateStoreMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCommerceUpdateStoreMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateStoreMutation,
    CommerceUpdateStoreMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateStoreMutation,
    CommerceUpdateStoreMutationVariables
  >(CommerceUpdateStoreDocument, baseOptions);
}
export type CommerceUpdateStoreMutationHookResult = ReturnType<
  typeof useCommerceUpdateStoreMutation
>;
export type CommerceUpdateStoreMutationResult = Apollo.MutationResult<CommerceUpdateStoreMutation>;
export type CommerceUpdateStoreMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateStoreMutation,
  CommerceUpdateStoreMutationVariables
>;
export const CreateOrderDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'createOrder' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'storeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'storeId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceOrderCreate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceCreateOrder' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storeId' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceOrderCreate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CreateOrderMutationFn = Apollo.MutationFunction<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      storeId: // value for 'storeId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >,
) {
  return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
    CreateOrderDocument,
    baseOptions,
  );
}
export type CreateOrderMutationHookResult = ReturnType<
  typeof useCreateOrderMutation
>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderMutation,
  CreateOrderMutationVariables
>;
export const EventCreateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'EventCreate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'event' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'eventCreate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxNumber' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timezone' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'baseUrl' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EventCreateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'event' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type EventCreateMutationFn = Apollo.MutationFunction<
  EventCreateMutation,
  EventCreateMutationVariables
>;

/**
 * __useEventCreateMutation__
 *
 * To run a mutation, you first call `useEventCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventCreateMutation, { data, loading, error }] = useEventCreateMutation({
 *   variables: {
 *      event: // value for 'event'
 *   },
 * });
 */
export function useEventCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EventCreateMutation,
    EventCreateMutationVariables
  >,
) {
  return Apollo.useMutation<EventCreateMutation, EventCreateMutationVariables>(
    EventCreateDocument,
    baseOptions,
  );
}
export type EventCreateMutationHookResult = ReturnType<
  typeof useEventCreateMutation
>;
export type EventCreateMutationResult = Apollo.MutationResult<EventCreateMutation>;
export type EventCreateMutationOptions = Apollo.BaseMutationOptions<
  EventCreateMutation,
  EventCreateMutationVariables
>;
export const EventUpdateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'EventUpdate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'eventUpdate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'event' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxNumber' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'timezone' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'baseUrl' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currency' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'legalEntity' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EventUpdateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type EventUpdateMutationFn = Apollo.MutationFunction<
  EventUpdateMutation,
  EventUpdateMutationVariables
>;

/**
 * __useEventUpdateMutation__
 *
 * To run a mutation, you first call `useEventUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventUpdateMutation, { data, loading, error }] = useEventUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEventUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EventUpdateMutation,
    EventUpdateMutationVariables
  >,
) {
  return Apollo.useMutation<EventUpdateMutation, EventUpdateMutationVariables>(
    EventUpdateDocument,
    baseOptions,
  );
}
export type EventUpdateMutationHookResult = ReturnType<
  typeof useEventUpdateMutation
>;
export type EventUpdateMutationResult = Apollo.MutationResult<EventUpdateMutation>;
export type EventUpdateMutationOptions = Apollo.BaseMutationOptions<
  EventUpdateMutation,
  EventUpdateMutationVariables
>;
export const LegalEntityCreateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'LegalEntityCreate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'legalEntityCreate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'legalEntity' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'regNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'website' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxNumber' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lineOne' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lineTwo' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LegalEntityCreateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type LegalEntityCreateMutationFn = Apollo.MutationFunction<
  LegalEntityCreateMutation,
  LegalEntityCreateMutationVariables
>;

/**
 * __useLegalEntityCreateMutation__
 *
 * To run a mutation, you first call `useLegalEntityCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLegalEntityCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [legalEntityCreateMutation, { data, loading, error }] = useLegalEntityCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLegalEntityCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LegalEntityCreateMutation,
    LegalEntityCreateMutationVariables
  >,
) {
  return Apollo.useMutation<
    LegalEntityCreateMutation,
    LegalEntityCreateMutationVariables
  >(LegalEntityCreateDocument, baseOptions);
}
export type LegalEntityCreateMutationHookResult = ReturnType<
  typeof useLegalEntityCreateMutation
>;
export type LegalEntityCreateMutationResult = Apollo.MutationResult<LegalEntityCreateMutation>;
export type LegalEntityCreateMutationOptions = Apollo.BaseMutationOptions<
  LegalEntityCreateMutation,
  LegalEntityCreateMutationVariables
>;
export const LegalEntityUpdateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'LegalEntityUpdate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'legalEntityUpdate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'legalEntity' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'regNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'website' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxNumber' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lineOne' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lineTwo' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'LegalEntityUpdateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type LegalEntityUpdateMutationFn = Apollo.MutationFunction<
  LegalEntityUpdateMutation,
  LegalEntityUpdateMutationVariables
>;

/**
 * __useLegalEntityUpdateMutation__
 *
 * To run a mutation, you first call `useLegalEntityUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLegalEntityUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [legalEntityUpdateMutation, { data, loading, error }] = useLegalEntityUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLegalEntityUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LegalEntityUpdateMutation,
    LegalEntityUpdateMutationVariables
  >,
) {
  return Apollo.useMutation<
    LegalEntityUpdateMutation,
    LegalEntityUpdateMutationVariables
  >(LegalEntityUpdateDocument, baseOptions);
}
export type LegalEntityUpdateMutationHookResult = ReturnType<
  typeof useLegalEntityUpdateMutation
>;
export type LegalEntityUpdateMutationResult = Apollo.MutationResult<LegalEntityUpdateMutation>;
export type LegalEntityUpdateMutationOptions = Apollo.BaseMutationOptions<
  LegalEntityUpdateMutation,
  LegalEntityUpdateMutationVariables
>;
export const UpdateCommerceOrderDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'UpdateCommerceOrder' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceOrderUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceOrderUpdate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'storeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'storeId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateOrder' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceOrderUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceOrderUpdate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storeId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type UpdateCommerceOrderMutationFn = Apollo.MutationFunction<
  UpdateCommerceOrderMutation,
  UpdateCommerceOrderMutationVariables
>;

/**
 * __useUpdateCommerceOrderMutation__
 *
 * To run a mutation, you first call `useUpdateCommerceOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommerceOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommerceOrderMutation, { data, loading, error }] = useUpdateCommerceOrderMutation({
 *   variables: {
 *      commerceOrderUpdate: // value for 'commerceOrderUpdate'
 *      id: // value for 'id'
 *      storeId: // value for 'storeId'
 *   },
 * });
 */
export function useUpdateCommerceOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCommerceOrderMutation,
    UpdateCommerceOrderMutationVariables
  >,
) {
  return Apollo.useMutation<
    UpdateCommerceOrderMutation,
    UpdateCommerceOrderMutationVariables
  >(UpdateCommerceOrderDocument, baseOptions);
}
export type UpdateCommerceOrderMutationHookResult = ReturnType<
  typeof useUpdateCommerceOrderMutation
>;
export type UpdateCommerceOrderMutationResult = Apollo.MutationResult<UpdateCommerceOrderMutation>;
export type UpdateCommerceOrderMutationOptions = Apollo.BaseMutationOptions<
  UpdateCommerceOrderMutation,
  UpdateCommerceOrderMutationVariables
>;
export const OrderTransferDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'OrderTransfer' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'orderUpdate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'clientMutationId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'order' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'owner' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'OrderUpdateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type OrderTransferMutationFn = Apollo.MutationFunction<
  OrderTransferMutation,
  OrderTransferMutationVariables
>;

/**
 * __useOrderTransferMutation__
 *
 * To run a mutation, you first call `useOrderTransferMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderTransferMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderTransferMutation, { data, loading, error }] = useOrderTransferMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderTransferMutation(
  baseOptions?: Apollo.MutationHookOptions<
    OrderTransferMutation,
    OrderTransferMutationVariables
  >,
) {
  return Apollo.useMutation<
    OrderTransferMutation,
    OrderTransferMutationVariables
  >(OrderTransferDocument, baseOptions);
}
export type OrderTransferMutationHookResult = ReturnType<
  typeof useOrderTransferMutation
>;
export type OrderTransferMutationResult = Apollo.MutationResult<OrderTransferMutation>;
export type OrderTransferMutationOptions = Apollo.BaseMutationOptions<
  OrderTransferMutation,
  OrderTransferMutationVariables
>;
export const TicketMagicLoginLinkRequestDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketMagicLoginLinkRequest' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'assignmentMagicLinkLoginRequest' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: {
                kind: 'Name',
                value: 'AssignmentMagicLinkLoginRequestInput',
              },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type TicketMagicLoginLinkRequestMutationFn = Apollo.MutationFunction<
  TicketMagicLoginLinkRequestMutation,
  TicketMagicLoginLinkRequestMutationVariables
>;

/**
 * __useTicketMagicLoginLinkRequestMutation__
 *
 * To run a mutation, you first call `useTicketMagicLoginLinkRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketMagicLoginLinkRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketMagicLoginLinkRequestMutation, { data, loading, error }] = useTicketMagicLoginLinkRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTicketMagicLoginLinkRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TicketMagicLoginLinkRequestMutation,
    TicketMagicLoginLinkRequestMutationVariables
  >,
) {
  return Apollo.useMutation<
    TicketMagicLoginLinkRequestMutation,
    TicketMagicLoginLinkRequestMutationVariables
  >(TicketMagicLoginLinkRequestDocument, baseOptions);
}
export type TicketMagicLoginLinkRequestMutationHookResult = ReturnType<
  typeof useTicketMagicLoginLinkRequestMutation
>;
export type TicketMagicLoginLinkRequestMutationResult = Apollo.MutationResult<TicketMagicLoginLinkRequestMutation>;
export type TicketMagicLoginLinkRequestMutationOptions = Apollo.BaseMutationOptions<
  TicketMagicLoginLinkRequestMutation,
  TicketMagicLoginLinkRequestMutationVariables
>;
export const TaxRateCreateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'taxRateCreate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'taxRateCreate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxRate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'TaxRateCreateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type TaxRateCreateMutationFn = Apollo.MutationFunction<
  TaxRateCreateMutation,
  TaxRateCreateMutationVariables
>;

/**
 * __useTaxRateCreateMutation__
 *
 * To run a mutation, you first call `useTaxRateCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaxRateCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taxRateCreateMutation, { data, loading, error }] = useTaxRateCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTaxRateCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TaxRateCreateMutation,
    TaxRateCreateMutationVariables
  >,
) {
  return Apollo.useMutation<
    TaxRateCreateMutation,
    TaxRateCreateMutationVariables
  >(TaxRateCreateDocument, baseOptions);
}
export type TaxRateCreateMutationHookResult = ReturnType<
  typeof useTaxRateCreateMutation
>;
export type TaxRateCreateMutationResult = Apollo.MutationResult<TaxRateCreateMutation>;
export type TaxRateCreateMutationOptions = Apollo.BaseMutationOptions<
  TaxRateCreateMutation,
  TaxRateCreateMutationVariables
>;
export const TaxRateUpdateDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TaxRateUpdate' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'taxRateUpdate' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxRate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'value' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'TaxRateUpdateInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type TaxRateUpdateMutationFn = Apollo.MutationFunction<
  TaxRateUpdateMutation,
  TaxRateUpdateMutationVariables
>;

/**
 * __useTaxRateUpdateMutation__
 *
 * To run a mutation, you first call `useTaxRateUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTaxRateUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [taxRateUpdateMutation, { data, loading, error }] = useTaxRateUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTaxRateUpdateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TaxRateUpdateMutation,
    TaxRateUpdateMutationVariables
  >,
) {
  return Apollo.useMutation<
    TaxRateUpdateMutation,
    TaxRateUpdateMutationVariables
  >(TaxRateUpdateDocument, baseOptions);
}
export type TaxRateUpdateMutationHookResult = ReturnType<
  typeof useTaxRateUpdateMutation
>;
export type TaxRateUpdateMutationResult = Apollo.MutationResult<TaxRateUpdateMutation>;
export type TaxRateUpdateMutationOptions = Apollo.BaseMutationOptions<
  TaxRateUpdateMutation,
  TaxRateUpdateMutationVariables
>;
export const TicketAcceptDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketAccept' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ticketId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'ticketId' },
                      },
                    },
                  ],
                  kind: 'ObjectValue',
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketAccept' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assignment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'context' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'assignable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'editable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'acceptable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rejectable' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'ticketId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type TicketAcceptMutationFn = Apollo.MutationFunction<
  TicketAcceptMutation,
  TicketAcceptMutationVariables
>;

/**
 * __useTicketAcceptMutation__
 *
 * To run a mutation, you first call `useTicketAcceptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketAcceptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketAcceptMutation, { data, loading, error }] = useTicketAcceptMutation({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useTicketAcceptMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TicketAcceptMutation,
    TicketAcceptMutationVariables
  >,
) {
  return Apollo.useMutation<
    TicketAcceptMutation,
    TicketAcceptMutationVariables
  >(TicketAcceptDocument, baseOptions);
}
export type TicketAcceptMutationHookResult = ReturnType<
  typeof useTicketAcceptMutation
>;
export type TicketAcceptMutationResult = Apollo.MutationResult<TicketAcceptMutation>;
export type TicketAcceptMutationOptions = Apollo.BaseMutationOptions<
  TicketAcceptMutation,
  TicketAcceptMutationVariables
>;
export const TicketAssignDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketAssign' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'firstName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'lastName' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'email' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'email' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ticketId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'ticketId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'notify' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'notify' },
                      },
                    },
                  ],
                  kind: 'ObjectValue',
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketAssign' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assignment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'assignee' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'firstName' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lastName' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'email' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'me' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'context' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'assignable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'editable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'acceptable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rejectable' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'firstName' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'lastName' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'ticketId' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'notify' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type TicketAssignMutationFn = Apollo.MutationFunction<
  TicketAssignMutation,
  TicketAssignMutationVariables
>;

/**
 * __useTicketAssignMutation__
 *
 * To run a mutation, you first call `useTicketAssignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketAssignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketAssignMutation, { data, loading, error }] = useTicketAssignMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      email: // value for 'email'
 *      ticketId: // value for 'ticketId'
 *      notify: // value for 'notify'
 *   },
 * });
 */
export function useTicketAssignMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TicketAssignMutation,
    TicketAssignMutationVariables
  >,
) {
  return Apollo.useMutation<
    TicketAssignMutation,
    TicketAssignMutationVariables
  >(TicketAssignDocument, baseOptions);
}
export type TicketAssignMutationHookResult = ReturnType<
  typeof useTicketAssignMutation
>;
export type TicketAssignMutationResult = Apollo.MutationResult<TicketAssignMutation>;
export type TicketAssignMutationOptions = Apollo.BaseMutationOptions<
  TicketAssignMutation,
  TicketAssignMutationVariables
>;
export const TicketRejectDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketReject' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ticketId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'ticketId' },
                      },
                    },
                  ],
                  kind: 'ObjectValue',
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketReject' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assignment' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'context' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'assignable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'editable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'acceptable' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rejectable' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'ticketId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type TicketRejectMutationFn = Apollo.MutationFunction<
  TicketRejectMutation,
  TicketRejectMutationVariables
>;

/**
 * __useTicketRejectMutation__
 *
 * To run a mutation, you first call `useTicketRejectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketRejectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketRejectMutation, { data, loading, error }] = useTicketRejectMutation({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useTicketRejectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TicketRejectMutation,
    TicketRejectMutationVariables
  >,
) {
  return Apollo.useMutation<
    TicketRejectMutation,
    TicketRejectMutationVariables
  >(TicketRejectDocument, baseOptions);
}
export type TicketRejectMutationHookResult = ReturnType<
  typeof useTicketRejectMutation
>;
export type TicketRejectMutationResult = Apollo.MutationResult<TicketRejectMutation>;
export type TicketRejectMutationOptions = Apollo.BaseMutationOptions<
  TicketRejectMutation,
  TicketRejectMutationVariables
>;
export const TicketUnvoidDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketUnvoid' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketUnvoid' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bookingRef' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'TicketUnvoidInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type TicketUnvoidMutationFn = Apollo.MutationFunction<
  TicketUnvoidMutation,
  TicketUnvoidMutationVariables
>;

/**
 * __useTicketUnvoidMutation__
 *
 * To run a mutation, you first call `useTicketUnvoidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketUnvoidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketUnvoidMutation, { data, loading, error }] = useTicketUnvoidMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTicketUnvoidMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TicketUnvoidMutation,
    TicketUnvoidMutationVariables
  >,
) {
  return Apollo.useMutation<
    TicketUnvoidMutation,
    TicketUnvoidMutationVariables
  >(TicketUnvoidDocument, baseOptions);
}
export type TicketUnvoidMutationHookResult = ReturnType<
  typeof useTicketUnvoidMutation
>;
export type TicketUnvoidMutationResult = Apollo.MutationResult<TicketUnvoidMutation>;
export type TicketUnvoidMutationOptions = Apollo.BaseMutationOptions<
  TicketUnvoidMutation,
  TicketUnvoidMutationVariables
>;
export const VoidTicketDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'VoidTicket' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketVoid' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticket' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'bookingRef' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'userErrors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'path' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'TicketVoidInput' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type VoidTicketMutationFn = Apollo.MutationFunction<
  VoidTicketMutation,
  VoidTicketMutationVariables
>;

/**
 * __useVoidTicketMutation__
 *
 * To run a mutation, you first call `useVoidTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoidTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voidTicketMutation, { data, loading, error }] = useVoidTicketMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVoidTicketMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VoidTicketMutation,
    VoidTicketMutationVariables
  >,
) {
  return Apollo.useMutation<VoidTicketMutation, VoidTicketMutationVariables>(
    VoidTicketDocument,
    baseOptions,
  );
}
export type VoidTicketMutationHookResult = ReturnType<
  typeof useVoidTicketMutation
>;
export type VoidTicketMutationResult = Apollo.MutationResult<VoidTicketMutation>;
export type VoidTicketMutationOptions = Apollo.BaseMutationOptions<
  VoidTicketMutation,
  VoidTicketMutationVariables
>;
export const AccessPermissionsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'AccessPermissions' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ticketTypeIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ticketTypeIds' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'accessPermissions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'detail' },
                            },
                            {
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'ids' },
                                  value: {
                                    kind: 'Variable',
                                    name: {
                                      kind: 'Name',
                                      value: 'ticketTypeIds',
                                    },
                                  },
                                },
                              ],
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ticketTypes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'ticketTypeIds' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useAccessPermissionsQuery__
 *
 * To run a query within a React component, call `useAccessPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPermissionsQuery({
 *   variables: {
 *      ticketTypeIds: // value for 'ticketTypeIds'
 *   },
 * });
 */
export function useAccessPermissionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AccessPermissionsQuery,
    AccessPermissionsQueryVariables
  >,
) {
  return Apollo.useQuery<
    AccessPermissionsQuery,
    AccessPermissionsQueryVariables
  >(AccessPermissionsDocument, baseOptions);
}
export function useAccessPermissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccessPermissionsQuery,
    AccessPermissionsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    AccessPermissionsQuery,
    AccessPermissionsQueryVariables
  >(AccessPermissionsDocument, baseOptions);
}
export type AccessPermissionsQueryHookResult = ReturnType<
  typeof useAccessPermissionsQuery
>;
export type AccessPermissionsLazyQueryHookResult = ReturnType<
  typeof useAccessPermissionsLazyQuery
>;
export type AccessPermissionsQueryResult = Apollo.QueryResult<
  AccessPermissionsQuery,
  AccessPermissionsQueryVariables
>;
export const AppConfigDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'AppConfig' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'appConfig' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'googleAnalyticsTrackingId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'googleTagManagerId' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'googleAnalyticsLinkerDomains' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'domain' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'googleFontsUrl' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'theme' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'metaData' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              alias: { kind: 'Name', value: 'url' },
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'siteTitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'siteDescription' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookPublisher' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterCreator' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useAppConfigQuery__
 *
 * To run a query within a React component, call `useAppConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppConfigQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AppConfigQuery,
    AppConfigQueryVariables
  >,
) {
  return Apollo.useQuery<AppConfigQuery, AppConfigQueryVariables>(
    AppConfigDocument,
    baseOptions,
  );
}
export function useAppConfigLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AppConfigQuery,
    AppConfigQueryVariables
  >,
) {
  return Apollo.useLazyQuery<AppConfigQuery, AppConfigQueryVariables>(
    AppConfigDocument,
    baseOptions,
  );
}
export type AppConfigQueryHookResult = ReturnType<typeof useAppConfigQuery>;
export type AppConfigLazyQueryHookResult = ReturnType<
  typeof useAppConfigLazyQuery
>;
export type AppConfigQueryResult = Apollo.QueryResult<
  AppConfigQuery,
  AppConfigQueryVariables
>;
export const CommerceGetCustomerDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceGetCustomer' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceGetCustomer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'line1' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'line2' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postalCode' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'vatNumber' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceGetCustomerQuery__
 *
 * To run a query within a React component, call `useCommerceGetCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceGetCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceGetCustomerQuery({
 *   variables: {
 *      id: // value for 'id'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useCommerceGetCustomerQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommerceGetCustomerQuery,
    CommerceGetCustomerQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceGetCustomerQuery,
    CommerceGetCustomerQueryVariables
  >(CommerceGetCustomerDocument, baseOptions);
}
export function useCommerceGetCustomerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceGetCustomerQuery,
    CommerceGetCustomerQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceGetCustomerQuery,
    CommerceGetCustomerQueryVariables
  >(CommerceGetCustomerDocument, baseOptions);
}
export type CommerceGetCustomerQueryHookResult = ReturnType<
  typeof useCommerceGetCustomerQuery
>;
export type CommerceGetCustomerLazyQueryHookResult = ReturnType<
  typeof useCommerceGetCustomerLazyQuery
>;
export type CommerceGetCustomerQueryResult = Apollo.QueryResult<
  CommerceGetCustomerQuery,
  CommerceGetCustomerQueryVariables
>;
export const CommerceGetDealDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'commerceGetDeal' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceGetDeal' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedAt' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dealItems' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'metadata' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'min' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'active' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'taxType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'description',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'taxes' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'rateAmount',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'rateType',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'country',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'step' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceGetDealQuery__
 *
 * To run a query within a React component, call `useCommerceGetDealQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceGetDealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceGetDealQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommerceGetDealQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommerceGetDealQuery,
    CommerceGetDealQueryVariables
  >,
) {
  return Apollo.useQuery<CommerceGetDealQuery, CommerceGetDealQueryVariables>(
    CommerceGetDealDocument,
    baseOptions,
  );
}
export function useCommerceGetDealLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceGetDealQuery,
    CommerceGetDealQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceGetDealQuery,
    CommerceGetDealQueryVariables
  >(CommerceGetDealDocument, baseOptions);
}
export type CommerceGetDealQueryHookResult = ReturnType<
  typeof useCommerceGetDealQuery
>;
export type CommerceGetDealLazyQueryHookResult = ReturnType<
  typeof useCommerceGetDealLazyQuery
>;
export type CommerceGetDealQueryResult = Apollo.QueryResult<
  CommerceGetDealQuery,
  CommerceGetDealQueryVariables
>;
export const CommerceGetOrderDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'commerceGetOrder' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'storeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'storeId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceGetOrder' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'billed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'createdBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommerceUser' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencySymbol' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'invoiceUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedAt' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'locked' } },
                { kind: 'Field', name: { kind: 'Name', value: 'paid' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'customer' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommerceCustomer' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommerceOrderItem' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentMethod' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommercePaymentMethod' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paymentStatus' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'subTotal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'transactions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CommerceTransaction' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storeId' },
          },
        },
      ],
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommercePaymentMethod' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommercePaymentMethod' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceUser' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceUser' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTaxType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTaxType' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTax' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rateAmount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rateType' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceTaxType' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTax' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceProduct' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'active' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          { kind: 'Field', name: { kind: 'Name', value: 'taxMode' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceProduct' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceOrderItem' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'itemName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'price' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceProduct' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'productMetadata' } },
          { kind: 'Field', name: { kind: 'Name', value: 'quantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'subTotal' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceTax' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'taxTotal' } },
          { kind: 'Field', name: { kind: 'Name', value: 'total' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceOrderItem' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceAddress' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'country' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'line1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'line2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'state' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceAddress' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceCustomer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'address' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceAddress' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phoneNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'vatNumber' } },
          { kind: 'Field', name: { kind: 'Name', value: 'vatVerified' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceCustomer' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CommerceTransaction' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createdBy' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommerceUser' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastUpdatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'paymentMethod' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CommercePaymentMethod' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refundedTransaction' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'timestamp' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CommerceTransaction' },
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceGetOrderQuery__
 *
 * To run a query within a React component, call `useCommerceGetOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceGetOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceGetOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *      storeId: // value for 'storeId'
 *   },
 * });
 */
export function useCommerceGetOrderQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommerceGetOrderQuery,
    CommerceGetOrderQueryVariables
  >,
) {
  return Apollo.useQuery<CommerceGetOrderQuery, CommerceGetOrderQueryVariables>(
    CommerceGetOrderDocument,
    baseOptions,
  );
}
export function useCommerceGetOrderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceGetOrderQuery,
    CommerceGetOrderQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceGetOrderQuery,
    CommerceGetOrderQueryVariables
  >(CommerceGetOrderDocument, baseOptions);
}
export type CommerceGetOrderQueryHookResult = ReturnType<
  typeof useCommerceGetOrderQuery
>;
export type CommerceGetOrderLazyQueryHookResult = ReturnType<
  typeof useCommerceGetOrderLazyQuery
>;
export type CommerceGetOrderQueryResult = Apollo.QueryResult<
  CommerceGetOrderQuery,
  CommerceGetOrderQueryVariables
>;
export const CommerceGetProductDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceGetProduct' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceGetProduct' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'createdBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'defaultPrice' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedAt' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'taxMode' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rateAmount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rateType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceGetProductQuery__
 *
 * To run a query within a React component, call `useCommerceGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceGetProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCommerceGetProductQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommerceGetProductQuery,
    CommerceGetProductQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceGetProductQuery,
    CommerceGetProductQueryVariables
  >(CommerceGetProductDocument, baseOptions);
}
export function useCommerceGetProductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceGetProductQuery,
    CommerceGetProductQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceGetProductQuery,
    CommerceGetProductQueryVariables
  >(CommerceGetProductDocument, baseOptions);
}
export type CommerceGetProductQueryHookResult = ReturnType<
  typeof useCommerceGetProductQuery
>;
export type CommerceGetProductLazyQueryHookResult = ReturnType<
  typeof useCommerceGetProductLazyQuery
>;
export type CommerceGetProductQueryResult = Apollo.QueryResult<
  CommerceGetProductQuery,
  CommerceGetProductQueryVariables
>;
export const CommerceGetStoreDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceGetStore' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceGetStore' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'baseUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'currencySymbol' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxTypes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rateAmount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rateType' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceGetStoreQuery__
 *
 * To run a query within a React component, call `useCommerceGetStoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceGetStoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceGetStoreQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommerceGetStoreQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceGetStoreQuery,
    CommerceGetStoreQueryVariables
  >,
) {
  return Apollo.useQuery<CommerceGetStoreQuery, CommerceGetStoreQueryVariables>(
    CommerceGetStoreDocument,
    baseOptions,
  );
}
export function useCommerceGetStoreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceGetStoreQuery,
    CommerceGetStoreQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceGetStoreQuery,
    CommerceGetStoreQueryVariables
  >(CommerceGetStoreDocument, baseOptions);
}
export type CommerceGetStoreQueryHookResult = ReturnType<
  typeof useCommerceGetStoreQuery
>;
export type CommerceGetStoreLazyQueryHookResult = ReturnType<
  typeof useCommerceGetStoreLazyQuery
>;
export type CommerceGetStoreQueryResult = Apollo.QueryResult<
  CommerceGetStoreQuery,
  CommerceGetStoreQueryVariables
>;
export const CommerceListCategoriesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListCategories' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListCategories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListCategoriesQuery__
 *
 * To run a query within a React component, call `useCommerceListCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommerceListCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceListCategoriesQuery,
    CommerceListCategoriesQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListCategoriesQuery,
    CommerceListCategoriesQueryVariables
  >(CommerceListCategoriesDocument, baseOptions);
}
export function useCommerceListCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListCategoriesQuery,
    CommerceListCategoriesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListCategoriesQuery,
    CommerceListCategoriesQueryVariables
  >(CommerceListCategoriesDocument, baseOptions);
}
export type CommerceListCategoriesQueryHookResult = ReturnType<
  typeof useCommerceListCategoriesQuery
>;
export type CommerceListCategoriesLazyQueryHookResult = ReturnType<
  typeof useCommerceListCategoriesLazyQuery
>;
export type CommerceListCategoriesQueryResult = Apollo.QueryResult<
  CommerceListCategoriesQuery,
  CommerceListCategoriesQueryVariables
>;
export const CommerceListDealItemsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListDealItems' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'dealId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'dealId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListDealItems' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'metadata' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'min' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'step' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dealId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListDealItemsQuery__
 *
 * To run a query within a React component, call `useCommerceListDealItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListDealItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListDealItemsQuery({
 *   variables: {
 *      dealId: // value for 'dealId'
 *   },
 * });
 */
export function useCommerceListDealItemsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommerceListDealItemsQuery,
    CommerceListDealItemsQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListDealItemsQuery,
    CommerceListDealItemsQueryVariables
  >(CommerceListDealItemsDocument, baseOptions);
}
export function useCommerceListDealItemsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListDealItemsQuery,
    CommerceListDealItemsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListDealItemsQuery,
    CommerceListDealItemsQueryVariables
  >(CommerceListDealItemsDocument, baseOptions);
}
export type CommerceListDealItemsQueryHookResult = ReturnType<
  typeof useCommerceListDealItemsQuery
>;
export type CommerceListDealItemsLazyQueryHookResult = ReturnType<
  typeof useCommerceListDealItemsLazyQuery
>;
export type CommerceListDealItemsQueryResult = Apollo.QueryResult<
  CommerceListDealItemsQuery,
  CommerceListDealItemsQueryVariables
>;
export const CommerceListDealsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListDeals' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sort' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListDeals' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endDate' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'metadata' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startDate' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dealItems' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'createdAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lastUpdatedAt' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'max' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'metadata' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'min' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'product' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'price' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'categories' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'children',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'name',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'step' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'CommerceSortTerm' },
              },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListDealsQuery__
 *
 * To run a query within a React component, call `useCommerceListDealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListDealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListDealsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCommerceListDealsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceListDealsQuery,
    CommerceListDealsQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListDealsQuery,
    CommerceListDealsQueryVariables
  >(CommerceListDealsDocument, baseOptions);
}
export function useCommerceListDealsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListDealsQuery,
    CommerceListDealsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListDealsQuery,
    CommerceListDealsQueryVariables
  >(CommerceListDealsDocument, baseOptions);
}
export type CommerceListDealsQueryHookResult = ReturnType<
  typeof useCommerceListDealsQuery
>;
export type CommerceListDealsLazyQueryHookResult = ReturnType<
  typeof useCommerceListDealsLazyQuery
>;
export type CommerceListDealsQueryResult = Apollo.QueryResult<
  CommerceListDealsQuery,
  CommerceListDealsQueryVariables
>;
export const CommerceListPaymentMethodsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListPaymentMethods' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListPaymentMethods' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'configuration' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gateway' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useCommerceListPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListPaymentMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommerceListPaymentMethodsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceListPaymentMethodsQuery,
    CommerceListPaymentMethodsQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListPaymentMethodsQuery,
    CommerceListPaymentMethodsQueryVariables
  >(CommerceListPaymentMethodsDocument, baseOptions);
}
export function useCommerceListPaymentMethodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListPaymentMethodsQuery,
    CommerceListPaymentMethodsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListPaymentMethodsQuery,
    CommerceListPaymentMethodsQueryVariables
  >(CommerceListPaymentMethodsDocument, baseOptions);
}
export type CommerceListPaymentMethodsQueryHookResult = ReturnType<
  typeof useCommerceListPaymentMethodsQuery
>;
export type CommerceListPaymentMethodsLazyQueryHookResult = ReturnType<
  typeof useCommerceListPaymentMethodsLazyQuery
>;
export type CommerceListPaymentMethodsQueryResult = Apollo.QueryResult<
  CommerceListPaymentMethodsQuery,
  CommerceListPaymentMethodsQueryVariables
>;
export const CommerceListProductsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListProducts' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListProducts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'categories' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'active' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'defaultPrice' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tags' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'code' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxMode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxType' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListProductsQuery__
 *
 * To run a query within a React component, call `useCommerceListProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommerceListProductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceListProductsQuery,
    CommerceListProductsQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListProductsQuery,
    CommerceListProductsQueryVariables
  >(CommerceListProductsDocument, baseOptions);
}
export function useCommerceListProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListProductsQuery,
    CommerceListProductsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListProductsQuery,
    CommerceListProductsQueryVariables
  >(CommerceListProductsDocument, baseOptions);
}
export type CommerceListProductsQueryHookResult = ReturnType<
  typeof useCommerceListProductsQuery
>;
export type CommerceListProductsLazyQueryHookResult = ReturnType<
  typeof useCommerceListProductsLazyQuery
>;
export type CommerceListProductsQueryResult = Apollo.QueryResult<
  CommerceListProductsQuery,
  CommerceListProductsQueryVariables
>;
export const CommerceListSaleProductsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListSaleProducts' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'saleId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'saleId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sort' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListSaleProducts' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'product' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'type' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'saleId' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'CommerceSortTerm' },
              },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListSaleProductsQuery__
 *
 * To run a query within a React component, call `useCommerceListSaleProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListSaleProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListSaleProductsQuery({
 *   variables: {
 *      saleId: // value for 'saleId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCommerceListSaleProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CommerceListSaleProductsQuery,
    CommerceListSaleProductsQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListSaleProductsQuery,
    CommerceListSaleProductsQueryVariables
  >(CommerceListSaleProductsDocument, baseOptions);
}
export function useCommerceListSaleProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListSaleProductsQuery,
    CommerceListSaleProductsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListSaleProductsQuery,
    CommerceListSaleProductsQueryVariables
  >(CommerceListSaleProductsDocument, baseOptions);
}
export type CommerceListSaleProductsQueryHookResult = ReturnType<
  typeof useCommerceListSaleProductsQuery
>;
export type CommerceListSaleProductsLazyQueryHookResult = ReturnType<
  typeof useCommerceListSaleProductsLazyQuery
>;
export type CommerceListSaleProductsQueryResult = Apollo.QueryResult<
  CommerceListSaleProductsQuery,
  CommerceListSaleProductsQueryVariables
>;
export const CommerceListStoresDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListStores' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListStores' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'currencySymbol' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxTypes' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'taxes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'country' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rateAmount' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rateType' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListStoresQuery__
 *
 * To run a query within a React component, call `useCommerceListStoresQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListStoresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListStoresQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommerceListStoresQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceListStoresQuery,
    CommerceListStoresQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListStoresQuery,
    CommerceListStoresQueryVariables
  >(CommerceListStoresDocument, baseOptions);
}
export function useCommerceListStoresLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListStoresQuery,
    CommerceListStoresQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListStoresQuery,
    CommerceListStoresQueryVariables
  >(CommerceListStoresDocument, baseOptions);
}
export type CommerceListStoresQueryHookResult = ReturnType<
  typeof useCommerceListStoresQuery
>;
export type CommerceListStoresLazyQueryHookResult = ReturnType<
  typeof useCommerceListStoresLazyQuery
>;
export type CommerceListStoresQueryResult = Apollo.QueryResult<
  CommerceListStoresQuery,
  CommerceListStoresQueryVariables
>;
export const CommerceListTagsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListTags' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'page' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'page' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pageSize' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'pageSize' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'sort' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'sort' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'storeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'storeId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'terms' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'terms' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListTags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'page' } },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'pageSize' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'CommerceSortTerm' },
              },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sort' } },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'storeId' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'CommerceSearchTerm' },
              },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'terms' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListTagsQuery__
 *
 * To run a query within a React component, call `useCommerceListTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListTagsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *      storeId: // value for 'storeId'
 *      terms: // value for 'terms'
 *   },
 * });
 */
export function useCommerceListTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceListTagsQuery,
    CommerceListTagsQueryVariables
  >,
) {
  return Apollo.useQuery<CommerceListTagsQuery, CommerceListTagsQueryVariables>(
    CommerceListTagsDocument,
    baseOptions,
  );
}
export function useCommerceListTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListTagsQuery,
    CommerceListTagsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListTagsQuery,
    CommerceListTagsQueryVariables
  >(CommerceListTagsDocument, baseOptions);
}
export type CommerceListTagsQueryHookResult = ReturnType<
  typeof useCommerceListTagsQuery
>;
export type CommerceListTagsLazyQueryHookResult = ReturnType<
  typeof useCommerceListTagsLazyQuery
>;
export type CommerceListTagsQueryResult = Apollo.QueryResult<
  CommerceListTagsQuery,
  CommerceListTagsQueryVariables
>;
export const CommerceListTaxTypesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceListTaxTypes' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListTaxTypes' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCommerceListTaxTypesQuery__
 *
 * To run a query within a React component, call `useCommerceListTaxTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommerceListTaxTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommerceListTaxTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCommerceListTaxTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CommerceListTaxTypesQuery,
    CommerceListTaxTypesQueryVariables
  >,
) {
  return Apollo.useQuery<
    CommerceListTaxTypesQuery,
    CommerceListTaxTypesQueryVariables
  >(CommerceListTaxTypesDocument, baseOptions);
}
export function useCommerceListTaxTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommerceListTaxTypesQuery,
    CommerceListTaxTypesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    CommerceListTaxTypesQuery,
    CommerceListTaxTypesQueryVariables
  >(CommerceListTaxTypesDocument, baseOptions);
}
export type CommerceListTaxTypesQueryHookResult = ReturnType<
  typeof useCommerceListTaxTypesQuery
>;
export type CommerceListTaxTypesLazyQueryHookResult = ReturnType<
  typeof useCommerceListTaxTypesLazyQuery
>;
export type CommerceListTaxTypesQueryResult = Apollo.QueryResult<
  CommerceListTaxTypesQuery,
  CommerceListTaxTypesQueryVariables
>;
export const CommerceUpdateCustomerDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'CommerceUpdateCustomer' },
      operation: 'mutation',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'commerceCustomerUpdate' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'commerceCustomerUpdate' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceUpdateCustomer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CommerceCustomerUpdate' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'commerceCustomerUpdate' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderId' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};
export type CommerceUpdateCustomerMutationFn = Apollo.MutationFunction<
  CommerceUpdateCustomerMutation,
  CommerceUpdateCustomerMutationVariables
>;

/**
 * __useCommerceUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useCommerceUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommerceUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commerceUpdateCustomerMutation, { data, loading, error }] = useCommerceUpdateCustomerMutation({
 *   variables: {
 *      commerceCustomerUpdate: // value for 'commerceCustomerUpdate'
 *      id: // value for 'id'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useCommerceUpdateCustomerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommerceUpdateCustomerMutation,
    CommerceUpdateCustomerMutationVariables
  >,
) {
  return Apollo.useMutation<
    CommerceUpdateCustomerMutation,
    CommerceUpdateCustomerMutationVariables
  >(CommerceUpdateCustomerDocument, baseOptions);
}
export type CommerceUpdateCustomerMutationHookResult = ReturnType<
  typeof useCommerceUpdateCustomerMutation
>;
export type CommerceUpdateCustomerMutationResult = Apollo.MutationResult<CommerceUpdateCustomerMutation>;
export type CommerceUpdateCustomerMutationOptions = Apollo.BaseMutationOptions<
  CommerceUpdateCustomerMutation,
  CommerceUpdateCustomerMutationVariables
>;
export const CountriesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'countries' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'countries' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'code' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CountriesQuery,
    CountriesQueryVariables
  >,
) {
  return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(
    CountriesDocument,
    baseOptions,
  );
}
export function useCountriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountriesQuery,
    CountriesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(
    CountriesDocument,
    baseOptions,
  );
}
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<
  typeof useCountriesLazyQuery
>;
export type CountriesQueryResult = Apollo.QueryResult<
  CountriesQuery,
  CountriesQueryVariables
>;
export const EventDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'event' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'event' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'timezone' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'timeZone' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ianaName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utcOffset' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'baseUrl' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'country' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'legalEntity' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'address' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'city' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lineOne' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'lineTwo' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'postalCode' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'region' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'regNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'taxNumber' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'website' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'taxNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'taxRates' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rateType' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'country' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'code' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'taxType' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'value' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useEventQuery__
 *
 * To run a query within a React component, call `useEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useEventQuery(
  baseOptions?: Apollo.QueryHookOptions<EventQuery, EventQueryVariables>,
) {
  return Apollo.useQuery<EventQuery, EventQueryVariables>(
    EventDocument,
    baseOptions,
  );
}
export function useEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventQuery, EventQueryVariables>,
) {
  return Apollo.useLazyQuery<EventQuery, EventQueryVariables>(
    EventDocument,
    baseOptions,
  );
}
export type EventQueryHookResult = ReturnType<typeof useEventQuery>;
export type EventLazyQueryHookResult = ReturnType<typeof useEventLazyQuery>;
export type EventQueryResult = Apollo.QueryResult<
  EventQuery,
  EventQueryVariables
>;
export const EventListQueryDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'EventListQuery' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filter' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'events' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'slug' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'startDate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'endDate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'timezone' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'baseUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'versions' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'event' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'createdAt' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'whodunnit' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'taxRates' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'rateType',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'country',
                                                },
                                                selectionSet: {
                                                  kind: 'SelectionSet',
                                                  selections: [
                                                    {
                                                      kind: 'Field',
                                                      name: {
                                                        kind: 'Name',
                                                        value: 'name',
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'name',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'taxType',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'value',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPreviousPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startCursor' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'EventFilter' },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filter' },
          },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useEventListQueryQuery__
 *
 * To run a query within a React component, call `useEventListQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventListQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventListQueryQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEventListQueryQuery(
  baseOptions?: Apollo.QueryHookOptions<
    EventListQueryQuery,
    EventListQueryQueryVariables
  >,
) {
  return Apollo.useQuery<EventListQueryQuery, EventListQueryQueryVariables>(
    EventListQueryDocument,
    baseOptions,
  );
}
export function useEventListQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EventListQueryQuery,
    EventListQueryQueryVariables
  >,
) {
  return Apollo.useLazyQuery<EventListQueryQuery, EventListQueryQueryVariables>(
    EventListQueryDocument,
    baseOptions,
  );
}
export type EventListQueryQueryHookResult = ReturnType<
  typeof useEventListQueryQuery
>;
export type EventListQueryLazyQueryHookResult = ReturnType<
  typeof useEventListQueryLazyQuery
>;
export type EventListQueryQueryResult = Apollo.QueryResult<
  EventListQueryQuery,
  EventListQueryQueryVariables
>;
export const EventTimeZoneDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'EventTimeZone' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'event' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'timeZone' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'displayName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ianaName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'utcOffset' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useEventTimeZoneQuery__
 *
 * To run a query within a React component, call `useEventTimeZoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventTimeZoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventTimeZoneQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useEventTimeZoneQuery(
  baseOptions?: Apollo.QueryHookOptions<
    EventTimeZoneQuery,
    EventTimeZoneQueryVariables
  >,
) {
  return Apollo.useQuery<EventTimeZoneQuery, EventTimeZoneQueryVariables>(
    EventTimeZoneDocument,
    baseOptions,
  );
}
export function useEventTimeZoneLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EventTimeZoneQuery,
    EventTimeZoneQueryVariables
  >,
) {
  return Apollo.useLazyQuery<EventTimeZoneQuery, EventTimeZoneQueryVariables>(
    EventTimeZoneDocument,
    baseOptions,
  );
}
export type EventTimeZoneQueryHookResult = ReturnType<
  typeof useEventTimeZoneQuery
>;
export type EventTimeZoneLazyQueryHookResult = ReturnType<
  typeof useEventTimeZoneLazyQuery
>;
export type EventTimeZoneQueryResult = Apollo.QueryResult<
  EventTimeZoneQuery,
  EventTimeZoneQueryVariables
>;
export const TaEventDataDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'taEventData' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'slug' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'slug' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'taEvent' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'industries' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companySizes' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'passportRequired' },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'slug' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useTaEventDataQuery__
 *
 * To run a query within a React component, call `useTaEventDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaEventDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaEventDataQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useTaEventDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    TaEventDataQuery,
    TaEventDataQueryVariables
  >,
) {
  return Apollo.useQuery<TaEventDataQuery, TaEventDataQueryVariables>(
    TaEventDataDocument,
    baseOptions,
  );
}
export function useTaEventDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TaEventDataQuery,
    TaEventDataQueryVariables
  >,
) {
  return Apollo.useLazyQuery<TaEventDataQuery, TaEventDataQueryVariables>(
    TaEventDataDocument,
    baseOptions,
  );
}
export type TaEventDataQueryHookResult = ReturnType<typeof useTaEventDataQuery>;
export type TaEventDataLazyQueryHookResult = ReturnType<
  typeof useTaEventDataLazyQuery
>;
export type TaEventDataQueryResult = Apollo.QueryResult<
  TaEventDataQuery,
  TaEventDataQueryVariables
>;
export const LegalEntityDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'legalEntity' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'legalEntity' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'address' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'city' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'country' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'code' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lineOne' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lineTwo' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'postalCode' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'region' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'regNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'taxNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'note' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useLegalEntityQuery__
 *
 * To run a query within a React component, call `useLegalEntityQuery` and pass it any options that fit your needs.
 * When your component renders, `useLegalEntityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLegalEntityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLegalEntityQuery(
  baseOptions: Apollo.QueryHookOptions<
    LegalEntityQuery,
    LegalEntityQueryVariables
  >,
) {
  return Apollo.useQuery<LegalEntityQuery, LegalEntityQueryVariables>(
    LegalEntityDocument,
    baseOptions,
  );
}
export function useLegalEntityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LegalEntityQuery,
    LegalEntityQueryVariables
  >,
) {
  return Apollo.useLazyQuery<LegalEntityQuery, LegalEntityQueryVariables>(
    LegalEntityDocument,
    baseOptions,
  );
}
export type LegalEntityQueryHookResult = ReturnType<typeof useLegalEntityQuery>;
export type LegalEntityLazyQueryHookResult = ReturnType<
  typeof useLegalEntityLazyQuery
>;
export type LegalEntityQueryResult = Apollo.QueryResult<
  LegalEntityQuery,
  LegalEntityQueryVariables
>;
export const LegalEntitiesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'legalEntities' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'legalEntities' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'cursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'regNumber' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'website' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'taxNumber' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'note' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'city' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'postalCode' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lineOne' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'lineTwo' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'region' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'country' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPreviousPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startCursor' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useLegalEntitiesQuery__
 *
 * To run a query within a React component, call `useLegalEntitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useLegalEntitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLegalEntitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useLegalEntitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LegalEntitiesQuery,
    LegalEntitiesQueryVariables
  >,
) {
  return Apollo.useQuery<LegalEntitiesQuery, LegalEntitiesQueryVariables>(
    LegalEntitiesDocument,
    baseOptions,
  );
}
export function useLegalEntitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LegalEntitiesQuery,
    LegalEntitiesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<LegalEntitiesQuery, LegalEntitiesQueryVariables>(
    LegalEntitiesDocument,
    baseOptions,
  );
}
export type LegalEntitiesQueryHookResult = ReturnType<
  typeof useLegalEntitiesQuery
>;
export type LegalEntitiesLazyQueryHookResult = ReturnType<
  typeof useLegalEntitiesLazyQuery
>;
export type LegalEntitiesQueryResult = Apollo.QueryResult<
  LegalEntitiesQuery,
  LegalEntitiesQueryVariables
>;
export const MyAssignmentDashboardDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'MyAssignmentDashboard' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'assignmentUser' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'currency' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'summary' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tickets' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ticketType' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'completedAt' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useMyAssignmentDashboardQuery__
 *
 * To run a query within a React component, call `useMyAssignmentDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAssignmentDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAssignmentDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAssignmentDashboardQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyAssignmentDashboardQuery,
    MyAssignmentDashboardQueryVariables
  >,
) {
  return Apollo.useQuery<
    MyAssignmentDashboardQuery,
    MyAssignmentDashboardQueryVariables
  >(MyAssignmentDashboardDocument, baseOptions);
}
export function useMyAssignmentDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyAssignmentDashboardQuery,
    MyAssignmentDashboardQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    MyAssignmentDashboardQuery,
    MyAssignmentDashboardQueryVariables
  >(MyAssignmentDashboardDocument, baseOptions);
}
export type MyAssignmentDashboardQueryHookResult = ReturnType<
  typeof useMyAssignmentDashboardQuery
>;
export type MyAssignmentDashboardLazyQueryHookResult = ReturnType<
  typeof useMyAssignmentDashboardLazyQuery
>;
export type MyAssignmentDashboardQueryResult = Apollo.QueryResult<
  MyAssignmentDashboardQuery,
  MyAssignmentDashboardQueryVariables
>;
export const MyDashboardDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'MyDashboard' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tickets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useMyDashboardQuery__
 *
 * To run a query within a React component, call `useMyDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyDashboardQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyDashboardQuery,
    MyDashboardQueryVariables
  >,
) {
  return Apollo.useQuery<MyDashboardQuery, MyDashboardQueryVariables>(
    MyDashboardDocument,
    baseOptions,
  );
}
export function useMyDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyDashboardQuery,
    MyDashboardQueryVariables
  >,
) {
  return Apollo.useLazyQuery<MyDashboardQuery, MyDashboardQueryVariables>(
    MyDashboardDocument,
    baseOptions,
  );
}
export type MyDashboardQueryHookResult = ReturnType<typeof useMyDashboardQuery>;
export type MyDashboardLazyQueryHookResult = ReturnType<
  typeof useMyDashboardLazyQuery
>;
export type MyDashboardQueryResult = Apollo.QueryResult<
  MyDashboardQuery,
  MyDashboardQueryVariables
>;
export const MyOrdersDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'MyOrders' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'orders' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'reference' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'amount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'currency' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'summary' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'tickets' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ticketType' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'completedAt' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useMyOrdersQuery__
 *
 * To run a query within a React component, call `useMyOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyOrdersQuery(
  baseOptions?: Apollo.QueryHookOptions<MyOrdersQuery, MyOrdersQueryVariables>,
) {
  return Apollo.useQuery<MyOrdersQuery, MyOrdersQueryVariables>(
    MyOrdersDocument,
    baseOptions,
  );
}
export function useMyOrdersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyOrdersQuery,
    MyOrdersQueryVariables
  >,
) {
  return Apollo.useLazyQuery<MyOrdersQuery, MyOrdersQueryVariables>(
    MyOrdersDocument,
    baseOptions,
  );
}
export type MyOrdersQueryHookResult = ReturnType<typeof useMyOrdersQuery>;
export type MyOrdersLazyQueryHookResult = ReturnType<
  typeof useMyOrdersLazyQuery
>;
export type MyOrdersQueryResult = Apollo.QueryResult<
  MyOrdersQuery,
  MyOrdersQueryVariables
>;
export const MyTicketsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'MyTickets' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tickets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bookingRef' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ticketType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'assignment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'state' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'appLoginEmail',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignee' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'me' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'firstName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'lastName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'email',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'phoneNumber',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'city' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'companyName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'companySizeId',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'industryId',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'jobTitle',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'marketingConsent',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'passportNumber',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'personalisationConsent',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'context' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignable' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'editable' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'acceptable' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rejectable' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useMyTicketsQuery__
 *
 * To run a query within a React component, call `useMyTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTicketsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    MyTicketsQuery,
    MyTicketsQueryVariables
  >,
) {
  return Apollo.useQuery<MyTicketsQuery, MyTicketsQueryVariables>(
    MyTicketsDocument,
    baseOptions,
  );
}
export function useMyTicketsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyTicketsQuery,
    MyTicketsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<MyTicketsQuery, MyTicketsQueryVariables>(
    MyTicketsDocument,
    baseOptions,
  );
}
export type MyTicketsQueryHookResult = ReturnType<typeof useMyTicketsQuery>;
export type MyTicketsLazyQueryHookResult = ReturnType<
  typeof useMyTicketsLazyQuery
>;
export type MyTicketsQueryResult = Apollo.QueryResult<
  MyTicketsQuery,
  MyTicketsQueryVariables
>;
export const OrderByRefDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'OrderByRef' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'reference' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'reference' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'order' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketsSummary' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'TicketsSummary' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'invoiceUrl' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'currency' } },
                { kind: 'Field', name: { kind: 'Name', value: 'reference' } },
                { kind: 'Field', name: { kind: 'Name', value: 'completedAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedAt' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'state' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'owner' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'firstName' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastName' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'source' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sourceId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'summary' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ticketType' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tickets' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'tickets' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'bookingRef' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'state' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'ticketType' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'name' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'order' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'owner',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'firstName',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'lastName',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'email',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignment' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'appLoginEmail',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'state',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'assigner',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'email',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'firstName',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'lastName',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'assignee',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'email',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'firstName',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'lastName',
                                                },
                                              },
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value:
                                                    'lastLoginTokenCreatedAt',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'reference' },
          },
        },
      ],
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketsSummary' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'all' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'active' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'assigned' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'accepted' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'checkedIn' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'duplicate' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'locked' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'pending' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'unassigned' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'count' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'neverAssigned' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rejected' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'count' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'void' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketsSummary' },
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useOrderByRefQuery__
 *
 * To run a query within a React component, call `useOrderByRefQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderByRefQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderByRefQuery({
 *   variables: {
 *      reference: // value for 'reference'
 *   },
 * });
 */
export function useOrderByRefQuery(
  baseOptions: Apollo.QueryHookOptions<
    OrderByRefQuery,
    OrderByRefQueryVariables
  >,
) {
  return Apollo.useQuery<OrderByRefQuery, OrderByRefQueryVariables>(
    OrderByRefDocument,
    baseOptions,
  );
}
export function useOrderByRefLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrderByRefQuery,
    OrderByRefQueryVariables
  >,
) {
  return Apollo.useLazyQuery<OrderByRefQuery, OrderByRefQueryVariables>(
    OrderByRefDocument,
    baseOptions,
  );
}
export type OrderByRefQueryHookResult = ReturnType<typeof useOrderByRefQuery>;
export type OrderByRefLazyQueryHookResult = ReturnType<
  typeof useOrderByRefLazyQuery
>;
export type OrderByRefQueryResult = Apollo.QueryResult<
  OrderByRefQuery,
  OrderByRefQueryVariables
>;
export const OrderTicketsDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'OrderTickets' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'orderId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'orderId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'filter' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'filter' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'after' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'after' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'before' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'before' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'first' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'first' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'last' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'last' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'tickets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'pageInfo' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasNextPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'hasPreviousPage' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endCursor' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startCursor' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bookingRef' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ticketType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'assignment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'state' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'appLoginEmail',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignee' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'id' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'me' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'firstName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'lastName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'email',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'phoneNumber',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'city' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'companyName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'companySizeId',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'industryId',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'jobTitle',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'marketingConsent',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'passportNumber',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'personalisationConsent',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'order' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'reference' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'context' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignable' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'editable' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'acceptable' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'rejectable' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderId' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'TicketFilter' },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'filter' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'after' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'before' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'first' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'last' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useOrderTicketsQuery__
 *
 * To run a query within a React component, call `useOrderTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderTicketsQuery({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      filter: // value for 'filter'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useOrderTicketsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    OrderTicketsQuery,
    OrderTicketsQueryVariables
  >,
) {
  return Apollo.useQuery<OrderTicketsQuery, OrderTicketsQueryVariables>(
    OrderTicketsDocument,
    baseOptions,
  );
}
export function useOrderTicketsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OrderTicketsQuery,
    OrderTicketsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<OrderTicketsQuery, OrderTicketsQueryVariables>(
    OrderTicketsDocument,
    baseOptions,
  );
}
export type OrderTicketsQueryHookResult = ReturnType<
  typeof useOrderTicketsQuery
>;
export type OrderTicketsLazyQueryHookResult = ReturnType<
  typeof useOrderTicketsLazyQuery
>;
export type OrderTicketsQueryResult = Apollo.QueryResult<
  OrderTicketsQuery,
  OrderTicketsQueryVariables
>;
export const SaleCyclesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'SaleCycles' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceGetSale' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'createdBy' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'lastUpdatedAt' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useSaleCyclesQuery__
 *
 * To run a query within a React component, call `useSaleCyclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSaleCyclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSaleCyclesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSaleCyclesQuery(
  baseOptions: Apollo.QueryHookOptions<
    SaleCyclesQuery,
    SaleCyclesQueryVariables
  >,
) {
  return Apollo.useQuery<SaleCyclesQuery, SaleCyclesQueryVariables>(
    SaleCyclesDocument,
    baseOptions,
  );
}
export function useSaleCyclesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SaleCyclesQuery,
    SaleCyclesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SaleCyclesQuery, SaleCyclesQueryVariables>(
    SaleCyclesDocument,
    baseOptions,
  );
}
export type SaleCyclesQueryHookResult = ReturnType<typeof useSaleCyclesQuery>;
export type SaleCyclesLazyQueryHookResult = ReturnType<
  typeof useSaleCyclesLazyQuery
>;
export type SaleCyclesQueryResult = Apollo.QueryResult<
  SaleCyclesQuery,
  SaleCyclesQueryVariables
>;
export const SalesCyclesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'SalesCycles' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'commerceListSales' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'hits' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'active' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdBy' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'email' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'endDate' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'lastUpdatedAt' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'startDate' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useSalesCyclesQuery__
 *
 * To run a query within a React component, call `useSalesCyclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalesCyclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalesCyclesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSalesCyclesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SalesCyclesQuery,
    SalesCyclesQueryVariables
  >,
) {
  return Apollo.useQuery<SalesCyclesQuery, SalesCyclesQueryVariables>(
    SalesCyclesDocument,
    baseOptions,
  );
}
export function useSalesCyclesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SalesCyclesQuery,
    SalesCyclesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<SalesCyclesQuery, SalesCyclesQueryVariables>(
    SalesCyclesDocument,
    baseOptions,
  );
}
export type SalesCyclesQueryHookResult = ReturnType<typeof useSalesCyclesQuery>;
export type SalesCyclesLazyQueryHookResult = ReturnType<
  typeof useSalesCyclesLazyQuery
>;
export type SalesCyclesQueryResult = Apollo.QueryResult<
  SalesCyclesQuery,
  SalesCyclesQueryVariables
>;
export const TaxRatesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TaxRates' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxRates' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'country' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'event' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'brandName' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rateType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'taxType' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'value' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useTaxRatesQuery__
 *
 * To run a query within a React component, call `useTaxRatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaxRatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaxRatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTaxRatesQuery(
  baseOptions?: Apollo.QueryHookOptions<TaxRatesQuery, TaxRatesQueryVariables>,
) {
  return Apollo.useQuery<TaxRatesQuery, TaxRatesQueryVariables>(
    TaxRatesDocument,
    baseOptions,
  );
}
export function useTaxRatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TaxRatesQuery,
    TaxRatesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<TaxRatesQuery, TaxRatesQueryVariables>(
    TaxRatesDocument,
    baseOptions,
  );
}
export type TaxRatesQueryHookResult = ReturnType<typeof useTaxRatesQuery>;
export type TaxRatesLazyQueryHookResult = ReturnType<
  typeof useTaxRatesLazyQuery
>;
export type TaxRatesQueryResult = Apollo.QueryResult<
  TaxRatesQuery,
  TaxRatesQueryVariables
>;
export const TicketCategoriesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketCategories' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketCategories' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ticketTypes' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'edges' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'node' },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'id',
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useTicketCategoriesQuery__
 *
 * To run a query within a React component, call `useTicketCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTicketCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTicketCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TicketCategoriesQuery,
    TicketCategoriesQueryVariables
  >,
) {
  return Apollo.useQuery<TicketCategoriesQuery, TicketCategoriesQueryVariables>(
    TicketCategoriesDocument,
    baseOptions,
  );
}
export function useTicketCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TicketCategoriesQuery,
    TicketCategoriesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    TicketCategoriesQuery,
    TicketCategoriesQueryVariables
  >(TicketCategoriesDocument, baseOptions);
}
export type TicketCategoriesQueryHookResult = ReturnType<
  typeof useTicketCategoriesQuery
>;
export type TicketCategoriesLazyQueryHookResult = ReturnType<
  typeof useTicketCategoriesLazyQuery
>;
export type TicketCategoriesQueryResult = Apollo.QueryResult<
  TicketCategoriesQuery,
  TicketCategoriesQueryVariables
>;
export const Document: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tickets' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'bookingRef' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'state' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ticketType' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'order' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'owner' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'firstName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'lastName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'email',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'assignment' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'state' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'assignee' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'email',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'firstName',
                                          },
                                        },
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'lastName',
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useQuery__
 *
 * To run a query within a React component, call `useQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuery(
  baseOptions?: Apollo.QueryHookOptions<Query, QueryVariables>,
) {
  return Apollo.useQuery<Query, QueryVariables>(Document, baseOptions);
}
export function useLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<Query, QueryVariables>,
) {
  return Apollo.useLazyQuery<Query, QueryVariables>(Document, baseOptions);
}
export type QueryHookResult = ReturnType<typeof useQuery>;
export type LazyQueryHookResult = ReturnType<typeof useLazyQuery>;
export type QueryResult = Apollo.QueryResult<Query, QueryVariables>;
export const TicketReleasePhaseDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketReleasePhase' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketReleasePhase' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'active' } },
                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endsAt' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nextPhase' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useTicketReleasePhaseQuery__
 *
 * To run a query within a React component, call `useTicketReleasePhaseQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketReleasePhaseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTicketReleasePhaseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTicketReleasePhaseQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TicketReleasePhaseQuery,
    TicketReleasePhaseQueryVariables
  >,
) {
  return Apollo.useQuery<
    TicketReleasePhaseQuery,
    TicketReleasePhaseQueryVariables
  >(TicketReleasePhaseDocument, baseOptions);
}
export function useTicketReleasePhaseLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TicketReleasePhaseQuery,
    TicketReleasePhaseQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    TicketReleasePhaseQuery,
    TicketReleasePhaseQueryVariables
  >(TicketReleasePhaseDocument, baseOptions);
}
export type TicketReleasePhaseQueryHookResult = ReturnType<
  typeof useTicketReleasePhaseQuery
>;
export type TicketReleasePhaseLazyQueryHookResult = ReturnType<
  typeof useTicketReleasePhaseLazyQuery
>;
export type TicketReleasePhaseQueryResult = Apollo.QueryResult<
  TicketReleasePhaseQuery,
  TicketReleasePhaseQueryVariables
>;
export const TicketReleasesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketReleases' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'releasePhaseIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'releasePhaseIds' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'ticketTypeIds' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ticketTypeIds' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketReleases' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'DisplayRelease' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'releasePhaseIds' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'ticketTypeIds' },
          },
        },
      ],
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayRelease' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'active' } },
          { kind: 'Field', name: { kind: 'Name', value: 'soldOut' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'action' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quantity' },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsTitoCheckoutAction',
                    },
                  },
                },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'emailAddress' },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsPriceEnquiryAction',
                    },
                  },
                },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'suggestedRelease' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsExpiredTicketAction',
                    },
                  },
                },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dynamicForm' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'schema' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'uiSchema' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'mutation' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'data' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: {
                      kind: 'Name',
                      value: 'TicketReleaseActionsPriceAlertAction',
                    },
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayPrice' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accessPermissions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'title' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'detail' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'source' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
                {
                  kind: 'InlineFragment',
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                  typeCondition: {
                    kind: 'NamedType',
                    name: { kind: 'Name', value: 'TitoTicketRelease' },
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketRelease' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayPrice' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '__typename' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'exTax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'totalTax' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'total' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'DisplayMoney' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'taxLines' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rate' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'DisplayMoney' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'includeUnit' },
                value: { kind: 'BooleanValue', value: false },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'precision' },
                value: { kind: 'IntValue', value: '0' },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'format' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'currency' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                { kind: 'Field', name: { kind: 'Name', value: 'symbol' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Money' },
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useTicketReleasesQuery__
 *
 * To run a query within a React component, call `useTicketReleasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketReleasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTicketReleasesQuery({
 *   variables: {
 *      releasePhaseIds: // value for 'releasePhaseIds'
 *      ticketTypeIds: // value for 'ticketTypeIds'
 *   },
 * });
 */
export function useTicketReleasesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TicketReleasesQuery,
    TicketReleasesQueryVariables
  >,
) {
  return Apollo.useQuery<TicketReleasesQuery, TicketReleasesQueryVariables>(
    TicketReleasesDocument,
    baseOptions,
  );
}
export function useTicketReleasesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TicketReleasesQuery,
    TicketReleasesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<TicketReleasesQuery, TicketReleasesQueryVariables>(
    TicketReleasesDocument,
    baseOptions,
  );
}
export type TicketReleasesQueryHookResult = ReturnType<
  typeof useTicketReleasesQuery
>;
export type TicketReleasesLazyQueryHookResult = ReturnType<
  typeof useTicketReleasesLazyQuery
>;
export type TicketReleasesQueryResult = Apollo.QueryResult<
  TicketReleasesQuery,
  TicketReleasesQueryVariables
>;
export const TicketTypeReleasePhaseSummaryDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketTypeReleasePhaseSummary' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'ticketTypeId' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  alias: { kind: 'Name', value: 'activeRelease' },
                  kind: 'Field',
                  name: { kind: 'Name', value: 'release' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'releasePhase' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'ReleasePhaseSummary',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'releasePhaseId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'releasePhaseId' },
                      },
                    },
                  ],
                  kind: 'Field',
                  name: { kind: 'Name', value: 'release' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'releasePhase' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'ReleasePhaseSummary',
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'ticketTypeId' },
          },
        },
        {
          kind: 'VariableDefinition',
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'releasePhaseId' },
          },
        },
      ],
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ReleasePhaseSummary' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'startsAt' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketReleasePhase' },
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useTicketTypeReleasePhaseSummaryQuery__
 *
 * To run a query within a React component, call `useTicketTypeReleasePhaseSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketTypeReleasePhaseSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTicketTypeReleasePhaseSummaryQuery({
 *   variables: {
 *      ticketTypeId: // value for 'ticketTypeId'
 *      releasePhaseId: // value for 'releasePhaseId'
 *   },
 * });
 */
export function useTicketTypeReleasePhaseSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<
    TicketTypeReleasePhaseSummaryQuery,
    TicketTypeReleasePhaseSummaryQueryVariables
  >,
) {
  return Apollo.useQuery<
    TicketTypeReleasePhaseSummaryQuery,
    TicketTypeReleasePhaseSummaryQueryVariables
  >(TicketTypeReleasePhaseSummaryDocument, baseOptions);
}
export function useTicketTypeReleasePhaseSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TicketTypeReleasePhaseSummaryQuery,
    TicketTypeReleasePhaseSummaryQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    TicketTypeReleasePhaseSummaryQuery,
    TicketTypeReleasePhaseSummaryQueryVariables
  >(TicketTypeReleasePhaseSummaryDocument, baseOptions);
}
export type TicketTypeReleasePhaseSummaryQueryHookResult = ReturnType<
  typeof useTicketTypeReleasePhaseSummaryQuery
>;
export type TicketTypeReleasePhaseSummaryLazyQueryHookResult = ReturnType<
  typeof useTicketTypeReleasePhaseSummaryLazyQuery
>;
export type TicketTypeReleasePhaseSummaryQueryResult = Apollo.QueryResult<
  TicketTypeReleasePhaseSummaryQuery,
  TicketTypeReleasePhaseSummaryQueryVariables
>;
export const TicketTypeReleasePhasesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TicketTypeReleasePhases' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'releasePhases' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'edges' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'node' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'active' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'status' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'endsAt' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useTicketTypeReleasePhasesQuery__
 *
 * To run a query within a React component, call `useTicketTypeReleasePhasesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTicketTypeReleasePhasesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTicketTypeReleasePhasesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTicketTypeReleasePhasesQuery(
  baseOptions: Apollo.QueryHookOptions<
    TicketTypeReleasePhasesQuery,
    TicketTypeReleasePhasesQueryVariables
  >,
) {
  return Apollo.useQuery<
    TicketTypeReleasePhasesQuery,
    TicketTypeReleasePhasesQueryVariables
  >(TicketTypeReleasePhasesDocument, baseOptions);
}
export function useTicketTypeReleasePhasesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TicketTypeReleasePhasesQuery,
    TicketTypeReleasePhasesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    TicketTypeReleasePhasesQuery,
    TicketTypeReleasePhasesQueryVariables
  >(TicketTypeReleasePhasesDocument, baseOptions);
}
export type TicketTypeReleasePhasesQueryHookResult = ReturnType<
  typeof useTicketTypeReleasePhasesQuery
>;
export type TicketTypeReleasePhasesLazyQueryHookResult = ReturnType<
  typeof useTicketTypeReleasePhasesLazyQuery
>;
export type TicketTypeReleasePhasesQueryResult = Apollo.QueryResult<
  TicketTypeReleasePhasesQuery,
  TicketTypeReleasePhasesQueryVariables
>;
export const TimeZonesDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'TimeZones' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'timeZones' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'edges' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'node' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'displayName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ianaName' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'utcOffset' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useTimeZonesQuery__
 *
 * To run a query within a React component, call `useTimeZonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimeZonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimeZonesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTimeZonesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TimeZonesQuery,
    TimeZonesQueryVariables
  >,
) {
  return Apollo.useQuery<TimeZonesQuery, TimeZonesQueryVariables>(
    TimeZonesDocument,
    baseOptions,
  );
}
export function useTimeZonesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TimeZonesQuery,
    TimeZonesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<TimeZonesQuery, TimeZonesQueryVariables>(
    TimeZonesDocument,
    baseOptions,
  );
}
export type TimeZonesQueryHookResult = ReturnType<typeof useTimeZonesQuery>;
export type TimeZonesLazyQueryHookResult = ReturnType<
  typeof useTimeZonesLazyQuery
>;
export type TimeZonesQueryResult = Apollo.QueryResult<
  TimeZonesQuery,
  TimeZonesQueryVariables
>;
export const WebPageByHostPathDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'WebPageByHostPath' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'path' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'path' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'host' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'host' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'webPageByHostPath' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'seoTags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'defaultImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterTitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterDescription' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookTitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookDescription' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'content' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'TicketSalesPageLayout',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLayoutsTicketSalesPage',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'TicketApplicationsPageLayout',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLayoutsTicketApplicationsPage',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ShowcaseGrid' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebElementsShowcaseGrid',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'ScheduleSearchSidebarFilters',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value:
                              'ComponentWebElementsScheduleSearchSidebarFilters',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'AttendeeSearchSidebarFilters',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value:
                              'ComponentWebElementsAttendeeSearchSidebarFilters',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'CompanySearchSidebarFilters',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value:
                              'ComponentWebElementsCompanySearchSidebarFilters',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'HeroSection' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebElementsHeroSection',
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'host' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'path' } },
        },
      ],
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketSalesPageLayout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketCategory' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketReleasesPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketReleasesPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'priceIncreaseCountdownTimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'releasePhaseStepper' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesMenu' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TabularMenu' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLayoutsTicketSalesPage' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketApplicationsPageLayout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationForm' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ApplicationForm' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationOverviewPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ApplicationOverviewPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketInfoPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketInfoPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesMenu' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TabularMenu' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'priceIncreaseCountdownTimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'releasePhaseStepper' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebLayoutsTicketApplicationsPage',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketInfoPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketType' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'heading' } },
          { kind: 'Field', name: { kind: 'Name', value: 'showBenefits' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketTypeInformation',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketReleasesPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketReleasesPanel',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketType' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TabularMenu' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'menuItems' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'link' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'UrlLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksUrlLink',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'PageLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksPageLink',
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Menu' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UrlLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksUrlLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'page' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksPageLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationForm' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dynamicForm' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'schema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uiSchema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mutation' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'contentBefore' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Form' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationOverviewPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'altImageText' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketApplicationOverviewPanel',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShowcaseGrid' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentBefore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'backgroundColor' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'elements' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebElementsShowcaseGrid' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleSearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsScheduleSearchSidebarFilters',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AttendeeSearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsAttendeeSearchSidebarFilters',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanySearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsCompanySearchSidebarFilters',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HeroSection' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  alias: { kind: 'Name', value: 'url' },
                  kind: 'Field',
                  name: { kind: 'Name', value: 'absoluteUrl' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ctaLink' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImageAlt' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImageDescription' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'brandImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  alias: { kind: 'Name', value: 'url' },
                  kind: 'Field',
                  name: { kind: 'Name', value: 'absoluteUrl' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebElementsHeroSection' },
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useWebPageByHostPathQuery__
 *
 * To run a query within a React component, call `useWebPageByHostPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebPageByHostPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebPageByHostPathQuery({
 *   variables: {
 *      host: // value for 'host'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useWebPageByHostPathQuery(
  baseOptions: Apollo.QueryHookOptions<
    WebPageByHostPathQuery,
    WebPageByHostPathQueryVariables
  >,
) {
  return Apollo.useQuery<
    WebPageByHostPathQuery,
    WebPageByHostPathQueryVariables
  >(WebPageByHostPathDocument, baseOptions);
}
export function useWebPageByHostPathLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WebPageByHostPathQuery,
    WebPageByHostPathQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    WebPageByHostPathQuery,
    WebPageByHostPathQueryVariables
  >(WebPageByHostPathDocument, baseOptions);
}
export type WebPageByHostPathQueryHookResult = ReturnType<
  typeof useWebPageByHostPathQuery
>;
export type WebPageByHostPathLazyQueryHookResult = ReturnType<
  typeof useWebPageByHostPathLazyQuery
>;
export type WebPageByHostPathQueryResult = Apollo.QueryResult<
  WebPageByHostPathQuery,
  WebPageByHostPathQueryVariables
>;
export const WebPageByPathDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'WebPageByPath' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'path' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'path' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'webPageByPath' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'seoTags' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'defaultImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterTitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterDescription' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'twitterImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookTitle' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookImage' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'facebookDescription' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'content' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'TicketSalesPageLayout',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLayoutsTicketSalesPage',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'TicketApplicationsPageLayout',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLayoutsTicketApplicationsPage',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ShowcaseGrid' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebElementsShowcaseGrid',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'ScheduleSearchSidebarFilters',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value:
                              'ComponentWebElementsScheduleSearchSidebarFilters',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'AttendeeSearchSidebarFilters',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value:
                              'ComponentWebElementsAttendeeSearchSidebarFilters',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: {
                                kind: 'Name',
                                value: 'CompanySearchSidebarFilters',
                              },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value:
                              'ComponentWebElementsCompanySearchSidebarFilters',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'HeroSection' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebElementsHeroSection',
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'path' } },
        },
      ],
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketSalesPageLayout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketCategory' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketReleasesPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketReleasesPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'priceIncreaseCountdownTimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'releasePhaseStepper' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesMenu' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TabularMenu' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'promotions' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'color' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLayoutsTicketSalesPage' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketApplicationsPageLayout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationForm' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ApplicationForm' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'applicationOverviewPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ApplicationOverviewPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketInfoPanel' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketInfoPanel' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'categoriesMenu' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TabularMenu' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'priceIncreaseCountdownTimer' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'releasePhaseStepper' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ticketType' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebLayoutsTicketApplicationsPage',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketInfoPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ticketType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TicketType' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'heading' } },
          { kind: 'Field', name: { kind: 'Name', value: 'showBenefits' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketTypeInformation',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketReleasesPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'displayPriceIncludingTax' },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketReleasesPanel',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TicketType' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TicketType' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TabularMenu' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'menuItems' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'link' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: '__typename' },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'UrlLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksUrlLink',
                          },
                        },
                      },
                      {
                        kind: 'InlineFragment',
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'PageLink' },
                            },
                          ],
                        },
                        typeCondition: {
                          kind: 'NamedType',
                          name: {
                            kind: 'Name',
                            value: 'ComponentWebLinksPageLink',
                          },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Menu' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'UrlLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'target' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksUrlLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PageLink' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'page' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'path' } },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebLinksPageLink' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationForm' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'dynamicForm' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'schema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'uiSchema' } },
                { kind: 'Field', name: { kind: 'Name', value: 'data' } },
                { kind: 'Field', name: { kind: 'Name', value: 'mutation' } },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'contentBefore' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Form' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ApplicationOverviewPanel' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'imageUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'altImageText' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsTicketApplicationOverviewPanel',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ShowcaseGrid' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'contentBefore' } },
          { kind: 'Field', name: { kind: 'Name', value: 'backgroundColor' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'elements' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebElementsShowcaseGrid' },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ScheduleSearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsScheduleSearchSidebarFilters',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AttendeeSearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsAttendeeSearchSidebarFilters',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanySearchSidebarFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'apiKey' } },
          { kind: 'Field', name: { kind: 'Name', value: 'indexName' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'refinements' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'attribute' } },
                { kind: 'Field', name: { kind: 'Name', value: 'defaults' } },
                { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'refinementItemsLimit' },
                },
              ],
            },
          },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: {
          kind: 'Name',
          value: 'ComponentWebElementsCompanySearchSidebarFilters',
        },
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'HeroSection' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'variant' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  alias: { kind: 'Name', value: 'url' },
                  kind: 'Field',
                  name: { kind: 'Name', value: 'absoluteUrl' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ctaLink' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'text' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImageAlt' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'backgroundImageDescription' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'brandImage' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  alias: { kind: 'Name', value: 'url' },
                  kind: 'Field',
                  name: { kind: 'Name', value: 'absoluteUrl' },
                },
              ],
            },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
        ],
      },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ComponentWebElementsHeroSection' },
      },
    },
  ],
  kind: 'Document',
};

/**
 * __useWebPageByPathQuery__
 *
 * To run a query within a React component, call `useWebPageByPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebPageByPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebPageByPathQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useWebPageByPathQuery(
  baseOptions: Apollo.QueryHookOptions<
    WebPageByPathQuery,
    WebPageByPathQueryVariables
  >,
) {
  return Apollo.useQuery<WebPageByPathQuery, WebPageByPathQueryVariables>(
    WebPageByPathDocument,
    baseOptions,
  );
}
export function useWebPageByPathLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WebPageByPathQuery,
    WebPageByPathQueryVariables
  >,
) {
  return Apollo.useLazyQuery<WebPageByPathQuery, WebPageByPathQueryVariables>(
    WebPageByPathDocument,
    baseOptions,
  );
}
export type WebPageByPathQueryHookResult = ReturnType<
  typeof useWebPageByPathQuery
>;
export type WebPageByPathLazyQueryHookResult = ReturnType<
  typeof useWebPageByPathLazyQuery
>;
export type WebPageByPathQueryResult = Apollo.QueryResult<
  WebPageByPathQuery,
  WebPageByPathQueryVariables
>;
export const WebPageConfigByPathHostDocument: DocumentNode = {
  definitions: [
    {
      kind: 'OperationDefinition',
      name: { kind: 'Name', value: 'webPageConfigByPathHost' },
      operation: 'query',
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'path' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'path' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'host' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'host' },
                },
              },
            ],
            kind: 'Field',
            name: { kind: 'Name', value: 'webPageConfigByPathHost' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'site' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'config' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'baseGoogleAnalyticsTrackingId',
                        },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'googleAnalyticsTrackingId',
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'googleTagManagerId' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'googleAnalyticsLinkerDomains',
                        },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'domain' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'metaData' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'image' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    alias: { kind: 'Name', value: 'url' },
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'absoluteUrl',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'siteTitle' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'siteDescription' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'facebookId' },
                            },
                            {
                              kind: 'Field',
                              name: {
                                kind: 'Name',
                                value: 'facebookPublisher',
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'twitterId' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'twitterCreator' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'branding' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'googleFontsUrl' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'theme' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'logo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'headerBranding' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'favicon' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ticketLogo' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'absoluteUrl' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'alternativeText' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'path' } },
        },
        {
          kind: 'VariableDefinition',
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'host' } },
        },
      ],
    },
  ],
  kind: 'Document',
};

/**
 * __useWebPageConfigByPathHostQuery__
 *
 * To run a query within a React component, call `useWebPageConfigByPathHostQuery` and pass it any options that fit your needs.
 * When your component renders, `useWebPageConfigByPathHostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWebPageConfigByPathHostQuery({
 *   variables: {
 *      path: // value for 'path'
 *      host: // value for 'host'
 *   },
 * });
 */
export function useWebPageConfigByPathHostQuery(
  baseOptions: Apollo.QueryHookOptions<
    WebPageConfigByPathHostQuery,
    WebPageConfigByPathHostQueryVariables
  >,
) {
  return Apollo.useQuery<
    WebPageConfigByPathHostQuery,
    WebPageConfigByPathHostQueryVariables
  >(WebPageConfigByPathHostDocument, baseOptions);
}
export function useWebPageConfigByPathHostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    WebPageConfigByPathHostQuery,
    WebPageConfigByPathHostQueryVariables
  >,
) {
  return Apollo.useLazyQuery<
    WebPageConfigByPathHostQuery,
    WebPageConfigByPathHostQueryVariables
  >(WebPageConfigByPathHostDocument, baseOptions);
}
export type WebPageConfigByPathHostQueryHookResult = ReturnType<
  typeof useWebPageConfigByPathHostQuery
>;
export type WebPageConfigByPathHostLazyQueryHookResult = ReturnType<
  typeof useWebPageConfigByPathHostLazyQuery
>;
export type WebPageConfigByPathHostQueryResult = Apollo.QueryResult<
  WebPageConfigByPathHostQuery,
  WebPageConfigByPathHostQueryVariables
>;
