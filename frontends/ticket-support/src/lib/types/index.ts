export type Conference = {
  guestProductId?: string
  slug: string
  staffProductId?: string
  storeId?: string
}

export type Account = {
  bio?: string
  city?: string
  companyName?: string
  companySizeId?: string
  email: string
  firstName: string
  gender?: string
  id: string
  industryId?: string
  jobTitle?: string
  lastLoginTokenCreatedAt: string
  lastName: string
  marketingConsent?: 'Yes' | 'No'
  personalisationConsent?: 'Yes' | 'No'
  phoneNumber?: string
}

export type Assignment = {
  appLoginEmail: string
  assignee: Account
  state: string
}

export type TicketType = {
  description?: string
  id: string
  name: string
}

export type OrderSummary = {
  ticketType: TicketType
  tickets: number
}

export enum OrderState {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
}

type Count = {
  count: number
}

type AssignedTickets = Count & {
  accepted?: Count
  checkedIn?: Count
  duplicate?: Count
  locked?: Count
  pending?: Count
}

type UnassignedTickets = Count & {
  neverAssigned?: Count
  rejected?: Count
}

export type TicketsSummary = {
  all: Count & {
    active?: Count & {
      assigned?: AssignedTickets
      unassigned?: UnassignedTickets
    }
    void?: Count
  }
}

export type OrderSource = 'TICKET_MACHINE' | 'TITO'

export type Order = {
  owner: Account
  reference: string
  source: OrderSource
  state: OrderState
  summary: OrderSummary
  ticketsSummary: TicketsSummary
}

export type Ticket = {
  assignment?: Assignment
  bookingRef: string
  id: string
  order: Order
  state: string
  ticketType: Pick<TicketType, 'name'>
}

export enum TicketStatus {
  ACCEPTED = 'Accepted',
  ASSIGNED = 'Assigned',
  CHECKED_IN = 'Checked In',
  DUPLICATE = 'Duplicate',
  LOCKED = 'Locked',
  REJECTED = 'Rejected',
  UNASSIGNED = 'Unassigned',
  VOID = 'Void',
}

export type PageInfo = {
  endCursor: string
  hasNextPage: string
  hasPreviousPage: string
  startCursor: string
}

export type UserError = {
  message: string
  path: string
}

type EventDataOption = {
  id: string
  name: string
}

export type EventData = {
  companySizes: EventDataOption[]
  id: string
  industries: EventDataOption[]
  name?: string
  passportRequired: boolean
  slug: string
}

type CommercePaymentMethod = {
  id: string
  name: string
}

type CommerceAddress = Partial<{
  city: string
  country: string
  id: string
  line1: string
  line2: string
  owner: string
  postalCode: string
  state: string
}>

type CommerceCustomer = {
  address: CommerceAddress
  companyName?: string
  email?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string
  vatNumber?: string
  vatVerified?: boolean
}

export enum CommercePaymentStatus {
  OVERPAID = 'OVERPAID',
  PAID = 'PAID',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  PENDING = 'PENDING',
  REFUNDED = 'REFUNDED',
}

export enum CommerceOrderStatus {
  CANCELLED = 'CANCELLED',
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING',
  REINSTATED = 'REINSTATED',
}

export enum CommerceTaxMode {
  B2B = 'B2B',
  B2C = 'B2C',
}

type CommerceTaxType = {
  description: string
  id: string
  name: string
}

type CommerceProduct = {
  active: boolean
  description: string
  id: string
  name: string
  price: number
  taxMode: CommerceTaxMode
  taxType: CommerceTaxType
}

type CommerceTax = {
  country: string
  id: string
  name: string
  rateAmount: number
  taxType: CommerceTaxType
}

type CommerceOrderItem = {
  id: string
  itemName: string
  price: number
  product: CommerceProduct
  quantity: number
  subTotal: number
  tax: CommerceTax
  taxTotal: number
}

export type CommerceOrder = {
  billed: number
  currency: string
  currencySymbol: string
  customer: CommerceCustomer
  id: string
  invoiceUrl: string
  items: CommerceOrderItem[]
  locked: boolean
  owner: string
  paid: number
  paymentMethod: CommercePaymentMethod
  paymentStatus: CommercePaymentStatus
  reference: string
  status: CommerceOrderStatus
  subTotal: number
  taxTotal: number
  total: number
  url: string
}

enum CommerceTransactionStatus {
  CANCELED = 'CANCELED',
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING',
}

export enum CommerceTransactionType {
  PAYMENT = 'PAYMENT',
  REFUND = 'REFUND',
}

export type CommerceTransaction = {
  amount: number
  currency: string
  id: string
  paymentMethod: CommercePaymentMethod
  refundedTransaction: string
  status: CommerceTransactionStatus
  timestamp: string
  type: CommerceTransactionType
}
